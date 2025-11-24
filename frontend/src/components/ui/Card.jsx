import React from 'react';

const Card = ({ 
  children, 
  className = '',
  hover = false,
  ...props 
}) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700
        shadow-sm transition-all duration-200
        ${hover ? 'hover:shadow-lg hover:scale-[1.02]' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;