import React, { useState } from 'react';
import { UploadCloud, Search } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { images } from '../data/mockData';
import { ImageData } from '../types';
import ImageCard from '../components/dashboard/ImageCard';
import ImageAnalysisView from '../components/analysis/ImageAnalysisView';
import ImageUpload from '../components/analysis/ImageUpload';

const AnalysisPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'normal' | 'pneumonia'>('all');
  const [showUpload, setShowUpload] = useState(false);
  
  const filteredImages = images.filter(image => {
    const matchesSearch = 
      image.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = 
      filterCategory === 'all' || image.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleImageView = (image: ImageData) => {
    setSelectedImage(image);
  };
  
  const handleAnalyze = (image: ImageData) => {
    setSelectedImage(image);
  };
  
  const handleBackFromAnalysis = () => {
    setSelectedImage(null);
  };

  const handleUpload = async (file: File) => {
    // Create a temporary URL for the uploaded image
    const imageUrl = URL.createObjectURL(file);
    
    // Create a new image entry
    const newImage: ImageData = {
      id: `temp-${Date.now()}`,
      patientId: `P${Date.now()}`,
      imageUrl,
      date: new Date().toISOString().split('T')[0],
      category: 'pneumonia', // Default category
      tags: ['uploaded', 'pending-analysis'],
      analyzed: false
    };
    
    // Add the new image to the analysis view
    setSelectedImage(newImage);
    setShowUpload(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="py-6 px-4 sm:px-6 lg:px-8">
        {selectedImage ? (
          <ImageAnalysisView 
            image={selectedImage} 
            onBack={handleBackFromAnalysis}
          />
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Image Analysis</h1>
              <p className="text-gray-600">Analyze chest X-ray images for pneumonia detection</p>
            </div>
            
            <div className="mb-8">
              <Card>
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Upload New Image</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Upload a chest X-ray image for pneumonia analysis
                    </p>
                  </div>
                  
                  <div className="mt-4 sm:mt-0">
                    <Button
                      variant="primary"
                      className="flex items-center"
                      onClick={() => setShowUpload(true)}
                    >
                      <UploadCloud className="mr-2 h-5 w-5" />
                      Upload Image
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="mb-6">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by patient ID or tags"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setFilterCategory('all')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      filterCategory === 'all'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    All
                  </button>
                  
                  <button
                    onClick={() => setFilterCategory('normal')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      filterCategory === 'normal'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Normal
                  </button>
                  
                  <button
                    onClick={() => setFilterCategory('pneumonia')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      filterCategory === 'pneumonia'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Pneumonia
                  </button>
                </div>
              </div>
            </div>
            
            {filteredImages.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No images found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map(image => (
                  <ImageCard
                    key={image.id}
                    image={image}
                    onAnalyze={handleAnalyze}
                    onView={handleImageView}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {showUpload && (
          <ImageUpload
            onUpload={handleUpload}
            onClose={() => setShowUpload(false)}
          />
        )}
      </main>
    </div>
  );
};

export default AnalysisPage;