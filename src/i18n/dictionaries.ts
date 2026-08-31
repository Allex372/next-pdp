export const locales = ["uk", "en"] as const;
export type Locale = (typeof locales)[number];

const dict = {
  uk: { title: "Інтернаціоналізація", greeting: "Привіт! Це українська версія." },
  en: { title: "Internationalization", greeting: "Hello! This is the English version." },
} as const;

export function getDictionary(locale: string) {
  return dict[locale === "en" ? "en" : "uk"];
}
