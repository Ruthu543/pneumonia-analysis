import React, { useState } from 'react';
import { ArrowRightCircle } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import DatasetCard from '../components/dashboard/DatasetCard';
import ImageCard from '../components/dashboard/ImageCard';
import { useAuth } from '../context/AuthContext';
import { datasets, images } from '../data/mockData';
import { Dataset, ImageData } from '../types';
import ImageAnalysisView from '../components/analysis/ImageAnalysisView';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [showingAnalysis, setShowingAnalysis] = useState(false);
  
  const handleDatasetSelect = (dataset: Dataset) => {
    setSelectedDataset(dataset);
  };
  
  const handleImageAnalyze = (image: ImageData) => {
    setSelectedImage(image);
    setShowingAnalysis(true);
  };
  
  const handleImageView = (image: ImageData) => {
    setSelectedImage(image);
    setShowingAnalysis(true);
  };
  
  const handleBackFromAnalysis = () => {
    setShowingAnalysis(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="py-6 px-4 sm:px-6 lg:px-8">
        {showingAnalysis && selectedImage ? (
          <ImageAnalysisView 
            image={selectedImage} 
            onBack={handleBackFromAnalysis}
          />
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.username}</h1>
              <p className="text-gray-600">Pneumonia Image Analysis Dashboard</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">Total Images</h3>
                    <div className="mt-1 flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">{images.length}</p>
                      <p className="ml-2 text-sm text-gray-600">images</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">Analyzed</h3>
                    <div className="mt-1 flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">
                        {images.filter(img => img.analyzed).length}
                      </p>
                      <p className="ml-2 text-sm text-gray-600">images</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">Pneumonia Cases</h3>
                    <div className="mt-1 flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">
                        {images.filter(img => img.category === 'pneumonia').length}
                      </p>
                      <p className="ml-2 text-sm text-gray-600">detected</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-900">Available Datasets</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {}}
                >
                  View All Datasets
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {datasets.map(dataset => (
                  <DatasetCard
                    key={dataset.id}
                    dataset={dataset}
                    onSelect={handleDatasetSelect}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-900">Recent Images</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {}}
                >
                  View All Images
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map(image => (
                  <ImageCard
                    key={image.id}
                    image={image}
                    onAnalyze={handleImageAnalyze}
                    onView={handleImageView}
                  />
                ))}
              </div>
            </div>
            
            <div className="mt-12 mb-8">
              <Card>
                <div className="sm:flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Ready to train your own model?</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Use your own dataset to train a custom pneumonia detection model.
                    </p>
                  </div>
                  
                  <div className="mt-4 sm:mt-0">
                    <Button
                      variant="primary"
                      onClick={() => {}}
                      className="flex items-center"
                    >
                      Go to Training
                      <ArrowRightCircle className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;