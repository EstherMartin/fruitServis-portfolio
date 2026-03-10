export interface Brand {
  name: string;
  description: string;
  logo: string;
}

export interface BrandsData {
  header: string;
  title: string;
  subtitle: string;
  brands: Brand[];
}