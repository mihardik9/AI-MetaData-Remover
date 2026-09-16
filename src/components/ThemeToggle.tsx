import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return document.documentElement.classList.contains('dark') || window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      type="button"
      id="theme-toggle-btn"
      onClick={() => setIsDark((prev) => !prev)}
      aria-label={isDark ? 'Switch to Day mode' : 'Switch to Night mode'}
      title={isDark ? 'Switch to Day mode' : 'Switch to Night mode'}
      className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all border border-neutral-200 dark:border-neutral-700 flex items-center gap-1.5 shadow-2xs text-xs font-semibold select-none cursor-pointer"
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4 text-amber-400" />
          <span className="hidden md:inline">Day</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-neutral-700 dark:text-neutral-200" />
          <span className="hidden md:inline">Night</span>
        </>
      )}
    </button>
  );
};
