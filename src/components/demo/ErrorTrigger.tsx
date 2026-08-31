"use client";

export function ErrorTrigger() {
  return (
    <button
      type="button"
      onClick={() => {
        throw new Error("Demo error from client component");
      }}
      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
    >
      Кинути помилку (error boundary)
    </button>
  );
}
