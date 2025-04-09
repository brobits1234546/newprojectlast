import * as tf from '@tensorflow/tfjs';

// Convert image to feature vector
async function getImageFeatures(imageElement: HTMLImageElement): Promise<Float32Array> {
  // Load MobileNet model for feature extraction
  const model = await tf.loadLayersModel(
    'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json'
  );
  
  return tf.tidy(() => {
    // Preprocess image
    const tensor = tf.browser
      .fromPixels(imageElement)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .expandDims();
    
    // Get features from the second-to-last layer
    const features = model.predict(tensor) as tf.Tensor;
    return features.dataSync() as Float32Array;
  });
}

// Compare features using cosine similarity
function cosineSimilarity(a: Float32Array, b: Float32Array): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Cache for disease image features
const diseaseFeatureCache = new Map<string, Float32Array>();

// Load and cache disease image features
async function loadDiseaseFeatures(imageUrl: string): Promise<Float32Array> {
  if (diseaseFeatureCache.has(imageUrl)) {
    return diseaseFeatureCache.get(imageUrl)!;
  }
  
  const img = new Image();
  img.crossOrigin = 'anonymous';
  
  return new Promise((resolve, reject) => {
    img.onload = async () => {
      const features = await getImageFeatures(img);
      diseaseFeatureCache.set(imageUrl, features);
      resolve(features);
    };
    img.onerror = reject;
    img.src = imageUrl;
  });
}

// Get prediction confidence for all diseases
export async function getPredictionConfidence(imageElement: HTMLImageElement): Promise<number[]> {
  try {
    // Get features of the input image
    const inputFeatures = await getImageFeatures(imageElement);
    
    // Compare with each disease image
    const confidences = await Promise.all(
      potatoDiseases.map(async (disease) => {
        try {
          const diseaseFeatures = await loadDiseaseFeatures(disease.imageUrl);
          const similarity = cosineSimilarity(inputFeatures, diseaseFeatures);
          // Convert similarity to confidence score (0-1)
          return Math.max(0, Math.min(1, (similarity + 1) / 2));
        } catch (error) {
          console.error(`Error comparing with disease ${disease.name}:`, error);
          return 0;
        }
      })
    );
    
    // Normalize confidences
    const sum = confidences.reduce((a, b) => a + b, 0);
    return confidences.map(c => c / sum);
    
  } catch (error) {
    console.error('Error in disease detection:', error);
    throw error;
  }
}

// Check if image shows signs of disease
export function hasDisease(confidences: number[]): boolean {
  // Get the highest confidence score
  const maxConfidence = Math.max(...confidences);
  
  // If any disease has high confidence (>60%), consider it diseased
  return maxConfidence > 0.6;
}