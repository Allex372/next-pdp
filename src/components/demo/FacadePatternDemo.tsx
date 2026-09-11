"use client";

import { useMemo, useState } from "react";
import { HomeAutomationFacade, type HomeState } from "@/patterns/facade";

type Action = {
  label: string;
  run: (facade: HomeAutomationFacade) => void;
};

const actions: Action[] = [
  { label: "Turn on lights", run: (f) => f.turnOnLights() },
  { label: "Set temperature 22°C", run: (f) => f.setTemperature(22) },
  { label: "Activate security", run: (f) => f.activateSecurity() },
  { label: "Leave home", run: (f) => f.leaveHome() },
  { label: "Arrive home", run: (f) => f.arriveHome() },
];

export function FacadePatternDemo() {
  const facade = useMemo(() => new HomeAutomationFacade(), []);
  const [state, setState] = useState<HomeState>(() => facade.getState());
  const [lastAction, setLastAction] = useState<string | null>(null);

  function runAction(action: Action) {
    action.run(facade);
    setLastAction(action.label);
    setState(facade.getState());
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={() => runAction(action)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm hover:border-zinc-500 dark:border-zinc-600 dark:bg-zinc-950 dark:hover:border-zinc-400"
          >
            {action.label}
          </button>
        ))}
      </div>

      {lastAction ? (
        <p className="text-xs text-zinc-500">
          Останній виклик facade: <strong>{lastAction}</strong> — один метод, кілька підсистем всередині.
        </p>
      ) : null}

      <div className="rounded-xl border border-zinc-200 bg-white p-4 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-950">
        <p>lights: {JSON.stringify(state.lights)}</p>
        <p className="mt-1">temperature: {JSON.stringify(state.temperature)}</p>
        <p className="mt-1">security: {JSON.stringify(state.security)}</p>
      </div>

      <p className="text-xs text-zinc-500">
        Client працює лише з <code className="font-mono">HomeAutomationFacade</code>, не з Light /
        TemperatureControl / SecuritySystem.
      </p>
    </div>
  );
}
