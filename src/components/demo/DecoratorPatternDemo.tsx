"use client";

import { useMemo, useState } from "react";
import {
  BasicPizza,
  CheeseTopping,
  MushroomTopping,
  PepperoniTopping,
  type Pizza,
} from "@/patterns/decorator";

type ToppingKey = "cheese" | "pepperoni" | "mushroom";

const toppingOptions: { key: ToppingKey; label: string; wrap: (pizza: Pizza) => Pizza }[] = [
  { key: "cheese", label: "+ Cheese ($1.50)", wrap: (p) => new CheeseTopping(p) },
  { key: "pepperoni", label: "+ Pepperoni ($2)", wrap: (p) => new PepperoniTopping(p) },
  { key: "mushroom", label: "+ Mushrooms ($1)", wrap: (p) => new MushroomTopping(p) },
];

export function DecoratorPatternDemo() {
  const [selected, setSelected] = useState<ToppingKey[]>([]);

  const order = useMemo(() => {
    let pizza: Pizza = new BasicPizza();
    for (const key of selected) {
      const option = toppingOptions.find((o) => o.key === key)!;
      pizza = option.wrap(pizza);
    }
    return pizza;
  }, [selected]);

  function toggleTopping(key: ToppingKey) {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {toppingOptions.map((option) => {
          const active = selected.includes(option.key);
          return (
            <button
              key={option.key}
              type="button"
              onClick={() => toggleTopping(option.key)}
              className={`rounded-lg border px-3 py-1.5 text-sm ${
                active
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                  : "border-zinc-300 bg-white text-zinc-800 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-200"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4 text-sm dark:border-zinc-700 dark:bg-zinc-950">
        <p>
          <span className="text-zinc-500">Description:</span> {order.getDescription()}
        </p>
        <p className="mt-2">
          <span className="text-zinc-500">Cost:</span>{" "}
          <strong>${order.getCost().toFixed(2)}</strong>
        </p>
      </div>

      <p className="text-xs text-zinc-500">
        Кожен topping — decorator, що обгортає попередній об&apos;єкт:{" "}
        <code className="font-mono">new PepperoniTopping(new CheeseTopping(new BasicPizza()))</code>
      </p>
    </div>
  );
}
