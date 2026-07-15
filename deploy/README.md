# AWS CI/CD для next-pdp

Проект підтримує **два режими деплою**:

| Режим | Коли використовувати | Куди деплоїться | Що з env |
|-------|---------------------|-----------------|----------|
| `static` | Статичний сайт, без сервера | S3 + CloudFront | `NEXT_PUBLIC_*` і серверні змінні **запікаються під час build** |
| `ssr` | Повноцінний Next.js з API routes | EC2 (`start:custom`) | Серверні змінні читаються **на сервері під час запиту** |

Обидва пайплайни тягнуть `.env.production` з **окремого S3-бакета** під час CodeBuild.

---

## Архітектура

### Static (S3 + CloudFront)

```
Git push → CodePipeline (Source)
         → CodeBuild (deploy/static/buildspec.yml)
              ├─ S3: env/.env.production
              ├─ npm run build:static → out/
              ├─ aws s3 sync → hosting bucket
              └─ CloudFront invalidation
         → користувач → CloudFront → S3
```

### SSR (EC2)

```
Git push → CodePipeline (Source)
         → CodeBuild (deploy/ssr/buildspec.yml)
              ├─ S3: env/.env.ssr.production
              ├─ npm run build:ssr → .next/
              ├─ npm ci --omit=dev → production node_modules
              └─ artifact (.next + node_modules + server + appspec)
         → CodeDeploy → EC2
              ├─ AfterInstall: verify node_modules (без npm ci)
              └─ systemctl restart next-pdp  (start:custom)
         → користувач → (опційно ALB) → EC2:3000
```

---

## Локальна перевірка перед AWS

```bash
# Static — результат у out/
npm run build:static

# SSR — потім можна запустити сервер
npm run build:ssr
DEPLOY_TARGET=ssr npm run start:prod
# http://localhost:3000/api/health
```

---

## Крок 1. IAM (зробити першим)

### Роль `CodePipelineServiceRole`

- Запускати CodeBuild
- Читати artifact bucket
- `iam:PassRole` на `CodeBuildServiceRole`
- Доступ до CodeStar Connection (GitHub)

### Роль `CodeBuildServiceRole`

**Для static-пайплайну:**
- `s3:GetObject` на env-бакет
- `s3:PutObject`, `s3:DeleteObject`, `s3:ListBucket` на hosting-бакет
- `cloudfront:CreateInvalidation` на вашу distribution

**Для SSR-пайплайну (додатково):**
- Запис артефактів у pipeline artifact bucket
- (CodeDeploy отримує артефакт через pipeline, не напряму з CodeBuild role)

### Роль `CodeDeployServiceRole`

AWS managed policy: `AWSCodeDeployRole`

### Роль для EC2 (`EC2-NextPDP-Role`)

- `AmazonSSMManagedInstanceCore` (зручний доступ без SSH)
- Опційно `s3:GetObject` на env-бакет, якщо колись захочете тягнути env прямо на інстанс

**Принцип least privilege:** жодній ролі не давайте `AdministratorAccess`.

---

## Крок 2. S3-бакети

| Бакет | Призначення |
|-------|-------------|
| `pdp-env-config-<account-id>` | `.env.production` (окремо від коду) |
| `pdp-frontend-hosting-<account-id>` | Static site (`out/`) |
| `pdp-pipeline-artifacts-<account-id>` | Артефакти CodePipeline |

### Env-файли

Скопіюйте шаблон і завантажте в S3:

```bash
# Для EC2 / SSR-пайплайну
cp deploy/env/.env.production.example .env.production
# Відредагуйте значення, DEPLOY_TARGET=ssr

aws s3 cp .env.production s3://pdp-env-config-XXX/env/.env.production

# Для static-пайплайну — той самий файл, але:
# DEPLOY_TARGET=static
aws s3 cp .env.production s3://pdp-env-config-XXX/env/.env.static.production
```

У `deploy/static/buildspec.yml` шлях за замовчуванням: `env/.env.production`.  
Для static можна або перезаписувати той самий файл перед білдом, або змінити шлях у buildspec на `env/.env.static.production`.

---

## Крок 3. GitHub + CodeStar Connection

1. AWS Console → **Developer Tools → Settings → Connections**
2. Створіть connection до GitHub, підтвердіть у GitHub
3. Запуште цей репозиторій на GitHub

---

## Крок 4a. Static pipeline (S3 + CloudFront)

### CloudFront

1. Origin: hosting S3-бакет
2. **Origin Access Control (OAC)** — бакет приватний, доступ лише через CloudFront
3. Default root object: `index.html`
4. Збережіть **Distribution ID**

### CodeBuild `pdp-static-build`

| Параметр | Значення |
|----------|----------|
| Buildspec | `deploy/static/buildspec.yml` |
| Environment | `aws/codebuild/standard:7.0`, Node 20 |
| Service role | `CodeBuildServiceRole` |

Замініть у buildspec `REPLACE_ME`:
- `ENV_BUCKET`
- `HOSTING_BUCKET`
- `CLOUDFRONT_DISTRIBUTION_ID`

### CodePipeline `pdp-static-pipeline`

| Stage | Дія |
|-------|-----|
| Source | GitHub, branch `main` |
| Build | `pdp-static-build` |

Deploy stage не потрібен — деплой у `post_build` buildspec.

---

## Крок 4b. SSR pipeline (EC2)

### EC2 інстанс

1. **AMI:** Amazon Linux 2023
2. **Instance type:** `t3.small` (достатньо для навчання)
3. **IAM role:** `EC2-NextPDP-Role`
4. **Security Group:**
   - Inbound `3000` (тимчасово, для тесту) або тільки від ALB
   - SSH або лише SSM
5. **User data:** вміст `deploy/ec2/user-data.sh`

Після старту перевірте:

```bash
# через SSM Session Manager
sudo systemctl status codedeploy-agent
sudo systemctl status next-pdp   # буде inactive до першого деплою
```

### CodeDeploy

1. **Application:** `pdp-ssr`
2. **Deployment group:**
   - Compute platform: EC2
   - Tag filter, наприклад `Name=pdp-ssr-app`
   - Service role: `CodeDeployServiceRole`
3. Повісьте тег на EC2 інстанс

### CodeBuild `pdp-ssr-build`

| Параметр | Значення |
|----------|----------|
| Buildspec | `deploy/ssr/buildspec.yml` |
| Artifacts | CodePipeline artifact |

Замініть `ENV_BUCKET` у buildspec.

### CodePipeline `pdp-ssr-pipeline`

| Stage | Дія |
|-------|-----|
| Source | GitHub, branch `main` (або `ssr`) |
| Build | `pdp-ssr-build` |
| Deploy | CodeDeploy → `pdp-ssr` / deployment group |

---

## Крок 5. Перевірка end-to-end

### Static

1. `git push`
2. CodePipeline зелений
3. Сайт на CloudFront URL
4. На сторінці: `Режим деплою: static`

### SSR

1. `git push`
2. CodeDeploy успішний на EC2
3. `curl http://<ec2-ip>:3000/api/health`
   ```json
   {"status":"ok","deployTarget":"ssr","timestamp":"..."}
   ```
4. На сторінці: `Режим деплою: ssr`
5. Змініть секрет у S3 env, перезапустіть pipeline — серверні змінні оновляться після redeploy (потрібен новий build для `NEXT_PUBLIC_*`, серверні — після restart з новим `.env.production`)

---

## Коли що обирати (для PDP-звіту)

| Питання | Static (S3+CF) | SSR (EC2) |
|---------|----------------|-----------|
| Вартість | Низька | Вища (інстанс 24/7) |
| Масштабування | Автоматичне через CDN | Потрібен ALB, ASG |
| API routes | Ні | Так (`/api/health`) |
| Секрети в runtime | Ні (лише build time) | Так |
| Складність | Середня | Вища |

**EC2 потрібен**, коли:
- є SSR / API routes / runtime-логіка на сервері
- env-змінні мають читатися під час запиту, а не при build
- потрібен `next start`, а не лише HTML/JS/CSS файли

**S3 + CloudFront достатньо**, коли:
- сайт повністю статичний після `next build`
- максимальна швидкість і мінімальна вартість

---

## Custom server (Express + Next.js)

SSR-режим запускається через **custom Express server** (`server/custom-server.mjs`),
а не через `next start`. Express слухає порт, а Next.js обробляє всі запити, крім
власних Express-роутів.

| URL | Хто обробляє |
|-----|--------------|
| `/express-api/status` | Express handler |
| `/api/health` | Next.js Route Handler |
| `/` та решта | Next.js (через Express) |

**Важливо:** custom server працює **тільки в SSR (EC2)**. Static (S3 + CloudFront)
не має Node.js runtime, тому там використовується `output: "export"`, а Express
неможливий. Також custom server несумісний з `output: "standalone"`.

Локальна перевірка:

```bash
npm run build:ssr
npm run start:custom
# http://localhost:3000/express-api/status  → {"handledBy":"Express",...}
# http://localhost:3000/api/health          → Next.js Route Handler
# http://localhost:3000/                     → сторінка через Express

# dev-режим з hot reload через custom server:
npm run dev:custom
```

На EC2 systemd-юніт запускає `npm run start:custom` (див. `deploy/ec2/next-pdp.service`
та `deploy/ec2/user-data.sh`). SSR buildspec кладе в артефакт `server/` **і**
production `node_modules` (після `npm ci --omit=dev` у CodeBuild). На EC2
`AfterInstall` лише перевіряє наявність залежностей — `npm ci` там більше не
запускається (на `t3.small` він часто зависає і дає `ScriptTimedOut`).

---

## Amplify (альтернатива)

AWS Amplify Hosting зібрав би Source + Build + Deploy «з коробки», але:
- менше контролю над кожним етапом
- env з окремого S3-бакета — нетиповий сценарій
- для PDP краще показати CodePipeline + CodeBuild + S3/EC2 вручну

---

## Структура файлів у репо

```
deploy/
├── static/buildspec.yml      # S3 + CloudFront pipeline
├── ssr/buildspec.yml         # EC2 pipeline (artifact)
├── ssr/appspec.yml           # CodeDeploy
├── ssr/scripts/              # CodeDeploy lifecycle hooks
├── ec2/user-data.sh          # Bootstrap інстанса
├── ec2/next-pdp.service      # systemd unit (копія для довідки)
├── scripts/build-static.mjs  # Static build без API routes
└── env/.env.production.example

server/custom-server.mjs      # Express + Next.js (тільки SSR/EC2)
src/app/api/health/route.ts   # Тільки для SSR (health check ALB)
```

---

## Типові помилки

| Симптом | Рішення |
|---------|---------|
| Static build падає на `/api/health` | Використовуйте `npm run build:static`, не `next build` напряму |
| 403 на CloudFront | Перевірте OAC і bucket policy |
| CodeDeploy `ScriptMissing` | `chmod +x` на scripts — buildspec це робить |
| `AfterInstall` `ScriptTimedOut` | Не ставте `npm ci` на EC2 — `node_modules` мають їхати з CodeBuild |
| `next-pdp` не стартує на EC2 | `journalctl -u next-pdp -f`, перевірте `.env.production` |
| Старий контент на CDN | CloudFront invalidation після deploy |

---

## Чеклист для здачі PDP

- [ ] IAM ролі з least privilege
- [ ] Окремий S3-бакет для env config
- [ ] Git push тригерить pipeline
- [ ] CodeBuild тягне env з S3
- [ ] **Static:** артефакти в hosting S3, CloudFront + invalidation
- [ ] **SSR:** EC2 з CodeDeploy, Express custom server (`start:custom`), health + express endpoints
- [ ] Розумієте різницю між `static` і `ssr` для env-змінних
