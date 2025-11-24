export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const calculateCompletionRate = (habits) => {
  if (!habits.length) return 0;
  const completed = habits.filter(habit => habit.completed).length;
  return Math.round((completed / habits.length) * 100);
};