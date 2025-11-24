import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Header from '../components/shared/Header';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { habitAPI } from '../lib/api';
import { categories, initialHabits } from '../data/habits';
import { formatDate, getDaysInStreak } from '../lib/formatDate';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHabit, setNewHabit] = useState({
    title: '',
    description: '',
    category: 'wellness',
    frequency: 'daily'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadHabits();
  }, [isAuthenticated, navigate]);

  const loadHabits = async () => {
    setLoading(true);
    try {
      const savedHabits = await habitAPI.getHabits();
      if (savedHabits) {
        setHabits(savedHabits);
      } else {
        // Initialize with dummy data
        setHabits(initialHabits);
        await habitAPI.saveHabits(initialHabits);
      }
    } catch (error) {
      console.error('Error loading habits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (!newHabit.title.trim()) return;

    try {
      const habit = await habitAPI.addHabit(newHabit);
      setHabits(prev => [...prev, habit]);
      setNewHabit({ title: '', description: '', category: 'wellness', frequency: 'daily' });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  const handleToggleHabit = async (habitId) => {
    try {
      const updatedHabits = habits.map(habit => {
        if (habit.id === habitId) {
          const today = new Date().toISOString().split('T')[0];
          const isCompleted = !habit.completed;
          const history = [...(habit.history || [])];
          
          // Add today's entry or update existing
          const todayIndex = history.findIndex(entry => entry.date === today);
          if (todayIndex >= 0) {
            history[todayIndex].completed = isCompleted;
          } else {
            history.unshift({ date: today, completed: isCompleted });
          }

          return {
            ...habit,
            completed: isCompleted,
            streak: getDaysInStreak(history),
            history
          };
        }
        return habit;
      });

      setHabits(updatedHabits);
      await habitAPI.saveHabits(updatedHabits);
    } catch (error) {
      console.error('Error toggling habit:', error);
    }
  };

  const handleDeleteHabit = async (habitId) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      try {
        const updatedHabits = habits.filter(habit => habit.id !== habitId);
        setHabits(updatedHabits);
        await habitAPI.saveHabits(updatedHabits);
      } catch (error) {
        console.error('Error deleting habit:', error);
      }
    }
  };

  const completedHabits = habits.filter(habit => habit.completed).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits ? Math.round((completedHabits / totalHabits) * 100) : 0;
  const longestStreak = habits.reduce((max, habit) => Math.max(max, habit.streak), 0);

  if (!isAuthenticated) return null;

  return (
    <MainLayout onAddHabit={() => setIsModalOpen(true)}>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Header
          title="Today's Habits"
          subtitle="today"
          action={
            <Button onClick={() => setIsModalOpen(true)}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Habit
            </Button>
          }
        />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{completionRate}%</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedHabits}/{totalHabits}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">📊</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Longest Streak</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{longestStreak} days</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">🔥</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Habits</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalHabits}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">🔄</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Habits Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">Loading habits...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {habits.map((habit) => (
              <Card key={habit.id} className="p-4 sm:p-6 hover:shadow-lg transition-all duration-200" hover>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3 flex-1">
                    <button
                      onClick={() => handleToggleHabit(habit.id)}
                      className={`w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center flex-shrink-0 ${
                        habit.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                      }`}
                    >
                      {habit.completed && (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <div className="min-w-0 flex-1">
                      <h3 className={`font-semibold transition-all duration-200 truncate ${
                        habit.completed
                          ? 'text-gray-500 dark:text-gray-500 line-through'
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {habit.title}
                      </h3>
                      {habit.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
                          {habit.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDeleteHabit(habit.id)}
                    className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0 ml-2"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    categories[habit.category]?.color || 'bg-gray-100'
                  } text-white`}>
                    {categories[habit.category]?.icon} {categories[habit.category]?.name}
                  </span>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>🔥 {habit.streak}</span>
                    <span>•</span>
                    <span className="capitalize">{habit.frequency}</span>
                  </div>
                </div>
              </Card>
            ))}

            {habits.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No habits yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Start building better habits today.
                </p>
                <Button onClick={() => setIsModalOpen(true)}>
                  Create Your First Habit
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Habit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Habit"
      >
        <form onSubmit={handleAddHabit} className="space-y-6">
          <Input
            label="Habit Title"
            placeholder="e.g., Morning Meditation"
            value={newHabit.title}
            onChange={(e) => setNewHabit({ ...newHabit, title: e.target.value })}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={newHabit.description}
              onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Brief description of your habit..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={newHabit.category}
                onChange={(e) => setNewHabit({ ...newHabit, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                {Object.entries(categories).map(([key, category]) => (
                  <option key={key} value={key}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Frequency
              </label>
              <select
                value={newHabit.frequency}
                onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              Create Habit
            </Button>
          </div>
        </form>
      </Modal>
    </MainLayout>
  );
};

export default Dashboard;