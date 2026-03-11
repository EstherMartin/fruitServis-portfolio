export interface FieldBlock {
  title: string;
  text: string[];
  image: string;
}

export interface CampoData {
  header: string;
  heroTitle: string;
  heroSubtitle: string;
  sections: FieldBlock[];
  certificationsTitle: string;
}