// import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="container">
    <nav className="bg-white shadow-md w-[1200px] text-3xl ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          {/* <div className="flex-shrink-0 flex items-center">
            <img
              className="h-8 w-auto"
              src="../src/assets/logo.png"
              alt="Logo"
            />
          </div> */}

          {/* Search Bar */}
          <div className="hidden md:flex items-center w-full max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FaSearch className="text-gray-400" />
              
              </div>
        
            </div>
          </div>

          {/* Mobile Search Icon */}
          <div className="flex items-center md:hidden">
            <button type="button" className="p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none">
              <FaSearch className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <FaSearch className="text-gray-40 cursor-pointer" />
          </div>
          
        </div>
      </div>
    </nav>
    </div>
  );
};

export default SearchBar;
