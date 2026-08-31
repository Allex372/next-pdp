import { DemoSection } from "@/components/demo/DemoSection";
import { DemoShell } from "@/components/demo/DemoShell";

export default function MultiZonesDemoPage() {
  return (
    <DemoShell
      title="Multi zones"
      description="Кілька окремих Next.js застосунків під одним доменом. Кожен zone — свій build і deploy."
    >
      <DemoSection
        title="Ідея"
        description="Головний app проксує шляхи на інші Next.js apps через rewrites."
      >
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-xs text-zinc-100">
{`// next.config.js (головний app)
async rewrites() {
  return [
    { source: '/blog', destination: 'https://blog.example.com/blog' },
    { source: '/blog/:path*', destination: 'https://blog.example.com/blog/:path*' },
    { source: '/shop', destination: 'https://shop.example.com/shop' },
  ]
}`}
        </pre>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          Користувач бачить один домен <code>example.com</code>, але /blog і /shop — різні
          застосунки з незалежними командами і деплоями.
        </p>
      </DemoSection>

      <DemoSection
        title="Коли потрібно"
        description="Великі команди, різні release cycles, legacy + новий frontend."
      >
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Мінус: складніший DevOps. Для PDP достатньо пояснити концепцію — окремий другий
          app у цьому репо не піднімаємо.
        </p>
      </DemoSection>
    </DemoShell>
  );
}
