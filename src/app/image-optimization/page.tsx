import Image from "next/image";
import Link from "next/link";
import { DemoSection } from "@/components/demo/DemoSection";

const deployTarget = process.env.DEPLOY_TARGET ?? "ssr";
const isStatic = deployTarget === "static";

const galleryImages = [
  { src: "/images/gallery-1.jpg", alt: "Forest trail" },
  { src: "/images/gallery-2.jpg", alt: "Mountain lake" },
  { src: "/images/gallery-3.jpg", alt: "Sunset valley" },
];

export default function ImageOptimizationPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center gap-10 px-6 py-16 sm:items-start">
        <div className="flex w-full flex-col gap-3">
          <Link
            href="/"
            className="text-sm text-zinc-500 underline underline-offset-2 hover:text-zinc-800 dark:hover:text-zinc-300"
          >
            ← На головну
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Image Optimization
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Демо <code className="rounded bg-zinc-200 px-1 py-0.5 font-mono dark:bg-zinc-800">next/image</code>
            . Режим деплою:{" "}
            <code className="rounded bg-zinc-200 px-1 py-0.5 font-mono dark:bg-zinc-800">
              {deployTarget}
            </code>
            {isStatic
              ? " — images.unoptimized=true, без /_next/image"
              : " — runtime optimizer через /_next/image"}
          </p>
        </div>

        <DemoSection
          title="1. Preload (LCP hero)"
          description="У Next.js 16 замість priority використовується preload. Це головне зображення above-the-fold — браузер завантажує його раніше за інші."
        >
          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
            <Image
              src="/images/hero.jpg"
              alt="Mountain landscape hero"
              width={1600}
              height={900}
              preload
              className="h-auto w-full"
            />
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            DevTools → Network: шукай запит до{" "}
            <code className="font-mono">/_next/image?url=...</code> (SSR) або
            прямий <code className="font-mono">/images/hero.jpg</code> (static).
          </p>
        </DemoSection>

        <DemoSection
          title="2. Responsive sizes + fill"
          description="fill + sizes каже браузеру, який розмір зображення потрібен на різних breakpoints. Next.js генерує srcset автоматично."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative aspect-4/3 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
              <Image
                src="/images/gallery-1.jpg"
                alt="Responsive card 1"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-4/3 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
              <Image
                src="/images/gallery-2.jpg"
                alt="Responsive card 2"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            <code className="font-mono">sizes=&quot;(max-width: 640px) 100vw, 50vw&quot;</code> —
            на мобільному 100% ширини, на desktop ~50%.
          </p>
        </DemoSection>

        <DemoSection
          title="3. Lazy loading (below the fold)"
          description="Зображення без preload завантажуються lazy — тільки коли потрапляють у viewport. Це економить трафік на довгих сторінках."
        >
          <div className="flex flex-col gap-6">
            {galleryImages.map((image) => (
              <div
                key={image.src}
                className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={600}
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Прокрути вниз і подивись у Network — картинки з&apos;являються по черзі.
          </p>
        </DemoSection>

        <DemoSection
          title="4. External image (remotePatterns)"
          description="Зовнішні URL дозволені тільки через images.remotePatterns у next.config.ts. Це security allowlist."
        >
          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
            <Image
              src="https://picsum.photos/seed/external/1200/800"
              alt="External image from picsum.photos"
              width={1200}
              height={800}
              className="h-auto w-full"
            />
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Дозволено в config:{" "}
            <code className="font-mono">hostname: &quot;picsum.photos&quot;</code>
          </p>
        </DemoSection>

        <DemoSection
          title="5. SSR vs Static deployment"
          description="Той самий компонент next/image поводиться по-різному залежно від DEPLOY_TARGET."
        >
          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-100 dark:bg-zinc-800">
                <tr>
                  <th className="px-4 py-2 font-medium text-zinc-700 dark:text-zinc-300">
                    Режим
                  </th>
                  <th className="px-4 py-2 font-medium text-zinc-700 dark:text-zinc-300">
                    Image optimizer
                  </th>
                  <th className="px-4 py-2 font-medium text-zinc-700 dark:text-zinc-300">
                    URL у браузері
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-200 dark:border-zinc-700">
                  <td className="px-4 py-2 font-mono text-xs">ssr (EC2)</td>
                  <td className="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400">
                    ✅ resize, WebP/AVIF, cache
                  </td>
                  <td className="px-4 py-2 font-mono text-xs">
                    /_next/image?url=...
                  </td>
                </tr>
                <tr className="border-t border-zinc-200 dark:border-zinc-700">
                  <td className="px-4 py-2 font-mono text-xs">static (S3+CF)</td>
                  <td className="px-4 py-2 text-xs text-zinc-600 dark:text-zinc-400">
                    ❌ unoptimized=true
                  </td>
                  <td className="px-4 py-2 font-mono text-xs">
                    /images/hero.jpg
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Зараз:{" "}
            <strong>{isStatic ? "static mode" : "SSR mode"}</strong>.
            {isStatic
              ? " Для production static потрібен зовнішній CDN (Cloudinary) або попередня оптимізація при build."
              : " На EC2 Next.js оптимізує зображення на льоту."}
          </p>
        </DemoSection>
      </main>
    </div>
  );
}
