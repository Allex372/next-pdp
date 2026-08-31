import { DemoSection } from "@/components/demo/DemoSection";
import { DemoShell } from "@/components/demo/DemoShell";

export const revalidate = 10;

export default function IsrDemoPage() {
  return (
    <DemoShell
      title="ISR demo"
      description="export const revalidate = 10 — Next.js оновлює HTML на сервері кожні 10 секунд."
    >
      <DemoSection
        title="Час генерації"
        description="Якщо timestamp не змінюється після 10+ секунд — ти в static mode (S3), ISR там не працює."
      >
        <p className="font-mono text-lg text-zinc-900 dark:text-zinc-50">
          {new Date().toISOString()}
        </p>
      </DemoSection>
    </DemoShell>
  );
}
