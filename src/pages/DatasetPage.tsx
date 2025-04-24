import React, { useState } from 'react';
import { Search, Filter, Download, BarChart2 } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { datasets, images } from '../data/mockData';
import { Dataset } from '../types';

const DatasetPage: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<Dataset>(datasets[0]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const datasetImages = images.filter(image => {
    return image.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
           image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
  });
  
  const stats = {
    normal: datasetImages.filter(img => img.category === 'normal').length,
    pneumonia: datasetImages.filter(img => img.category === 'pneumonia').length,
    totalAnalyzed: datasetImages.filter(img => img.analyzed).length,
  };
  
  const normalPercentage = (stats.normal / datasetImages.length) * 100;
  const pneumoniaPercentage = (stats.pneumonia / datasetImages.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Datasets</h1>
            <p className="text-gray-600">Manage and explore pneumonia image datasets</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Available Datasets</h2>
                
                <div className="space-y-2">
                  {datasets.map(dataset => (
                    <button
                      key={dataset.id}
                      onClick={() => setSelectedDataset(dataset)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                        selectedDataset.id === dataset.id
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {dataset.name}
                    </button>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Dataset Actions</h3>
                  
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center w-full justify-start"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Dataset
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center w-full justify-start"
                    >
                      <BarChart2 className="h-4 w-4 mr-2" />
                      View Statistics
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="lg:col-span-3">
              <Card className="mb-6">
                <div>
                  <h2 className="text-xl font-medium text-gray-900">{selectedDataset.name}</h2>
                  <p className="mt-1 text-sm text-gray-500">{selectedDataset.description}</p>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-800">Total Images</h3>
                    <p className="mt-2 text-3xl font-bold text-blue-900">{datasetImages.length}</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-green-800">Normal Cases</h3>
                    <p className="mt-2 text-3xl font-bold text-green-900">{stats.normal}</p>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-red-800">Pneumonia Cases</h3>
                    <p className="mt-2 text-3xl font-bold text-red-900">{stats.pneumonia}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Distribution</h3>
                  <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="flex h-full">
                      <div 
                        className="bg-green-500" 
                        style={{ width: `${normalPercentage}%` }}
                      ></div>
                      <div 
                        className="bg-red-500" 
                        style={{ width: `${pneumoniaPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-2 flex text-xs text-gray-500 justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-sm mr-1"></div>
                      <span>Normal ({normalPercentage.toFixed(1)}%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-sm mr-1"></div>
                      <span>Pneumonia ({pneumoniaPercentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Dataset Images</h3>
                  
                  <div className="flex space-x-2">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search images"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Image
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Patient ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tags
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {datasetImages.slice(0, 5).map((image) => (
                        <tr key={image.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-10 w-10 rounded-md bg-gray-100 overflow-hidden">
                              <img
                                src={image.imageUrl}
                                alt={`Patient ${image.patientId}`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {image.patientId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {image.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              image.category === 'pneumonia'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {image.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex flex-wrap gap-1">
                              {image.tags.map((tag, index) => (
                                <span key={index} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {image.analyzed ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Analyzed
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Pending
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Showing 5 of {datasetImages.length} images
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DatasetPage;