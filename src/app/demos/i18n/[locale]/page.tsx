import Link from "next/link";
import { DemoSection } from "@/components/demo/DemoSection";
import { DemoShell } from "@/components/demo/DemoShell";
import { getDictionary, locales } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function I18nDemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getDictionary(locale);

  return (
    <DemoShell
      title={t.title}
      description="[locale] у URL + словник перекладів. Middleware на /demos/i18n вибирає мову автоматично."
    >
      <DemoSection title="Переклад" description={t.greeting}>
        <p className="text-lg text-zinc-900 dark:text-zinc-50">{t.greeting}</p>
        <p className="mt-2 text-xs text-zinc-500">
          Поточна locale: <code className="font-mono">{locale}</code>
        </p>
        <div className="mt-4 flex gap-3 text-sm">
          <Link href="/demos/i18n/uk" className="underline">
            Українська
          </Link>
          <Link href="/demos/i18n/en" className="underline">
            English
          </Link>
        </div>
      </DemoSection>
    </DemoShell>
  );
}
