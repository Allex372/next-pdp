import Image from "next/image";

const deployTarget = process.env.DEPLOY_TARGET ?? "ssr";

const publicEnvVars = [
  { key: "NEXT_PUBLIC_APP_NAME", value: process.env.NEXT_PUBLIC_APP_NAME },
  { key: "NEXT_PUBLIC_API_URL", value: process.env.NEXT_PUBLIC_API_URL },
  { key: "NEXT_PUBLIC_ENVIRONMENT", value: process.env.NEXT_PUBLIC_ENVIRONMENT },
];

const serverEnvVars = [
  { key: "DATABASE_URL", value: process.env.DATABASE_URL },
  { key: "API_SECRET_KEY", value: process.env.API_SECRET_KEY },
  { key: "INTERNAL_SERVICE_TOKEN", value: process.env.INTERNAL_SERVICE_TOKEN },
];

function EnvTable({
  title,
  description,
  vars,
}: {
  title: string;
  description: string;
  vars: { key: string; value: string | undefined }[];
}) {
  return (
    <section className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
      <p className="mt-1 mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-100 dark:bg-zinc-800">
            <tr>
              <th className="px-4 py-2 font-medium text-zinc-700 dark:text-zinc-300">
                Змінна
              </th>
              <th className="px-4 py-2 font-medium text-zinc-700 dark:text-zinc-300">
                Значення
              </th>
            </tr>
          </thead>
          <tbody>
            {vars.map(({ key, value }) => (
              <tr
                key={key}
                className="border-t border-zinc-200 dark:border-zinc-700"
              >
                <td className="px-4 py-2 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                  {key}
                </td>
                <td className="px-4 py-2 font-mono text-xs text-zinc-900 dark:text-zinc-100">
                  {value ?? (
                    <span className="text-red-500">не встановлено</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center gap-10 px-6 py-16 sm:items-start">
        <div className="flex items-center gap-4">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Next.js Env Demo
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Тестові змінні середовища з файлу{" "}
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
              .env.local
            </code>
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            Режим деплою:{" "}
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono dark:bg-zinc-800">
              {deployTarget}
            </code>
            {deployTarget === "static"
              ? " — серверні змінні запікаються під час build"
              : " — серверні змінні читаються на EC2 під час запиту"}
          </p>
        </div>

        <EnvTable
          title="Публічні змінні (NEXT_PUBLIC_*)"
          description="Доступні і на сервері, і в браузері. Не зберігайте тут секрети."
          vars={publicEnvVars}
        />

        <EnvTable
          title="Серверні змінні"
          description="Доступні тільки в Server Components та API routes. Не потрапляють у клієнтський бандл."
          vars={serverEnvVars}
        />
      </main>
    </div>
  );
}
