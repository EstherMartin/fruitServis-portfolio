import type { Menu } from "../../types/menu";
import type { CompanyHistory } from "../../types/empresa-historia";
import type { CompanyDefinition } from "../../types/empresa-definicion";
import type { Links } from "../../types/enlaces";
import type { FooterData } from "../../types/footer";
import type { ContactSection } from "../../types/contacto";

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

  const filePath = Object.keys(globResult).find(path =>
    path.endsWith(`/${currentLang}.json`)
  );

  if (!filePath) {
    throw new Error(`${label} not found for lang: ${currentLang}`);
  }

  return globResult[filePath].default;
}

const menuFiles = import.meta.glob<{ default: Menu }>(
  "/src/data/opciones-menu/*.json",
  { eager: true }
);
export const getMenu = (lang: string) =>
  loadJsonByLang<Menu>(menuFiles, lang, "Menu");

const companyHistoryFiles = import.meta.glob<{ default: CompanyHistory }>(
  "/src/data/empresa-historia/*.json",
  { eager: true }
);
export const getCompanyHistory = (lang: string) =>
  loadJsonByLang<CompanyHistory>(companyHistoryFiles, lang, "CompanyHistory");

const companyDefinitionFiles = import.meta.glob<{ default: CompanyDefinition }>(
  "/src/data/empresa-definicion/*.json",
  { eager: true }
);
export const getCompanyDefinition = (lang: string) =>
  loadJsonByLang<CompanyDefinition>(companyDefinitionFiles, lang, "CompanyDefinition");

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

const contactFiles = import.meta.glob<{ default: ContactSection }>(
  "/src/data/contacto/*.json",
  { eager: true }
);
export const getContact = (lang: string) =>
  loadJsonByLang<ContactSection>(contactFiles, lang, "Contact");

const formularioFiles = import.meta.glob<{ default: Formulario }>(
  "/src/data/formulario/*.json",
  { eager: true }
);

export const getFormulario = (lang: string) =>
  loadJsonByLang<Formulario>(formularioFiles, lang, "Formulario");