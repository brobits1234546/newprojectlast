import React, { useState, useCallback, useRef } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { DiseaseCard } from './components/DiseaseCard';
import { potatoDiseases, matchSymptoms } from './data/diseases';
import { getPredictionConfidence, hasDisease } from './utils/imageDetection';
import { Leaf } from 'lucide-react';
import type { DetectionResult } from './types';

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [symptoms, setSymptoms] = useState<string>('');
  const imageRef = useRef<HTMLImageElement>(null);

  const handleSymptomCheck = useCallback(() => {
    const userSymptoms = symptoms.split(',').map(s => s.trim()).filter(s => s);
    if (userSymptoms.length === 0) return;

    setIsAnalyzing(true);
  
    // Find matching diseases
    const matches = matchSymptoms(userSymptoms);

    if (matches.length > 0) {
      const bestMatch = matches[0];
      const confidence = bestMatch.matchCount / bestMatch.disease.symptoms.length;
    
      setResult({
        disease: bestMatch.disease,
        confidence: Math.min(confidence, 0.95) // Cap confidence at 95%
      });
    } else {
      setResult(null);
    }
    
    setIsAnalyzing(false);
  }, [symptoms]);

  const handleImageSelect = useCallback(async (file: File) => {
    setIsAnalyzing(true);
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);

    // Create a new image element for processing
    const img = new Image();
    img.src = imageUrl;
    
    img.onload = async () => {
      try {
        // Get prediction confidences for all diseases
        const confidences = await getPredictionConfidence(img);
        
        // Check if the image shows signs of disease
        if (!hasDisease(confidences)) {
          setResult(null);
          setIsAnalyzing(false);
          return;
        }
        
        // Find the disease with highest confidence
        let maxConfidence = 0;
        let diseaseIndex = 0;
        
        confidences.forEach((confidence, index) => {
          if (confidence > maxConfidence) {
            maxConfidence = confidence;
            diseaseIndex = index;
          }
        });

        setResult({
          disease: potatoDiseases[diseaseIndex],
          confidence: maxConfidence
        });
      } catch (error) {
        console.error('Error analyzing image:', error);
        setResult(null);
      } finally {
        setIsAnalyzing(false);
      }
    };

    img.onerror = () => {
      console.error('Error loading image');
      setIsAnalyzing(false);
      setResult(null);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="w-10 h-10 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              Potato Disease Detector
            </h1>
          </div>
          <p className="text-gray-600">
            Upload a photo or describe symptoms to detect potato diseases
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
            <ImageUpload onImageSelect={handleImageSelect} />
            {selectedImage && (
              <div className="mt-6">
                <img
                  ref={imageRef}
                  src={selectedImage}
                  alt="Selected plant"
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Or Describe Symptoms</h2>
              <div className="space-y-4">
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Enter symptoms separated by commas (e.g., dark spots on leaves, wilting, yellow patches)"
                  className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  onClick={handleSymptomCheck}
                  className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Check Symptoms
                </button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Analysis Result</h2>
            {isAnalyzing ? (
              <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-md">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto"></div>
                  <p className="mt-4 text-gray-600">Analyzing...</p>
                </div>
              </div>
            ) : result ? (
              <DiseaseCard
                disease={result.disease}
                confidence={result.confidence}
              />
            ) : selectedImage ? (
              <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-md">
                <p className="text-gray-500">
                  No disease detected - plant appears healthy
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-md">
                <p className="text-gray-500">
                  Upload an image or describe symptoms to see the analysis
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;