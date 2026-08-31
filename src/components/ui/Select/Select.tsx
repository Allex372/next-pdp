export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = {
  label?: string;
  options: SelectOption[];
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

export function Select({
  label,
  options,
  value,
  disabled = false,
  onChange,
}: SelectProps) {
  return (
    <label className="flex w-64 flex-col gap-1.5 text-sm">
      {label ? (
        <span className="font-medium text-zinc-800 dark:text-zinc-200">{label}</span>
      ) : null}
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.value)}
        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-400 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
