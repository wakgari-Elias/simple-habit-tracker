import React from 'react';
import { formatDate } from '../../lib/formatDate';

const Header = ({ title, subtitle, action }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {subtitle === 'today' ? formatDate(new Date()) : subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="mt-4 sm:mt-0">
          {action}
        </div>
      )}
    </div>
  );
};

export default Header;