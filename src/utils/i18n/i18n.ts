import type { Menu } from "../../types/menu";
import type { Company } from "../../types/empresa";
import type { Links } from "../../types/enlaces";
import type { FooterData } from "../../types/footer";

export function getLangData(Astro: any) {
  const { lang } = Astro.params;
  const currentLang = lang === "en" ? "en" : "es";
  const switchLang = currentLang === "en" ? "es" : "en";

  const currentPath = Astro.url.pathname;
  const segments = currentPath.split("/").filter(Boolean);
  segments[0] = switchLang;
  const switchLangUrl = "/" + segments.join("/");

  const homeUrl = `/${currentLang}`;

  return {
    currentLang,
    switchLang,
    switchLangUrl,
    homeUrl,
  };
}

async function loadJsonByLang<T>(
  globResult: Record<string, { default: T }>,
  currentLang: string,
  label: string
): Promise<T> {
  const match = Object.entries(globResult).find(([p]) =>
    p.endsWith(`${currentLang}.json`)
  );

  if (!match) {
    throw new Error(`${label} not found for lang: ${currentLang}`);
  }

  return match[1].default;
}

const menuFiles = import.meta.glob<{ default: Menu }>(
  "/src/data/opciones-menu/*.json",
  { eager: true }
);
export const getMenu = (lang: string) =>
  loadJsonByLang<Menu>(menuFiles, lang, "Menu");

const companyFiles = import.meta.glob<{ default: Company }>(
  "/src/data/empresa/*.json",
  { eager: true }
);
export const getCompany = (lang: string) =>
  loadJsonByLang<Company>(companyFiles, lang, "Company");

const linksFiles = import.meta.glob<{ default: Links }>(
  "/src/data/enlaces/*.json",
  { eager: true }
);
export const getLinks = (lang: string) =>
  loadJsonByLang<Links>(linksFiles, lang, "Links");

const footerFiles = import.meta.glob<{ default: FooterData }>(
  "/src/data/footer/*.json",
  { eager: true }
);

export const getFooter = (lang: string) =>
  loadJsonByLang<FooterData>(footerFiles, lang, "Footer");