import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-2">
              <span className="text-white font-bold text-xs">H</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              HabitFlow
            </span>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 HabitFlow. Build better habits, one day at a time.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;