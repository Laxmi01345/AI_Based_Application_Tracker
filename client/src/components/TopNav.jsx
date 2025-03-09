// TopNav.js
import React from 'react';
import { Bell, LogOut } from 'lucide-react';

const TopNav = ({ user, logout, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <nav className="bg-white shadow-sm justify-end ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex flex-col items-end text-right h-16 p-4" > 
          <div className="md:hidden flex items-center ">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-medium">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <span className="text-sm text-gray-700">{user?.email || "No Email Found"}</span>
            </div>

            <button 
              onClick={logout}
              className="px-4 py-2 text-gray-600 hover:text-red-600 transition flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav