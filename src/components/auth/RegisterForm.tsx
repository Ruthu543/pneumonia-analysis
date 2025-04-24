import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const { register, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: {
      username?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!username) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      try {
        await register(username, email, password);
        navigate('/dashboard');
      } catch (err) {
        // Error is handled in the AuthContext
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
        <p className="mt-2 text-gray-600">Sign up to start analyzing pneumonia images</p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            type="text"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username}
            placeholder="Choose a username"
            fullWidth
            autoComplete="username"
          />
          
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="Enter your email"
            fullWidth
            autoComplete="email"
          />
          
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="Create a password"
            fullWidth
            autoComplete="new-password"
          />
          
          <Input
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            placeholder="Confirm your password"
            fullWidth
            autoComplete="new-password"
          />
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          Already have an account?{' '}
          <a 
            href="/login" 
            className="font-medium text-blue-600 hover:text-blue-500"
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
          >
            Sign in
          </a>
        </p>
      </div>
      
      <div className="mt-6 text-xs text-gray-500">
        <p>
          By creating an account, you agree to our{' '}
          <a href="#" className="text-blue-600 hover:text-blue-500">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-600 hover:text-blue-500">
            Privacy Policy
          </a>
        </p>
      </div>
    </Card>
  );
};

export default RegisterForm;