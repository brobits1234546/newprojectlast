export interface Disease {
  id: number;
  name: string;
  description: string;
  symptoms: string[];
  imageUrl: string;
}

export interface DetectionResult {
  disease: Disease;
  confidence: number;
}