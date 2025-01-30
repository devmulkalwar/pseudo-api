import React from 'react';

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-800 dark:text-white">
          My App
        </div>
        <div className="flex items-center">
          <button className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
          </button>
          <div className="ml-4">
            <img
              className="w-10 h-10 rounded-full"
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;