import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow mt-8">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h4 className="text-sm font-semibold mb-3">About PLP Task Manager</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A modern task management application built with React and Tailwind CSS.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">About</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Connect</h4>
            <div className="flex space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">GitHub</a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">LinkedIn</a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Twitter</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} PLP Task Manager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;