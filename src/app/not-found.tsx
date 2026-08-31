import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 px-6 dark:bg-black">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">404</h1>
      <p className="text-zinc-600 dark:text-zinc-400">Сторінку не знайдено (custom not-found.tsx)</p>
      <Link href="/" className="text-blue-600 underline dark:text-blue-400">
        На головну
      </Link>
    </div>
  );
}
