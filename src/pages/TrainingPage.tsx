import React from 'react';
import Navbar from '../components/common/Navbar';
import ModelTraining from '../components/training/ModelTraining';

const TrainingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="py-6 px-4 sm:px-6 lg:px-8">
        <ModelTraining />
      </main>
    </div>
  );
};

export default TrainingPage;