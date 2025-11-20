import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Navigation</span>
            <div className="hidden md:flex space-x-2">
              <Button
                variant={currentPage === 'tasks' ? 'primary' : 'secondary'}
                onClick={() => setCurrentPage('tasks')}
                className="text-sm"
              >
                Tasks
              </Button>
              <Button
                variant={currentPage === 'posts' ? 'primary' : 'secondary'}
                onClick={() => setCurrentPage('posts')}
                className="text-sm"
              >
                Posts
              </Button>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? ' Light' : ' Dark'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;