import { ImageData, Dataset, AnalysisResult, User } from '../types';

// Mock users
export const users: User[] = [
  {
    id: '1',
    username: 'doctor',
    email: 'doctor@example.com',
    role: 'doctor'
  },
  {
    id: '2',
    username: 'researcher',
    email: 'researcher@example.com',
    role: 'researcher'
  },
  {
    id: '3',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin'
  }
];

// Real datasets from Kaggle
export const datasets: Dataset[] = [
  {
    id: '1',
    name: 'Chest X-Ray Pneumonia Dataset',
    description: 'A large dataset of chest X-ray images for pneumonia detection from Guangzhou Women and Children\'s Medical Center',
    imageCount: 5856,
    lastUpdated: '2024-03-15',
    source: 'https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia'
  },
  {
    id: '2',
    name: 'COVID-19 Radiography Database',
    description: 'COVID-19, pneumonia, and normal chest X-ray images collected from multiple sources',
    imageCount: 3616,
    lastUpdated: '2024-03-15',
    source: 'https://www.kaggle.com/datasets/tawsifurrahman/covid19-radiography-database'
  }
];

// Sample images from the datasets
export const images: ImageData[] = [
  {
    id: '1',
    patientId: 'PNEUMONIA_1',
    imageUrl: 'https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg',
    date: '2024-03-15',
    category: 'pneumonia',
    tags: ['bacterial', 'pediatric'],
    confidence: 0.89,
    analyzed: true
  },
  {
    id: '2',
    patientId: 'COVID_1',
    imageUrl: 'https://images.pexels.com/photos/4226264/pexels-photo-4226264.jpeg',
    date: '2024-03-15',
    category: 'pneumonia',
    tags: ['covid-19', 'severe'],
    confidence: 0.92,
    analyzed: true
  }
];

// Analysis results
export const analysisResults: AnalysisResult[] = [
  {
    id: '1',
    imageId: '1',
    result: 'pneumonia',
    confidence: 0.89,
    date: '2024-03-15',
    areas: [
      { x: 150, y: 200, width: 100, height: 80, confidence: 0.92 }
    ]
  },
  {
    id: '2',
    imageId: '2',
    result: 'pneumonia',
    confidence: 0.92,
    date: '2024-03-15',
    areas: [
      { x: 200, y: 180, width: 90, height: 70, confidence: 0.94 }
    ]
  }
];