import React, { useState } from 'react';
import { LineChart, BarChart, CheckCircle, Clock, Disc, Database } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

interface TrainingStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}

const ModelTraining: React.FC = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [trainingMetrics, setTrainingMetrics] = useState<{
    accuracy: number;
    loss: number;
    epoch: number;
  } | null>(null);
  
  const steps: TrainingStep[] = [
    {
      id: 'data-preparation',
      name: 'Data Preparation',
      description: 'Loading and preprocessing training data',
      status: currentStep >= 1 ? 'completed' : currentStep === 0 && isTraining ? 'in-progress' : 'pending'
    },
    {
      id: 'model-setup',
      name: 'Model Configuration',
      description: 'Setting up neural network architecture',
      status: currentStep >= 2 ? 'completed' : currentStep === 1 ? 'in-progress' : 'pending'
    },
    {
      id: 'training',
      name: 'Model Training',
      description: 'Training model on pneumonia dataset',
      status: currentStep >= 3 ? 'completed' : currentStep === 2 ? 'in-progress' : 'pending'
    },
    {
      id: 'evaluation',
      name: 'Performance Evaluation',
      description: 'Evaluating model on test data',
      status: currentStep >= 4 ? 'completed' : currentStep === 3 ? 'in-progress' : 'pending'
    },
    {
      id: 'deployment',
      name: 'Model Deployment',
      description: 'Deploying model for predictions',
      status: currentStep >= 5 ? 'completed' : currentStep === 4 ? 'in-progress' : 'pending'
    }
  ];
  
  const startTraining = () => {
    setIsTraining(true);
    setCurrentStep(0);
    setProgress(0);
    setTrainingMetrics(null);
    
    // Simulate the training process
    const intervalId = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervalId);
          return 100;
        }
        return prev + 1;
      });
      
      // Update training metrics
      if (currentStep === 2) {
        setTrainingMetrics(prev => {
          const epoch = prev ? prev.epoch + 1 : 1;
          const baseAccuracy = 0.5;
          const maxAccuracyGain = 0.48;
          const accuracy = baseAccuracy + maxAccuracyGain * (1 - Math.exp(-epoch / 10));
          
          const baseLoss = 0.7;
          const minLoss = 0.1;
          const loss = baseLoss * Math.exp(-epoch / 15) + minLoss;
          
          return { epoch, accuracy, loss };
        });
      }
    }, 100);
    
    // Simulate step changes
    const totalTime = 30000; // 30 seconds for the entire process
    const stepTime = totalTime / steps.length;
    
    let stepCounter = 0;
    const stepIntervalId = setInterval(() => {
      stepCounter++;
      
      if (stepCounter < steps.length) {
        setCurrentStep(stepCounter);
      } else {
        clearInterval(stepIntervalId);
        setIsTraining(false);
      }
    }, stepTime);
  };

  const getStepIcon = (step: TrainingStep) => {
    switch (step.status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'in-progress':
        return <Disc className="h-6 w-6 text-blue-500 animate-pulse" />;
      case 'pending':
      default:
        return <Clock className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Model Training</h2>
        <p className="text-gray-600">Train a custom pneumonia detection model using deep learning</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Training Parameters</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model Architecture
                </label>
                <select 
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={isTraining}
                >
                  <option>DenseNet121</option>
                  <option>ResNet50</option>
                  <option>EfficientNetB0</option>
                  <option>MobileNetV2</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Optimizer
                </label>
                <select 
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={isTraining}
                >
                  <option>Adam</option>
                  <option>SGD</option>
                  <option>RMSprop</option>
                  <option>AdamW</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Learning Rate
                </label>
                <select 
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={isTraining}
                >
                  <option>0.001</option>
                  <option>0.0001</option>
                  <option>0.01</option>
                  <option>0.0005</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Batch Size
                </label>
                <select 
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={isTraining}
                >
                  <option>32</option>
                  <option>16</option>
                  <option>64</option>
                  <option>128</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Epochs
                </label>
                <select 
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={isTraining}
                >
                  <option>20</option>
                  <option>10</option>
                  <option>30</option>
                  <option>50</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Augmentation
                </label>
                <select 
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={isTraining}
                >
                  <option>Enabled</option>
                  <option>Disabled</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button
                variant={isTraining ? 'outline' : 'primary'}
                size="lg"
                onClick={isTraining ? () => {} : startTraining}
                disabled={isTraining}
              >
                {isTraining ? 'Training in Progress...' : 'Start Training'}
              </Button>
            </div>
          </Card>
          
          {isTraining || trainingMetrics ? (
            <Card>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Training Metrics</h3>
              
              {trainingMetrics ? (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">Training Accuracy</span>
                      <span className="text-sm font-bold text-gray-900">
                        {(trainingMetrics.accuracy * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full bg-green-500"
                        style={{ width: `${trainingMetrics.accuracy * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">Training Loss</span>
                      <span className="text-sm font-bold text-gray-900">
                        {trainingMetrics.loss.toFixed(4)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full bg-blue-500"
                        style={{ width: `${(1 - trainingMetrics.loss) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Current Epoch</span>
                      <span className="text-sm font-bold text-gray-900">{trainingMetrics.epoch} / 20</span>
                    </div>
                  </div>
                  
                  <div className="h-40 w-full bg-gray-50 rounded-md flex items-center justify-center">
                    <div className="flex items-center text-gray-500">
                      <LineChart className="h-5 w-5 mr-2" />
                      Training progress visualization would appear here
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-6">
                  <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                  <p className="text-gray-600">Initializing training...</p>
                </div>
              )}
            </Card>
          ) : (
            <Card>
              <div className="flex items-center justify-center py-6">
                <div className="text-center">
                  <BarChart className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h4 className="text-lg font-medium text-gray-700 mb-1">No Training Data</h4>
                  <p className="text-gray-500 mb-4">Start a training job to see metrics and progress.</p>
                </div>
              </div>
            </Card>
          )}
        </div>
        
        <div>
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Training Progress</h3>
            
            {isTraining || currentStep > 0 ? (
              <div className="space-y-4">
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                    <span className="text-sm font-bold text-gray-900">{progress}%</span>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div 
                      style={{ width: `${progress}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {getStepIcon(step)}
                      </div>
                      <div className="ml-4">
                        <h4 className="text-base font-medium text-gray-900">{step.name}</h4>
                        <p className="text-sm text-gray-500">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center py-6">
                <Database className="h-12 w-12 text-gray-400 mb-3" />
                <p className="text-gray-600 text-center">
                  Training process will be displayed here once started.
                </p>
              </div>
            )}
          </Card>
          
          <div className="mt-6">
            <Card padding="sm">
              <div className="p-1 bg-blue-50 border border-blue-100 rounded-md mb-3">
                <div className="flex p-3">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Training Information</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        The training process uses transfer learning to fine-tune a pre-trained model for pneumonia detection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                <p>
                  This is a demo of a pneumonia detection model training interface. In a real application, the training would be performed on a GPU server with actual medical imaging data.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelTraining;