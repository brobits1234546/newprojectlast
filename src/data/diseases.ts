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
    imageUrl: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTkz5__NMfkHi2sboudmjn61U7Uh6NPMUMYFAldeUXRKX2IVuGcSgszBh1F3-vORO8SrT2ZEuH2yZFO49nm2JMtEA"
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
    imageUrl: "https://veggiescout.ca.uky.edu/sites/veggiescout.ca.uky.edu/files/inline-images/65b%20early%20blight%20tuber%20%28Sandra%20Jensen%20Cornell%29%205492318.jpg"
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
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTj8gzIrveJ5p3MuHXKmf1hz-o8haoYo9KMw&s"
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
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0HdCauBDPQfAw8hdPcqxLDlKkcdfhza76zw&s"
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
    imageUrl: "https://www.daera-ni.gov.uk/sites/default/files/styles/nigov_full_620_x1/public/images/daera/ClavibacterMichiganensisInfectedPotatoTuber.jpg?itok=QyP5ajyC"
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
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ4S79dY8di35SUIt_uSU8dcyDc8IWlpJoww&s"
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
    imageUrl: "https://www.agric.wa.gov.au/sites/gateway/files/fusarium%20dry%20rot%2019-11-07%20%2810%29_0.JPG"
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
    imageUrl: "https://www.growingproduce.com/wp-content/uploads/2018/09/potato-pink-rot.jpg"
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
