// Simulated API calls
export const habitAPI = {
  getHabits: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const habits = JSON.parse(localStorage.getItem('habits') || '[]');
    return habits.length ? habits : null;
  },

  saveHabits: async (habits) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.setItem('habits', JSON.stringify(habits));
    return { success: true };
  },

  addHabit: async (habit) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const habits = JSON.parse(localStorage.getItem('habits') || '[]');
    const newHabit = {
      ...habit,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      history: []
    };
    habits.push(newHabit);
    localStorage.setItem('habits', JSON.stringify(habits));
    return newHabit;
  }
};