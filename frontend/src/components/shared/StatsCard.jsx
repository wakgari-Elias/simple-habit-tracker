import React from 'react';
import Card from '../ui/Card';
import { classNames } from '../../lib/utils';

const StatsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  color = 'blue',
  className = '' 
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <Card className={classNames('p-6', className)} hover>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              {subtitle}
            </p>
          )}
          {trend && (
            <div className={classNames(
              'inline-flex items-center text-sm font-medium mt-2',
              trend > 0 ? 'text-green-600' : 'text-red-600'
            )}>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d={trend > 0 ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
              {Math.abs(trend)}%
            </div>
          )}
        </div>
        
        {icon && (
          <div className={classNames(
            'p-3 rounded-xl bg-gradient-to-r text-white',
            colorClasses[color]
          )}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatsCard;