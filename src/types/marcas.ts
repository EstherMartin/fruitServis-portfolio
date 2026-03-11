export interface Brand {
  name: string;
  description: string;
  image: string;
}

export interface BrandsData {
  header: string;
  title: string;
  subtitle: string;
  brands: Brand[];
}