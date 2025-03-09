// Dashboard.js
import React, { useState } from 'react';
import Applications from './Applications';
import Calendar from './Calender';
import Stats from '../components/Stats';
import Documents from './Documents';
import TopNav from '../components/TopNav';
import Settings from './Setting';
import Messages from './Messages';
import Sidebar from '../components/Sidebar';
const Dashboard = ({ user, apiUrl = '/auth/logout' }) => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const logout = () => {
    window.open(apiUrl, "_self");
  };

  const renderContent = () => {
    switch(selectedTab) {
      case 'calendar':
        return <Calendar />;
      case 'applications':
        return <Applications />;
        case 'settings':
        return <Settings />;
      default:
        return (
          <>
            <Stats />
            <Applications />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      
      <div className="flex-1">
        <TopNav 
          user={user} 
          logout={logout}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3 transition-colors ${
                  selectedTab === item.id
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </button>
            ))}
          </div>
        )}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;