import React from 'react';
import { Disease } from '../types';

interface DiseaseCardProps {
  disease: Disease;
  confidence: number;
}

export const DiseaseCard: React.FC<DiseaseCardProps> = ({ disease, confidence }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{disease.name}</h3>
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: `${confidence * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Confidence: {(confidence * 100).toFixed(1)}%
        </p>
      </div>
      <p className="text-gray-600 mb-4">{disease.description}</p>
      <div>
        <h4 className="font-medium text-gray-700 mb-2">Common Symptoms:</h4>
        <ul className="list-disc list-inside text-gray-600">
          {disease.symptoms.map((symptom, index) => (
            <li key={index}>{symptom}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};