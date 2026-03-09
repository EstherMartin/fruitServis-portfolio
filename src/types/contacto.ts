export interface ContactSection {
  header: string;
  title: string;
  subtitle: string;
  info: {
    address: string;
    phone: string;
    email: string;
  };
}