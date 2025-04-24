import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  
  const baseClasses = 'rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500';
  const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`${baseClasses} ${errorClasses} ${widthClass}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;