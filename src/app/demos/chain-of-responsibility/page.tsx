import { DemoShell } from "@/components/demo/DemoShell";
import { ChainOfResponsibilityDemo } from "@/components/demo/ChainOfResponsibilityDemo";

export default function ChainOfResponsibilityPage() {
  return (
    <DemoShell
      title="Chain of Responsibility pattern"
      description="Incident management: Tier 1 → Tier 2 → Tier 3 за severity."
    >
      <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Практика</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Код у{" "}
          <code className="font-mono text-xs">src/patterns/chain-of-responsibility/</code>. Натисни
          інцидент — він іде в ланцюжок, перший handler, що може, обробляє.
        </p>
        <div className="mt-4">
          <ChainOfResponsibilityDemo />
        </div>
      </section>

      <TheorySection />
    </DemoShell>
  );
}

function TheorySection() {
  const items = [
    {
      q: "Що таке Chain of Responsibility?",
      a: "Патерн, де запит проходить ланцюжком handlerів. Кожен або обробляє, або передає далі. Відправник не знає, хто саме обробить.",
    },
    {
      q: "Real-world приклад",
      a: "Support tiers (L1/L2/L3), middleware у HTTP (auth → logging → handler), approval workflow (manager → director → CEO).",
    },
    {
      q: "Ключові елементи",
      a: "Handler (інтерфейс + setNext/handle), Concrete handlers (Tier1/2/3), Client (IncidentManagementSystem), ланцюжок (createSupportChain).",
    },
    {
      q: "Плюси / мінуси",
      a: "+ слабке зв'язування sender/receiver, + додати handler без зміни клієнта, + SRP на кожному рівні. − запит може «загубитись», − важче дебажити шлях, − немає гарантії обробки.",
    },
    {
      q: "Коли НЕ використовувати",
      a: "Коли завжди один отримувач; коли потрібен точний контроль порядку з одного місця; коли ланцюжок надто довгий і непрозорий.",
    },
    {
      q: "Decoupling sender / receiver",
      a: "Client викликає reportIncident() → перший handler. Не знає про Tier2/Tier3 — лише передає в chain head.",
    },
    {
      q: "Loose coupling",
      a: "Handlerи знають лише про наступного (setNext), не про весь ланцюжок і не про client.",
    },
    {
      q: "Single Responsibility",
      a: "Tier1 — прості кейси, Tier2 — інтеграції, Tier3 — outage. Кожен клас — одна зона відповідальності.",
    },
    {
      q: "Sequence of processing objects",
      a: "Tier1.setNext(Tier2).setNext(Tier3) — запит іде по черзі, поки canHandle() не поверне true.",
    },
  ];

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Теорія (коротко)</h2>
      <dl className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.q}>
            <dt className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.q}</dt>
            <dd className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{item.a}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-xs text-zinc-500">
        «Used in a project» — middleware pipeline, error handling chain, або цей incident demo
        (адаптуй під свій досвід).
      </p>
    </section>
  );
}
