import React, { useState } from 'react';
import { Search, Filter, Award } from 'lucide-react';
import { Badge } from '../types';
import { BADGE_CATEGORIES } from '../constants/lukso';
import BadgeCard from './BadgeCard';

interface BadgeGalleryProps {
  badges: Badge[];
  onAwardBadge?: (badgeId: string) => void;
  showAwardButton?: boolean;
  title?: string;
  emptyMessage?: string;
}

const BadgeGallery: React.FC<BadgeGalleryProps> = ({
  badges,
  onAwardBadge,
  showAwardButton = false,
  title = 'Badge Gallery',
  emptyMessage = 'No badges found'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRarity, setSelectedRarity] = useState('All');

  const filteredBadges = badges.filter(badge => {
    const matchesSearch = badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         badge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || badge.category === selectedCategory;
    const matchesRarity = selectedRarity === 'All' || badge.rarity === selectedRarity;
    
    return matchesSearch && matchesCategory && matchesRarity;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Award className="h-6 w-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {filteredBadges.length}
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search badges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none"
            >
              <option value="All">All Categories</option>
              {BADGE_CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
              <option value="All">All Rarities</option>
              <option value="Common">Common</option>
              <option value="Rare">Rare</option>
              <option value="Epic">Epic</option>
              <option value="Legendary">Legendary</option>
            </select>
          </div>
        </div>
      </div>

      {/* Badge Grid */}
      {filteredBadges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBadges.map(badge => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              showAwardButton={showAwardButton}
              onAward={onAwardBadge ? () => onAwardBadge(badge.id) : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Award className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{emptyMessage}</h3>
          <p className="text-gray-500">
            {searchTerm || selectedCategory !== 'All' || selectedRarity !== 'All'
              ? 'Try adjusting your search or filters'
              : 'Create your first badge to get started'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default BadgeGallery;