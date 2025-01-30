import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-white font-semibold text-xl">Logo</span>
        </div>
        <nav className="flex-1 px-4 py-6">
          <Link
            to="/"
            className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            Home
          </Link>
          <Link
            to="/explore"
            className="block px-4 py-2 mt-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            Explore
          </Link>
          <Link
            to="/create-api"
            className="block px-4 py-2 mt-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            Create API
          </Link>
          <Link
            to="/profile"
            className="block px-4 py-2 mt-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            Profile
          </Link>
          <button className="block w-full px-4 py-2 mt-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            Logout
          </button>
          <button className="block w-full px-4 py-2 mt-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            Sign in with Google
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;