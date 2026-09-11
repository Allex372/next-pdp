import { DemoShell } from "@/components/demo/DemoShell";
import { DecoratorPatternDemo } from "@/components/demo/DecoratorPatternDemo";

export default function DecoratorPatternPage() {
  return (
    <DemoShell
      title="Decorator pattern"
      description="Pizza ordering: toppings додають description і cost без зміни BasicPizza."
    >
      <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Практика</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Код у <code className="font-mono text-xs">src/patterns/decorator/</code>. Обери toppings —
          кожен обгортає pizza decorator chain.
        </p>
        <div className="mt-4">
          <DecoratorPatternDemo />
        </div>
      </section>

      <TheorySection />
    </DemoShell>
  );
}

function TheorySection() {
  const items = [
    {
      q: "Що таке Decorator?",
      a: "Патерн, що додає поведінку об'єкту динамічно, обгортаючи його в decorator-класи з тим самим інтерфейсом. BasicPizza не змінюється — toppings додаються ззовні.",
    },
    {
      q: "Real-world приклад",
      a: "Pizza toppings, stream wrappers (buffered → gzip), UI HOC (withAuth, withTheme), middleware layers навколо handler.",
    },
    {
      q: "Ключові елементи",
      a: "Component (Pizza), Concrete component (BasicPizza), Decorator (PizzaDecorator), Concrete decorators (Cheese, Pepperoni), Client (demo UI).",
    },
    {
      q: "Плюси / мінуси",
      a: "+ додає features без subclass explosion, + open/closed, + комбінує поведінку в runtime. − багато маленьких класів, − важче простежити порядок обгорток.",
    },
    {
      q: "Коли НЕ використовувати",
      a: "Коли потрібен один фіксований набір features; коли decorator chain стає надто глибоким; коли простіше composition через config.",
    },
    {
      q: "Dynamic behavior без впливу на інші об'єкти",
      a: "Один клієнт обгортає BasicPizza у Cheese + Pepperoni; інший лишає BasicPizza — різні об'єкти, різна поведінка.",
    },
    {
      q: "Open/Closed",
      a: "Новий MushroomTopping — новий клас-decorator. BasicPizza і існуючі toppings не змінюються.",
    },
    {
      q: "Single Responsibility",
      a: "CheeseTopping відповідає лише за cheese; PepperoniTopping — лише за pepperoni. BasicPizza — базова ціна.",
    },
    {
      q: "Add features without modifying class",
      a: "BasicPizza не знає про toppings. CheeseTopping розширює getDescription/getCost через wrap.",
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
        «Used in a project» — React HOC/wrappers, logging decorators, або цей pizza demo (адаптуй під
        свій досвід).
      </p>
    </section>
  );
}
