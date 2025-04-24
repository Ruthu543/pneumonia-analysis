import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  bordered = true,
  hoverable = false,
}) => {
  const baseClasses = 'bg-white rounded-lg shadow';
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7',
  };
  
  const borderClass = bordered ? 'border border-gray-200' : '';
  const hoverClass = hoverable ? 'transition-shadow hover:shadow-md' : '';
  
  const cardClasses = `${baseClasses} ${paddingClasses[padding]} ${borderClass} ${hoverClass} ${className}`;
  
  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
};

export default Card;