import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layout/MainLayout';
import Header from '../components/shared/Header';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const HabitDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  // This would typically fetch habit details by ID
  // For now, we'll show a placeholder

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <Header
          title="Habit Details"
          subtitle="Track your habit progress"
          action={
            <Button variant="secondary" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          }
        />

        <Card className="p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Habit Analytics Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Detailed habit tracking and analytics will be available in the next update.
            </p>
            <Button onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default HabitDetails;