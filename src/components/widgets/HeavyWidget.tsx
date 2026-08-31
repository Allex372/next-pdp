"use client";

export default function HeavyWidget() {
  return (
    <div className="rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100">
      HeavyWidget завантажено через <code>dynamic()</code> — окремий JS chunk.
    </div>
  );
}
