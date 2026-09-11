import Link from "next/link";
import { DemoShell } from "@/components/demo/DemoShell";

const demos = [
  { href: "/demos/performance", title: "Performance", note: "Web Vitals, Lighthouse" },
  { href: "/demos/multi-zones", title: "Multi zones", note: "кілька Next.js apps на одному домені" },
  { href: "/demos/rendering", title: "Advanced rendering", note: "ISR, dynamic import, streaming" },
  { href: "/demos/api", title: "API routes", note: "Node, Edge, middleware" },
  { href: "/demos/i18n", title: "i18n", note: "locale routing + переклади" },
  { href: "/demos/configuration", title: "Configuration", note: "env, webpack alias" },
  { href: "/demos/errors", title: "Error handling", note: "404, 500, error boundary" },
  { href: "/demos/strategy-pattern", title: "Strategy pattern", note: "RouteStrategy, NavigationApp" },
  { href: "/demos/chain-of-responsibility", title: "Chain of Responsibility", note: "Tier1 → Tier2 → Tier3" },
  { href: "/demos/facade-pattern", title: "Facade pattern", note: "HomeAutomationFacade" },
  { href: "/demos/decorator-pattern", title: "Decorator pattern", note: "Pizza + toppings" },
  { href: "/image-optimization", title: "Image optimization", note: "next/image (окремо)" },
];

export default function DemosIndexPage() {
  return (
    <DemoShell
      title="Next.js Advanced PDP"
      description="Мінімальні демо — по одній ідеї на сторінку. Більшість працює в SSR (EC2); static (S3) без API/ISR/middleware."
    >
      <ul className="space-y-3">
        {demos.map((d) => (
          <li key={d.href}>
            <Link
              href={d.href}
              className="block rounded-lg border border-zinc-200 bg-white px-4 py-3 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:border-zinc-500"
            >
              <span className="font-medium text-zinc-900 dark:text-zinc-50">{d.title}</span>
              <span className="mt-1 block text-xs text-zinc-500">{d.note}</span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Storybook (окремо від Next.js)
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Component library з stories, controls, actions, a11y та docs. Запускається на порту 6006.
        </p>
        <code className="mt-3 block rounded-lg bg-zinc-100 px-3 py-2 font-mono text-xs dark:bg-zinc-900">
          npm run storybook
        </code>
      </section>
    </DemoShell>
  );
}
