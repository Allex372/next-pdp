"use client";

import { useReportWebVitals } from "next/web-vitals";
import { useState } from "react";

type MetricRow = { name: string; value: number };

export function WebVitalsReporter() {
  const [metrics, setMetrics] = useState<MetricRow[]>([]);

  useReportWebVitals((metric) => {
    setMetrics((prev) => {
      const next = prev.filter((m) => m.name !== metric.name);
      return [...next, { name: metric.name, value: metric.value }];
    });
  });

  if (metrics.length === 0) {
    return (
      <p className="text-sm text-zinc-500">
        Оновіть сторінку — метрики з&apos;являться тут і в DevTools Console.
      </p>
    );
  }

  return (
    <ul className="space-y-1 font-mono text-xs text-zinc-700 dark:text-zinc-300">
      {metrics.map((m) => (
        <li key={m.name}>
          {m.name}: {Math.round(m.value)}
          {m.name === "CLS" ? "" : " ms"}
        </li>
      ))}
    </ul>
  );
}
