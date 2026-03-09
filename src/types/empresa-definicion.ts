export interface CompanyDefinition {
  header: string;
  title: string;
  subtitle: string;
  intro: string;
  highlights: string[];
  cta: Array<{
    text: string;
    url: string;
  }>;
}