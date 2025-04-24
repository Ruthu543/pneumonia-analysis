import React, { useState, useRef } from 'react';
import { UploadCloud, X } from 'lucide-react';
import Button from '../common/Button';

interface ImageUploadProps {
  onUpload: (file: File) => void;
  onClose: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    if (files?.[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Upload X-ray Image</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div
          className={`relative border-2 border-dashed rounded-lg p-6 ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {preview ? (
            <div className="space-y-4">
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 mx-auto"
              />
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreview(null);
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer"
                >
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Drop your X-ray image here, or{' '}
                    <span className="text-blue-600 hover:text-blue-500">browse</span>
                  </span>
                  <input
                    ref={inputRef}
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </label>
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!selectedFile}
            onClick={handleUpload}
          >
            Upload and Analyze
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;