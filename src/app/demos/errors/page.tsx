import Link from "next/link";
import { DemoSection } from "@/components/demo/DemoSection";
import { DemoShell } from "@/components/demo/DemoShell";
import { ErrorTrigger } from "@/components/demo/ErrorTrigger";

export default function ErrorsDemoPage() {
  return (
    <DemoShell
      title="Error handling"
      description="Кастомні 404/500 і error boundary — користувач бачить зрозумілу сторінку замість білого екрану."
    >
      <DemoSection
        title="404 — not-found.tsx"
        description="Сторінка для неіснуючих URL."
      >
        <Link
          href="/this-page-does-not-exist"
          className="text-sm font-medium text-blue-600 underline dark:text-blue-400"
        >
          Відкрити неіснуючий URL →
        </Link>
      </DemoSection>

      <DemoSection
        title="Error boundary — error.tsx"
        description="Ловить помилки в цій гілці маршрутів (demos/errors)."
      >
        <ErrorTrigger />
      </DemoSection>

      <DemoSection
        title="500 — global-error.tsx"
        description="Кореневий fallback, якщо впав увесь layout. Для PDP достатньо знати, що файл існує в app/."
      >
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Файли: <code className="font-mono">not-found.tsx</code>,{" "}
          <code className="font-mono">demos/errors/error.tsx</code>,{" "}
          <code className="font-mono">global-error.tsx</code>
        </p>
      </DemoSection>
    </DemoShell>
  );
}
