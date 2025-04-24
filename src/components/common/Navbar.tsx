import React, { useState } from 'react';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowUserMenu(false);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">PneumoVision</span>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <a href="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium text-gray-900">
                Dashboard
              </a>
              <a href="/datasets" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                Datasets
              </a>
              <a href="/analysis" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                Analysis
              </a>
              <a href="/training" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                Training
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <div className="ml-4 flex items-center md:ml-6 relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center max-w-xs bg-gray-100 p-2 rounded-full focus:outline-none"
                >
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="ml-2 text-sm font-medium text-gray-700">{user?.username}</span>
                  <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 top-10 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 text-xs text-gray-500">
                      Signed in as <span className="font-medium">{user?.email}</span>
                    </div>
                    <div className="border-t border-gray-100"></div>
                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                    <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <div className="border-t border-gray-100"></div>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  Log in
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a href="/" className="block pl-3 pr-4 py-2 border-l-4 border-blue-500 text-base font-medium text-blue-700 bg-blue-50">
              Dashboard
            </a>
            <a href="/datasets" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
              Datasets
            </a>
            <a href="/analysis" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
              Analysis
            </a>
            <a href="/training" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
              Training
            </a>
          </div>
          {isAuthenticated ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <User className="h-10 w-10 rounded-full bg-gray-100 p-2" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.username}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <a href="/profile" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                  Profile
                </a>
                <a href="/settings" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                  Settings
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center justify-center gap-4 px-4">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    navigate('/login');
                    setIsOpen(false);
                  }}
                >
                  Log in
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    navigate('/register');
                    setIsOpen(false);
                  }}
                >
                  Sign up
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;