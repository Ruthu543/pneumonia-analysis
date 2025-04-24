export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'doctor' | 'researcher';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ImageData {
  id: string;
  patientId: string;
  imageUrl: string;
  date: string;
  category: 'normal' | 'pneumonia';
  tags: string[];
  confidence?: number;
  analyzed: boolean;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  imageCount: number;
  lastUpdated: string;
  source: string;
}

export interface AnalysisResult {
  id: string;
  imageId: string;
  result: 'normal' | 'pneumonia';
  confidence: number;
  date: string;
  areas?: {
    x: number;
    y: number;
    width: number;
    height: number;
    confidence: number;
  }[];
}