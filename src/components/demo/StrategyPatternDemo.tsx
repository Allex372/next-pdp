"use client";

import { useMemo, useState } from "react";
import {
  FastestRouteStrategy,
  NavigationApp,
  ScenicRouteStrategy,
  ShortestRouteStrategy,
  type RoutePlan,
  type RouteStrategy,
} from "@/patterns/strategy";

type StrategyKey = "fastest" | "shortest" | "scenic";

const strategyMap: Record<StrategyKey, () => RouteStrategy> = {
  fastest: () => new FastestRouteStrategy(),
  shortest: () => new ShortestRouteStrategy(),
  scenic: () => new ScenicRouteStrategy(),
};

const labels: Record<StrategyKey, string> = {
  fastest: "Fastest",
  shortest: "Shortest",
  scenic: "Scenic",
};

export function StrategyPatternDemo() {
  const app = useMemo(() => new NavigationApp(new FastestRouteStrategy()), []);
  const [strategyKey, setStrategyKey] = useState<StrategyKey>("fastest");
  const [route, setRoute] = useState<RoutePlan>(() => app.planRoute("Kyiv", "Lviv"));

  function selectStrategy(key: StrategyKey) {
    app.setStrategy(strategyMap[key]());
    setStrategyKey(key);
    setRoute(app.planRoute("Kyiv", "Lviv"));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(labels) as StrategyKey[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => selectStrategy(key)}
            className={`rounded-lg border px-3 py-1.5 text-sm ${
              strategyKey === key
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-300 bg-white text-zinc-800 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-200"
            }`}
          >
            {labels[key]}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4 text-sm dark:border-zinc-700 dark:bg-zinc-950">
        <p>
          <span className="text-zinc-500">Strategy:</span>{" "}
          <strong>{route.strategyName}</strong>
        </p>
        <p className="mt-1">
          {route.from} → {route.to}
        </p>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{route.summary}</p>
        <p className="mt-2 font-mono text-xs text-zinc-500">
          {route.distanceKm} km · {route.durationMin} min
        </p>
      </div>

      <p className="text-xs text-zinc-500">
        Один <code className="font-mono">NavigationApp</code> →{" "}
        <code className="font-mono">setStrategy(...)</code> → той самий{" "}
        <code className="font-mono">planRoute()</code>, інший алгоритм.
      </p>
    </div>
  );
}
