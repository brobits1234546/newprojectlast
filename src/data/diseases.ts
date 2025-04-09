import { Disease } from '../types';

export const potatoDiseases: Disease[] = [
  {
    id: 1,
    name: "Late Blight",
    description: "A serious disease caused by the fungus Phytophthora infestans. Can destroy entire fields within days if not treated.",
    symptoms: [
      "Dark brown spots on leaves",
      "White fungal growth on leaf undersides",
      "Rapid wilting",
      "Water-soaked black stems",
      "Infected tubers with reddish-brown spots"
    ],
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655"
  },
  {
    id: 2,
    name: "Early Blight",
    description: "Caused by the fungus Alternaria solani. Common in warm, humid conditions.",
    symptoms: [
      "Dark brown to black lesions with concentric rings",
      "Yellowing of leaves",
      "Leaf drop",
      "Small, dark spots on stems",
      "Dry, sunken areas on tubers"
    ],
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655"
  },
  {
    id: 3,
    name: "Bacterial Soft Rot",
    description: "Caused by various bacteria, particularly in wet conditions and poor storage.",
    symptoms: [
      "Soft, mushy tuber tissue",
      "Foul odor",
      "Dark, water-soaked areas",
      "Cream-colored bacterial ooze",
      "Collapsed plant tissue"
    ],
    imageUrl: "https://images.unsplash.com/photo-1508861147305-f48512b7a29e"
  },
  {
    id: 4,
    name: "Common Scab",
    description: "Caused by Streptomyces bacteria. Affects tuber quality but not yield.",
    symptoms: [
      "Rough, corky patches on tubers",
      "Brown, raised lesions",
      "Network of surface scratches",
      "Shallow or deep pits in tuber skin",
      "Star-shaped cracks"
    ],
    imageUrl: "https://images.unsplash.com/photo-1590690013276-80bfe717fc1a"
  },
  {
    id: 5,
    name: "Blackleg",
    description: "Bacterial disease causing stem rot and tuber decay.",
    symptoms: [
      "Black stem base",
      "Yellowing and wilting leaves",
      "Stunted growth",
      "Slimy stem rot",
      "Tuber soft rot at stolon end"
    ],
    imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399"
  },
  {
    id: 6,
    name: "Potato Virus Y (PVY)",
    description: "Most important viral potato disease worldwide.",
    symptoms: [
      "Mosaic patterns on leaves",
      "Leaf drop",
      "Stunted growth",
      "Necrotic spots",
      "Wrinkled leaves"
    ],
    imageUrl: "https://images.unsplash.com/photo-1533241242276-46a506b40d66"
  },
  {
    id: 7,
    name: "Ring Rot",
    description: "Bacterial disease that can devastate potato crops.",
    symptoms: [
      "Wilting of plants",
      "Yellow-orange discoloration",
      "Stem vascular tissue discoloration",
      "Tuber tissue breakdown",
      "Cheese-like rot in tubers"
    ],
    imageUrl: "https://images.unsplash.com/photo-1530176928500-2372a88e46ab"
  },
  {
    id: 8,
    name: "Silver Scurf",
    description: "Fungal disease affecting tuber appearance and storage.",
    symptoms: [
      "Silvery patches on tuber skin",
      "Dark spores on lesions",
      "Shrinkage in storage",
      "Metallic sheen on tubers",
      "Skin peeling"
    ],
    imageUrl: "https://images.unsplash.com/photo-1510148199876-8a856ee41d42"
  },
  {
    id: 9,
    name: "Fusarium Dry Rot",
    description: "Major storage disease caused by Fusarium species.",
    symptoms: [
      "Brown, wrinkled skin",
      "Internal cavities with mycelia",
      "Concentric rings in flesh",
      "Dark brown to black discoloration",
      "Dry, crumbly rot"
    ],
    imageUrl: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2"
  },
  {
    id: 10,
    name: "Pink Rot",
    description: "Soil-borne disease causing tuber rot in field and storage.",
    symptoms: [
      "Pink coloration when exposed to air",
      "Watery, spongy texture",
      "Distinctive sweet smell",
      "External darkening",
      "Complete tuber breakdown"
    ],
    imageUrl: "https://images.unsplash.com/photo-1528825871115-3581a5387919"
  }
];

// Function to match symptoms with diseases
export function matchSymptoms(userSymptoms: string[]): { disease: Disease; matchCount: number }[] {
  return potatoDiseases.map(disease => {
    const matchCount = disease.symptoms.filter(symptom =>
      userSymptoms.some(userSymptom =>
        userSymptom.toLowerCase().includes(symptom.toLowerCase()) ||
        symptom.toLowerCase().includes(userSymptom.toLowerCase())
      )
    ).length;
    return { disease, matchCount };
  })
  .filter(result => result.matchCount > 0)
  .sort((a, b) => b.matchCount - a.matchCount);
}