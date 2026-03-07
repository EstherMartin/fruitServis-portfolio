export interface Menu {
  logo: {
    alt: string;
    url: string;
    title: string;
    description: string;
  };
  mainMenu: {
    label: string;
    url?: string;
    dropdown?: {
      title: string;
      description?: string;
      url: string;
    }[];
  }[];
  language: {
    label: string;
    url: string;
  };
}