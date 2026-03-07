import type { Menu } from "../types/menu";

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

export async function getMenu(currentLang: string): Promise<Menu> {
  const menus = import.meta.glob<Menu>(
    "../data/opciones-menu/*.json",
    { eager: true }
  );

  return menus[`../data/opciones-menu/${currentLang}.json`] as Menu;
}