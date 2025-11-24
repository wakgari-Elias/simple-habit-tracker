export const formatDate = (dateString, options = {}) => {
  const date = new Date(dateString);
  const defaultOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return date.toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

export const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const isToday = (dateString) => {
  const today = new Date();
  const date = new Date(dateString);
  return date.toDateString() === today.toDateString();
};

export const getDaysInStreak = (history) => {
  if (!history || history.length === 0) return 0;
  
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < history.length; i++) {
    const historyDate = new Date(history[i].date);
    historyDate.setHours(0, 0, 0, 0);
    
    const diffTime = today - historyDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === i && history[i].completed) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};