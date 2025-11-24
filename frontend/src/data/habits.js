export const initialHabits = [
  {
    id: '1',
    title: 'Morning Meditation',
    description: '10 minutes of mindfulness meditation',
    category: 'wellness',
    frequency: 'daily',
    completed: true,
    streak: 15,
    createdAt: '2024-01-01',
    history: Array.from({ length: 15 }, (_, i) => ({
      date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      completed: true
    }))
  },
  {
    id: '2',
    title: 'Read 30 Minutes',
    description: 'Read non-fiction books for personal growth',
    category: 'learning',
    frequency: 'daily',
    completed: false,
    streak: 8,
    createdAt: '2024-01-05',
    history: Array.from({ length: 8 }, (_, i) => ({
      date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      completed: i > 0
    }))
  },
  {
    id: '3',
    title: 'Evening Workout',
    description: '45 minutes of strength training',
    category: 'fitness',
    frequency: 'daily',
    completed: false,
    streak: 12,
    createdAt: '2024-01-03',
    history: Array.from({ length: 12 }, (_, i) => ({
      date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      completed: i > 2
    }))
  }
];

export const categories = {
  wellness: { name: 'Wellness', color: 'bg-purple-500', icon: '🧘' },
  learning: { name: 'Learning', color: 'bg-blue-500', icon: '📚' },
  fitness: { name: 'Fitness', color: 'bg-green-500', icon: '💪' },
  productivity: { name: 'Productivity', color: 'bg-orange-500', icon: '⚡' },
  personal: { name: 'Personal', color: 'bg-pink-500', icon: '🌟' }
};