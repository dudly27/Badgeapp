import React from 'react';
import { Home, Award, Plus, Gallery, Settings } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'create', label: 'Create Badge', icon: Plus },
    { id: 'my-badges', label: 'My Badges', icon: Award },
    { id: 'gallery', label: 'Gallery', icon: Gallery },
  ];

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-full">
      <div className="p-6">
        <nav className="space-y-2">
          {tabs.map(tab => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <IconComponent className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-purple-100">
          <h4 className="font-medium text-gray-900 mb-1">LSP 27 Standard</h4>
          <p className="text-xs text-gray-600">
            Creating achievement badges on LUKSO blockchain with standardized metadata
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;