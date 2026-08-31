"use client";

export default function ErrorsSegmentError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950">
      <h2 className="text-lg font-semibold text-red-900 dark:text-red-100">
        Error boundary спрацював
      </h2>
      <p className="mt-2 text-sm text-red-800 dark:text-red-200">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-600"
      >
        Спробувати знову
      </button>
    </div>
  );
}
