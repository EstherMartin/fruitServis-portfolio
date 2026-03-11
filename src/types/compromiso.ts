export interface CommitmentPillar {
  title: string;
  text: string;
}

export interface CommitmentMetric {
  value: string;
  label: string;
}

export interface CommitmentData {
  header: string;
  heroTitle: string;
  heroSubtitle: string;
  pillars: CommitmentPillar[];
  quote: string;
  metrics: CommitmentMetric[];
}