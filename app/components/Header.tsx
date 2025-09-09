import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between mx-4 sm:mx-10 px-6 py-3 mt-5 rounded-2xl 
      bg-white/40 dark:bg-gray-800/50 backdrop-blur-md shadow-lg border border-white/20 dark:border-gray-700/30 
      transition-colors">
      
      {/* Logo */}
      <h1 className="text-2xl font-extrabold tracking-tight cursor-pointer select-none">
        <span className="text-blue-600 dark:text-blue-400">Up</span>
        <i className="text-gray-900 dark:text-gray-100">Vid</i>
      </h1>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium 
          hover:bg-blue-700 dark:hover:bg-blue-500 transition shadow-md">
          Post a Video
        </button>
      </div>
    </header>
  );
};

export default Header;
