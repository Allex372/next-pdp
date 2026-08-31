import Link from "next/link";
import { DemoSection } from "@/components/demo/DemoSection";
import { DemoShell } from "@/components/demo/DemoShell";
import { CONFIG_DEMO_VALUE } from "@/lib/config-demo";

const deployTarget = process.env.DEPLOY_TARGET ?? "ssr";

export default function ConfigurationDemoPage() {
  return (
    <DemoShell
      title="Configuration"
      description="Env змінні, next.config.ts і TypeScript — як проєкт налаштовується під середовище."
    >
      <DemoSection
        title="Environment variables"
        description="NEXT_PUBLIC_* — у браузері. Решта — тільки на сервері. Див. також головну сторінку."
      >
        <ul className="space-y-1 font-mono text-xs text-zinc-700 dark:text-zinc-300">
          <li>DEPLOY_TARGET = {deployTarget}</li>
          <li>NEXT_PUBLIC_ENVIRONMENT = {process.env.NEXT_PUBLIC_ENVIRONMENT ?? "—"}</li>
        </ul>
        <Link href="/" className="mt-3 inline-block text-sm text-blue-600 underline dark:text-blue-400">
          Повна таблиця env на головній →
        </Link>
      </DemoSection>

      <DemoSection
        title="Path alias (tsconfig.json)"
        description="Alias @config-demo → коротший import. Аналог можна задати в next.config webpack/turbopack."
      >
        <p className="font-mono text-sm text-zinc-900 dark:text-zinc-50">
          CONFIG_DEMO_VALUE = {CONFIG_DEMO_VALUE}
        </p>
      </DemoSection>

      <DemoSection
        title="TypeScript"
        description="strict mode у tsconfig.json — типи для props, env, API."
      >
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Усі демо-сторінки на TypeScript; помилки типів ловляться під час{" "}
          <code className="font-mono">next build</code>.
        </p>
      </DemoSection>
    </DemoShell>
  );
}
