import { languages, defaultLang, isValidLang, type Language } from "./config";

export function generateStaticPaths() {
  return languages.map((lang) => ({
    params: { lang }
  }));
}

export function detectBrowserLang(header: string | null): Language {
  if (!header) return defaultLang;

  const browserLang = header.split(",")[0].split("-")[0];

  return isValidLang(browserLang) ? browserLang : defaultLang;
}

export function buildUrl(lang: Language, slug?: string) {
  if (!slug) return `/${lang}`;
  const cleanSlug = slug.replace(/^\/|\/$/g, "");
  return `/${lang}/${cleanSlug}`;
}