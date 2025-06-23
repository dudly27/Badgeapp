import React from 'react';
import { Calendar, Users, Award, ExternalLink } from 'lucide-react';
import { Badge } from '../types';
import { RARITY_COLORS } from '../constants/lukso';

interface BadgeCardProps {
  badge: Badge;
  onAward?: () => void;
  showAwardButton?: boolean;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ badge, onAward, showAwardButton = false }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={badge.image}
          alt={badge.name}
          className="w-full h-48 object-cover"
        />
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${RARITY_COLORS[badge.rarity]}`}>
          {badge.rarity}
        </div>
        <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-black/20 text-white backdrop-blur-sm">
          {badge.category}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{badge.name}</h3>
            <p className="text-sm text-gray-600 font-mono">{badge.symbol}</p>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <Award className="h-4 w-4" />
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{badge.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Created {badge.createdAt}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            <span>{badge.recipients} recipients</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Criteria:</h4>
          <p className="text-sm text-gray-600 line-clamp-2">{badge.criteria}</p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            By {badge.creator.slice(0, 6)}...{badge.creator.slice(-4)}
          </div>
          
          {showAwardButton && onAward && (
            <button
              onClick={onAward}
              className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1.5 rounded-lg text-sm hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
            >
              <Award className="h-4 w-4" />
              <span>Award</span>
            </button>
          )}
          
          {badge.contractAddress && (
            <button className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 text-sm">
              <ExternalLink className="h-4 w-4" />
              <span>View Contract</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BadgeCard;