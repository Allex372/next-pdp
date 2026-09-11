import { DemoShell } from "@/components/demo/DemoShell";
import { FacadePatternDemo } from "@/components/demo/FacadePatternDemo";

export default function FacadePatternPage() {
  return (
    <DemoShell
      title="Facade pattern"
      description="Home automation: один простий API поверх lights, temperature і security."
    >
      <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Практика</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Код у <code className="font-mono text-xs">src/patterns/facade/</code>. Кнопки викликають
          методи facade — всередині координуються підсистеми.
        </p>
        <div className="mt-4">
          <FacadePatternDemo />
        </div>
      </section>

      <TheorySection />
    </DemoShell>
  );
}

function TheorySection() {
  const items = [
    {
      q: "Що таке Facade?",
      a: "Патерн, що дає простий інтерфейс до складної підсистеми з багатьох класів. Клієнт бачить один «фасад», а не десятки низькорівневих викликів.",
    },
    {
      q: "Real-world приклад",
      a: "API gateway, `fetchUserProfile()` що всередині ходить у auth + DB + cache; smart home app «Leave home» замість 5 окремих device API.",
    },
    {
      q: "Ключові елементи",
      a: "Subsystems (Light, TemperatureControl, SecuritySystem), Facade (HomeAutomationFacade), Client (demo UI / код, що викликає facade).",
    },
    {
      q: "Плюси / мінуси",
      a: "+ простіший client code, + loose coupling, + information hiding. − facade може стати «god object», − приховує деталі — іноді важче дебажити.",
    },
    {
      q: "Коли НЕ використовувати",
      a: "Коли client і так потребує fine-grained control над кожною підсистемою; коли підсистема вже проста.",
    },
    {
      q: "Спрощення інтерфейсу",
      a: "Замість light.turnOn() + setBrightness() + security.arm() + lockDoors() — один facade.leaveHome().",
    },
    {
      q: "Loose coupling",
      a: "Client залежить від HomeAutomationFacade, не від Light/Temperature/Security. Підсистеми можна змінити всередині facade.",
    },
    {
      q: "Information hiding / encapsulation",
      a: "Деталі підсистем (arm, lockDoors, enableHeating) приховані за публічними методами facade.",
    },
    {
      q: "Group complex logic",
      a: "activateSecurity() всередині: arm + lockDoors + turnOffLights — одна відповідальність для client, складність згрупована у facade.",
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
        «Used in a project» — service layer над кількома API, checkout orchestrator, або цей home
        automation demo (адаптуй під свій досвід).
      </p>
    </section>
  );
}
