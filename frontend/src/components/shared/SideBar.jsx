import React from 'react';
import { classNames } from '../../lib/utils';

const Sidebar = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: 'today', label: 'Today', icon: '📅' },
    { id: 'habits', label: 'All Habits', icon: '🔄' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'goals', label: 'Goals', icon: '🎯' }
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Navigation
        </h2>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={classNames(
                'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                activeView === item.id
                  ? 'bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Quick Stats
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Current Streak</span>
              <span className="font-semibold text-gray-900 dark:text-white">12 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Habits</span>
              <span className="font-semibold text-gray-900 dark:text-white">8 total</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;