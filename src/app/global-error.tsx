"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="uk">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 p-6 dark:bg-black">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Щось пішло не так (global-error.tsx)
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Спробувати знову
        </button>
      </body>
    </html>
  );
}
