# EC2 + SSR pipeline — покроковий setup

Регіон: **eu-north-1** | Account: **162133619884**

```
Git push → CodePipeline → CodeBuild (SSR build) → CodeDeploy → EC2 (next start)
                              ↑
                    env з S3 (окремий файл для SSR)
```

---

## Крок 1. IAM ролі (якщо ще немає)

### `pdp-codedeploy-role`
- Trusted entity: **CodeDeploy**
- Policy: **AWSCodeDeployRole** (managed)

### `pdp-ec2-role`
- Trusted entity: **EC2**
- Policy: **AmazonSSMManagedInstanceCore** (managed)

### `pdp-codepipeline-role` — додати для CodeDeploy stage

Inline policy (якщо ще немає):

```json
{
  "Effect": "Allow",
  "Action": [
    "codedeploy:CreateDeployment",
    "codedeploy:GetApplication",
    "codedeploy:GetApplicationRevision",
    "codedeploy:GetDeployment",
    "codedeploy:GetDeploymentConfig",
    "codedeploy:RegisterApplicationRevision"
  ],
  "Resource": "*"
}
```

І `iam:PassRole` на `pdp-codedeploy-role`.

### `pdp-codebuild-role`
Вже є з S3 — достатньо для SSR build.

---

## Крок 2. Env-файл для SSR у S3

Локально:

```bash
cp deploy/env/.env.production.example .env.ssr.production
# Встановіть DEPLOY_TARGET=ssr
```

Завантажте в S3:

```
s3://pdp-env-config-162133619884/env/.env.ssr.production
```

> Static pipeline використовує `env/.env.production`, SSR — `env/.env.ssr.production`. Обидва пайплайни можуть працювати паралельно.

---

## Крок 3. EC2 інстанс

**EC2 → Launch instance**

| Поле | Значення |
|------|----------|
| Name | `pdp-ssr-app` |
| AMI | Amazon Linux 2023 |
| Instance type | `t3.small` |
| Key pair | Створіть або без (доступ через SSM) |
| IAM instance profile | `pdp-ec2-role` |
| Security group | Inbound **TCP 3000** з вашої IP (або `0.0.0.0/0` для тесту) |
| Storage | 20 GB gp3 |

**Advanced details → User data** — вставте вміст `deploy/ec2/user-data.sh`

**Launch instance**

### Перевірка (через 3–5 хв)

Systems Manager → Session Manager → Connect до інстанса:

```bash
sudo systemctl status codedeploy-agent   # active
sudo systemctl status next-pdp           # inactive до першого deploy
node -v                                  # 20.x
```

---

## Крок 4. CodeDeploy

**CodeDeploy → Create application**

| Поле | Значення |
|------|----------|
| Application name | `pdp-ssr` |
| Compute platform | EC2/On-premises |

**Create deployment group**

| Поле | Значення |
|------|----------|
| Deployment group name | `pdp-ssr-dg` |
| Service role | `pdp-codedeploy-role` |
| Deployment type | In-place |
| Environment | Amazon EC2 instances |
| Tag group | Key: `Name`, Value: `pdp-ssr-app` |

---

## Крок 5. CodeBuild `pdp-ssr-build`

**CodeBuild → Create build project**

| Поле | Значення |
|------|----------|
| Project name | `pdp-ssr-build` |
| Source | GitHub → `Allex372/next-pdp` / `main` |
| Environment | `aws/codebuild/standard:7.0` |
| Service role | `pdp-codebuild-role` |
| Buildspec | `deploy/ssr/buildspec.yml` |
| **Artifacts** | **AWS CodePipeline** ← важливо, не "No artifacts"! |

---

## Крок 6. CodePipeline `pdp-ssr-pipeline`

**Create pipeline → Build custom pipeline**

| Stage | Налаштування |
|-------|--------------|
| Pipeline | `pdp-ssr-pipeline`, role `pdp-codepipeline-role`, artifacts `pdp-pipeline-artifacts-162133619884` |
| Source | GitHub, `pdp-github`, `Allex372/next-pdp`, `main` |
| Build | CodeBuild → `pdp-ssr-build` |
| Deploy | **AWS CodeDeploy** → Application `pdp-ssr`, Group `pdp-ssr-dg` |

**Test / Deploy to S3** — Skip.

---

## Крок 7. Push і перевірка

```bash
git add deploy/ssr/buildspec.yml deploy/EC2-SETUP.md
git commit -m "Configure SSR EC2 deploy pipeline"
git push origin main
```

Або **Release change** на `pdp-ssr-pipeline`.

### Перевірка

```bash
# Публічна IP інстанса
curl http://<EC2_PUBLIC_IP>:3000/api/health
# {"status":"ok","deployTarget":"ssr",...}

curl http://<EC2_PUBLIC_IP>:3000/
# Сторінка з "Режим деплою: ssr"
```

---

## Типові помилки

| Помилка | Рішення |
|---------|---------|
| CodeDeploy `UnknownError` | codedeploy-agent не запущений — перевір user-data |
| `ScriptMissing` | `chmod +x` на scripts — buildspec це робить |
| `npm ci` failed на EC2 | Перевір package-lock.json в artifact |
| Connection refused :3000 | Security group, або `systemctl status next-pdp` |
| Build: env 404 | Завантаж `env/.env.ssr.production` в S3 |

---

## Для звіту PDP

| Тема | Що показати |
|------|-------------|
| EC2 | Інстанс з Node 20 + systemd |
| SSR vs Static | Static = S3+CF, SSR = EC2+runtime env |
| CodeDeploy | In-place deploy, lifecycle hooks |
| Повний CI/CD | 2 pipeline: static і SSR |
