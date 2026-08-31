export type InputProps = {
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number";
  value?: string;
  disabled?: boolean;
  error?: string;
  onChange?: (value: string) => void;
};

export function Input({
  label,
  placeholder = "",
  type = "text",
  value,
  disabled = false,
  error,
  onChange,
}: InputProps) {
  return (
    <label className="flex w-64 flex-col gap-1.5 text-sm">
      {label ? (
        <span className="font-medium text-zinc-800 dark:text-zinc-200">{label}</span>
      ) : null}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.value)}
        className={`rounded-lg border bg-white px-3 py-2 text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-400 disabled:opacity-50 dark:bg-zinc-950 dark:text-zinc-100 ${
          error
            ? "border-red-500 focus:ring-red-400"
            : "border-zinc-300 dark:border-zinc-700"
        }`}
      />
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
