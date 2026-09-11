"use client";

import { useMemo, useState } from "react";
import {
  createSupportChain,
  IncidentManagementSystem,
  type HandleResult,
  type Incident,
} from "@/patterns/chain-of-responsibility";

const sampleIncidents: Incident[] = [
  { id: "INC-101", title: "Forgot password", severity: 1 },
  { id: "INC-202", title: "API timeout on staging", severity: 3 },
  { id: "INC-303", title: "Payment service down", severity: 5 },
];

export function ChainOfResponsibilityDemo() {
  const system = useMemo(
    () => new IncidentManagementSystem(createSupportChain()),
    [],
  );
  const [result, setResult] = useState<HandleResult | null>(null);
  const [lastIncident, setLastIncident] = useState<Incident | null>(null);

  function report(incident: Incident) {
    setLastIncident(incident);
    setResult(system.reportIncident(incident));
  }

  // console.log('amy');
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        {sampleIncidents.map((incident) => (
          <button
            key={incident.id}
            type="button"
            onClick={() => report(incident)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-left text-sm hover:border-zinc-500 dark:border-zinc-600 dark:bg-zinc-950 dark:hover:border-zinc-400"
          >
            <span className="font-mono text-xs text-zinc-500">{incident.id}</span>
            <span className="mt-0.5 block font-medium text-zinc-900 dark:text-zinc-100">
              {incident.title}
            </span>
            <span className="text-xs text-zinc-500">severity: {incident.severity}</span>
          </button>
        ))}
      </div>

      {result && lastIncident ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-4 text-sm dark:border-zinc-700 dark:bg-zinc-950">
          <p>
            <span className="text-zinc-500">Incident:</span> {lastIncident.title} (severity{" "}
            {lastIncident.severity})
          </p>
          <p className="mt-2">
            <span className="text-zinc-500">Handled by:</span>{" "}
            <strong>{result.handledBy}</strong>
          </p>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">{result.message}</p>
        </div>
      ) : null}

      <p className="text-xs text-zinc-500">
        Клієнт викликає лише <code className="font-mono">reportIncident()</code> → Tier1 → Tier2 →
        Tier3, поки хтось не візьме інцидент.
      </p>
    </div>
  );
}
