import React from 'react';
import { Tag, AlertCircle, CheckCircle } from 'lucide-react';
import Card from '../common/Card';
import { ImageData } from '../../types';
import Button from '../common/Button';

interface ImageCardProps {
  image: ImageData;
  onAnalyze: (image: ImageData) => void;
  onView: (image: ImageData) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onAnalyze, onView }) => {
  return (
    <Card className="h-full flex flex-col" hoverable>
      <div className="relative pb-[75%] mb-4 overflow-hidden rounded-md bg-gray-100">
        <img 
          src={image.imageUrl} 
          alt={`Patient ${image.patientId} X-ray`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        
        <div className="absolute top-2 right-2">
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
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium text-gray-900">Patient: {image.patientId}</h3>
        <span className="text-sm text-gray-500">{image.date}</span>
      </div>
      
      <div className="mb-3 flex flex-wrap gap-1">
        {image.tags.map((tag, index) => (
          <div key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Tag className="h-3 w-3 mr-1" />
            {tag}
          </div>
        ))}
      </div>
      
      <div className="mt-auto flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView(image)}
        >
          View Details
        </Button>
        
        {!image.analyzed ? (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onAnalyze(image)}
          >
            Analyze Image
          </Button>
        ) : (
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Confidence:</span>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  (image.confidence || 0) > 0.8 
                    ? 'bg-green-500' 
                    : (image.confidence || 0) > 0.6 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500'
                }`}
                style={{ width: `${(image.confidence || 0) * 100}%` }}
              ></div>
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">
              {Math.round((image.confidence || 0) * 100)}%
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ImageCard;