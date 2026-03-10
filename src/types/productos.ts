export interface Product {
  name: string;
  description: string;
  image: string;
  season: string;
}

export interface ProductsData {
  header: string;
  title: string;
  subtitle: string;
  products: Product[];
}