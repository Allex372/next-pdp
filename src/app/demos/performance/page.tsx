import { DemoSection } from "@/components/demo/DemoSection";
import { DemoShell } from "@/components/demo/DemoShell";
import { WebVitalsReporter } from "@/components/demo/WebVitalsReporter";

export default function PerformanceDemoPage() {
  return (
    <DemoShell
      title="Performance"
      description="Вимірюй швидкість через Web Vitals у коді та Lighthouse у браузері."
    >
      <DemoSection
        title="Web Vitals (у коді)"
        description="useReportWebVitals з next/web-vitals — LCP, INP, CLS. Дані йдуть у console і на екран."
      >
        <WebVitalsReporter />
      </DemoSection>

      <DemoSection
        title="Lighthouse (у браузері)"
        description="Chrome DevTools → Lighthouse → Analyze page load. Шукай bottlenecks: великі зображення, блокуючий JS, повільний LCP."
      >
        <ol className="list-decimal space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
          <li>F12 → вкладка Lighthouse</li>
          <li>Mode: Navigation, Device: Mobile</li>
          <li>Generate report → дивись Performance score</li>
        </ol>
      </DemoSection>
    </DemoShell>
  );
}
