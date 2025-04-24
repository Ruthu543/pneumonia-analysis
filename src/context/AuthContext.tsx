import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthState, User } from '../types';
import { users } from '../data/mockData';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    // Check for stored user in localStorage when the component mounts
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } catch (error) {
        localStorage.removeItem('user');
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching email
      const user = users.find(u => u.email === email);
      
      // In a real app, we would check the password hash
      // For demo purposes, we just check if user exists
      if (user) {
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Invalid email or password'
        });
      }
    } catch (error) {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'An error occurred during login'
      });
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'User with this email already exists'
        }));
        return;
      }
      
      // Create new user
      const newUser: User = {
        id: `${users.length + 1}`,
        username,
        email,
        role: 'doctor' // Default role
      };
      
      // In a real app, we would save this to the database
      // For demo, we'll just store in localStorage
      setState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'An error occurred during registration'
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};