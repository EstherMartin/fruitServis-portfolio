export interface ContactSection {
  header: string;
  title: string;
  subtitle: string;
  info: {
    label: string;
    value: string;
    type: "text" | "phone" | "email";
  }[];
  mapUrl: string;
}