import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AnalysisPage from './pages/AnalysisPage';
import TrainingPage from './pages/TrainingPage';
import DatasetPage from './pages/DatasetPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/analysis" 
            element={
              <ProtectedRoute>
                <AnalysisPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/training" 
            element={
              <ProtectedRoute>
                <TrainingPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/datasets" 
            element={
              <ProtectedRoute>
                <DatasetPage />
              </ProtectedRoute>
            } 
          />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;