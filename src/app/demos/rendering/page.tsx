import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";
import { DemoSection } from "@/components/demo/DemoSection";
import { DemoShell } from "@/components/demo/DemoShell";

const HeavyWidget = dynamic(() => import("@/components/widgets/HeavyWidget"), {
  loading: () => <p className="text-sm text-zinc-500">Завантаження chunk…</p>,
});

async function SlowBlock() {
  await new Promise((r) => setTimeout(r, 1500));
  return (
    <p className="text-sm text-zinc-700 dark:text-zinc-300">
      Streaming: цей блок з&apos;явився через ~1.5 с (async Server Component).
    </p>
  );
}

export default function RenderingDemoPage() {
  return (
    <DemoShell
      title="Advanced rendering"
      description="ISR, lazy chunks і streaming — три способи не блокувати користувача."
    >
      <DemoSection
        title="ISR"
        description="Сторінка регенерується на сервері кожні N секунд без повного rebuild."
      >
        <Link
          href="/demos/isr"
          className="text-sm font-medium text-blue-600 underline underline-offset-2 dark:text-blue-400"
        >
          Відкрити /demos/isr →
        </Link>
        <p className="mt-2 text-xs text-zinc-500">Оновлюй сторінку — timestamp змінюється кожні 10 с (SSR only).</p>
      </DemoSection>

      <DemoSection
        title="Dynamic import"
        description="Важкий компонент завантажується окремим JS-файлом тільки коли потрібен."
      >
        <HeavyWidget />
      </DemoSection>

      <DemoSection
        title="Streaming (Suspense)"
        description="Сервер віддає HTML частинами — користувач бачить fallback, поки дані готуються."
      >
        <Suspense fallback={<p className="text-sm text-zinc-500">Streaming fallback…</p>}>
          <SlowBlock />
        </Suspense>
      </DemoSection>
    </DemoShell>
  );
}
