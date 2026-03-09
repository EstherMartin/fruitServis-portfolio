export const languages = ["es", "en"] as const;
export type Language = typeof languages[number];

export const defaultLang: Language = "es";

export function isValidLang(lang: string): lang is Language {
  return languages.includes(lang as Language);
}

