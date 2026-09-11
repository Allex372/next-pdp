import { DemoShell } from "@/components/demo/DemoShell";
import { StrategyPatternDemo } from "@/components/demo/StrategyPatternDemo";

export default function StrategyPatternPage() {
  return (
    <DemoShell
      title="Strategy pattern"
      description="Navigation app з взаємозамінними алгоритмами маршруту (fastest / shortest / scenic)."
    >
      <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Практика</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Код у <code className="font-mono text-xs">src/patterns/strategy/</code>. Обери стратегію —
          NavigationApp делегує розрахунок відповідному класу.
        </p>
        <div className="mt-4">
          <StrategyPatternDemo />
        </div>
      </section>

      <TheorySection />
    </DemoShell>
  );
}

function TheorySection() {
  const items = [
    {
      q: "Що таке Strategy?",
      a: "Патерн, де алгоритм (поведінка) виноситься в окремий об'єкт і підставляється в runtime. Клієнт викликає один метод інтерфейсу, не знаючи деталей реалізації.",
    },
    {
      q: "Real-world приклад",
      a: "Оплата в checkout: CreditCard, PayPal, Apple Pay — одна кнопка «Pay», різні стратегії списання.",
    },
    {
      q: "Ключові елементи",
      a: "Strategy (інтерфейс), Concrete strategies (реалізації), Context (NavigationApp), Client (UI / код, що міняє стратегію).",
    },
    {
      q: "Плюси / мінуси",
      a: "+ легко додати новий алгоритм, + прибирає if/else/switch, + тестується окремо. − більше класів/файлів, − overkill для одного алгоритму.",
    },
    {
      q: "Коли НЕ використовувати",
      a: "Коли є лише одна поведінка і не планується змін; коли різниця між варіантами — один рядок коду.",
    },
    {
      q: "Як алгоритм варіює незалежно від клієнта",
      a: "NavigationApp знає лише RouteStrategy.calculateRoute(). Fastest/Shortest/Scenic змінюються окремо — клієнт викликає planRoute() як раніше.",
    },
    {
      q: "Open/Closed principle",
      a: "Додати ScenicRouteStrategy — відкрито для розширення. NavigationApp і існуючі стратегії — закриті для змін.",
    },
    {
      q: "Sorting analogy",
      a: "Sorter має SortStrategy: QuickSort, MergeSort, BubbleSort. setStrategy(mergeSort) — той самий sort(array), інший алгоритм.",
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
        «Describe a situation where you&apos;ve used Strategy» — відповідь на PDP: цей navigation demo або
        payment/shipping strategies у реальному проєкті (адаптуй під свій досвід).
      </p>
    </section>
  );
}
