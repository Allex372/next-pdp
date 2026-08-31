import { DemoSection } from "@/components/demo/DemoSection";
import { DemoShell } from "@/components/demo/DemoShell";

export default function ApiDemoPage() {
  return (
    <DemoShell
      title="API routes"
      description="Backend-логіка в app/api. Node runtime за замовчуванням; Edge — для низької латентності біля користувача."
    >
      <DemoSection
        title="Endpoints"
        description="Відкрий у браузері або curl — порівняй runtime."
      >
        <ul className="space-y-2 text-sm">
          <li>
            <a href="/api/posts" className="font-mono text-blue-600 underline dark:text-blue-400">
              /api/posts
            </a>
            <span className="text-zinc-500"> — Node.js + JSONPlaceholder</span>
          </li>
          <li>
            <a href="/api/time" className="font-mono text-blue-600 underline dark:text-blue-400">
              /api/time
            </a>
            <span className="text-zinc-500"> — Node.js (default)</span>
          </li>
          <li>
            <a href="/api/edge" className="font-mono text-blue-600 underline dark:text-blue-400">
              /api/edge
            </a>
            <span className="text-zinc-500"> — Edge runtime</span>
          </li>
          <li>
            <a href="/api/health" className="font-mono text-blue-600 underline dark:text-blue-400">
              /api/health
            </a>
            <span className="text-zinc-500"> — health check</span>
          </li>
          <li>
            <a href="/express-api/posts" className="font-mono text-blue-600 underline dark:text-blue-400">
              /express-api/posts
            </a>
            <span className="text-zinc-500"> — Express + JSONPlaceholder (тільки dev:custom/start:custom)</span>
          </li>
        </ul>
      </DemoSection>

      <DemoSection
        title="Middleware"
        description="Код перед маршрутизацією: redirect, headers, locale. Тут: /demos/i18n → redirect на /demos/i18n/uk або /en за Accept-Language."
      >
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Спробуй{" "}
          <a href="/demos/i18n" className="font-mono text-blue-600 underline dark:text-blue-400">
            /demos/i18n
          </a>{" "}
          — middleware сам обере мову.
        </p>
      </DemoSection>
    </DemoShell>
  );
}
