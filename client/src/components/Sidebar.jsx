// Sidebar.js
import React from 'react';
import { Home, Briefcase, Calendar, MessageSquare, FileText, Settings } from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', icon: <Home className="w-5 h-5" />, id: 'dashboard' },
  { name: 'Applications', icon: <Briefcase className="w-5 h-5" />, id: 'applications' },
  { name: 'Calendar', icon: <Calendar className="w-5 h-5" />, id: 'calendar', badge: '3' },
  { name: 'Messages', icon: <MessageSquare className="w-5 h-5" />, id: 'messages', badge: '1' },
  { name: 'Documents', icon: <FileText className="w-5 h-5" />, id: 'documents' },
  { name: 'Settings', icon: <Settings className="w-5 h-5" />, id: 'settings' },
];

const Sidebar = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <Briefcase className="w-8 h-8 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">JobTrackr</span>
        </div>
      </div>
      <nav className="flex-1 px-4 py-4">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedTab(item.id)}
            className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
              selectedTab === item.id
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
            {item.badge && (
              <span className="ml-auto bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full text-xs">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};



export  default Sidebar;