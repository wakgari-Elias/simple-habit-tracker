import React from 'react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const MainLayout = ({ children, onAddHabit }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar onAddHabit={onAddHabit} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;