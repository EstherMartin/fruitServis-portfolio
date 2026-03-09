export interface Formulario {
  header: string;
  title: string;
  subtitle: string;
  fields: {
    name: string;
    company: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    cv: string;
  };
  options: {
    value: string;
    label: string;
  }[];
  button: string;
}