import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">H</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            HabitFlow
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Build better habits, one day at a time
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;