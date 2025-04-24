import React, { useState } from 'react';
import { ChevronLeft, Loader, AlertCircle, CheckCircle, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { ImageData, AnalysisResult } from '../../types';
import { analysisResults } from '../../data/mockData';

interface ImageAnalysisViewProps {
  image: ImageData;
  onBack: () => void;
}

const ImageAnalysisView: React.FC<ImageAnalysisViewProps> = ({ image, onBack }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(
    analysisResults.find(r => r.imageId === image.id) || null
  );
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      const newResult: AnalysisResult = {
        id: `result-${Date.now()}`,
        imageId: image.id,
        result: Math.random() > 0.5 ? 'pneumonia' : 'normal',
        confidence: 0.6 + Math.random() * 0.3,
        date: new Date().toISOString().split('T')[0],
        areas: Math.random() > 0.5 ? [
          {
            x: 150 + Math.random() * 100,
            y: 200 + Math.random() * 100,
            width: 60 + Math.random() * 40,
            height: 60 + Math.random() * 40,
            confidence: 0.7 + Math.random() * 0.2
          }
        ] : undefined
      };
      
      setResult(newResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const rotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to images
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Image Viewer</h2>
              <div className="flex space-x-2">
                <button
                  onClick={zoomIn}
                  className="p-2 rounded-full hover:bg-gray-100"
                  title="Zoom In"
                >
                  <ZoomIn className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={zoomOut}
                  className="p-2 rounded-full hover:bg-gray-100"
                  title="Zoom Out"
                >
                  <ZoomOut className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={rotate}
                  className="p-2 rounded-full hover:bg-gray-100"
                  title="Rotate"
                >
                  <RotateCw className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="relative bg-black rounded-lg overflow-hidden" style={{ height: '500px' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={image.imageUrl}
                  alt={`Patient ${image.patientId} X-ray`}
                  className="max-h-full max-w-full object-contain transition-transform duration-300"
                  style={{
                    transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  }}
                />
                
                {result?.areas && (
                  <div className="absolute inset-0 pointer-events-none">
                    {result.areas.map((area, index) => (
                      <div
                        key={index}
                        className="absolute border-2 border-red-500"
                        style={{
                          left: `${area.x}px`,
                          top: `${area.y}px`,
                          width: `${area.width}px`,
                          height: `${area.height}px`,
                          transform: `scale(${zoom}) rotate(${rotation}deg)`,
                          transformOrigin: 'center'
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Image Information</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Patient ID</p>
                <p className="text-base text-gray-900">{image.patientId}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-base text-gray-900">{image.date}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Category</p>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  image.category === 'pneumonia' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {image.category === 'pneumonia' ? (
                    <AlertCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  )}
                  {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Tags</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {image.tags.map((tag, index) => (
                    <div key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Analysis</h3>
            
            {isAnalyzing ? (
              <div className="flex flex-col items-center py-6">
                <Loader className="h-8 w-8 text-blue-600 animate-spin mb-3" />
                <p className="text-gray-600">Analyzing image...</p>
              </div>
            ) : result ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Result</p>
                  <div className={`mt-1 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    result.result === 'pneumonia' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {result.result === 'pneumonia' ? (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    )}
                    {result.result.charAt(0).toUpperCase() + result.result.slice(1)}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Confidence</p>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                      <div 
                        className={`h-2.5 rounded-full ${
                          result.confidence > 0.8 
                            ? 'bg-green-500' 
                            : result.confidence > 0.6 
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${result.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {Math.round(result.confidence * 100)}%
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Analysis Date</p>
                  <p className="text-base text-gray-900">{result.date}</p>
                </div>
                
                {result.areas && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Detected Areas</p>
                    <p className="text-sm text-gray-600">
                      {result.areas.length} area{result.areas.length !== 1 ? 's' : ''} of concern detected
                    </p>
                  </div>
                )}
                
                <Button
                  variant="outline"
                  onClick={handleAnalyze}
                  fullWidth
                >
                  Re-run Analysis
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center py-4">
                <p className="text-gray-600 mb-4">No analysis results available</p>
                <Button
                  variant="primary"
                  onClick={handleAnalyze}
                >
                  Analyze Image
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalysisView;