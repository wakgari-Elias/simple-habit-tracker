import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export const useDarkMode = () => {
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return [isDark, toggleTheme];
};