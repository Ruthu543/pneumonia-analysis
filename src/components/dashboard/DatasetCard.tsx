import React from 'react';
import { Database, FileArchive } from 'lucide-react';
import Card from '../common/Card';
import { Dataset } from '../../types';
import Button from '../common/Button';

interface DatasetCardProps {
  dataset: Dataset;
  onSelect: (dataset: Dataset) => void;
}

const DatasetCard: React.FC<DatasetCardProps> = ({ dataset, onSelect }) => {
  return (
    <Card className="h-full flex flex-col" hoverable>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
            <Database className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="ml-3 text-lg font-medium text-gray-900">{dataset.name}</h3>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mb-4">{dataset.description}</p>
      
      <div className="mt-auto">
        <div className="mb-4 grid grid-cols-2 gap-4 text-sm text-gray-500">
          <div>
            <span className="font-medium">Images:</span> {dataset.imageCount.toLocaleString()}
          </div>
          <div>
            <span className="font-medium">Updated:</span> {dataset.lastUpdated}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <FileArchive className="h-4 w-4 mr-1" />
            <span>{dataset.source}</span>
          </div>
          
          <Button
            variant="primary"
            size="sm"
            onClick={() => onSelect(dataset)}
          >
            View Dataset
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DatasetCard;