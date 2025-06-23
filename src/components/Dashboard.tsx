import React from 'react';
import { Award, Users, TrendingUp, Clock } from 'lucide-react';
import { Badge } from '../types';

interface DashboardProps {
  badges: Badge[];
  userAddress: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ badges, userAddress }) => {
  const userBadges = userAddress 
    ? badges.filter(badge => badge.creator.toLowerCase() === userAddress.toLowerCase())
    : [];

  const totalRecipients = userBadges.reduce((sum, badge) => sum + badge.recipients, 0);
  const recentBadges = userBadges
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const stats = [
    {
      label: 'Badges Created',
      value: userBadges.length,
      icon: Award,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      label: 'Total Recipients',
      value: totalRecipients,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Most Popular',
      value: userBadges.length > 0 ? Math.max(...userBadges.map(b => b.recipients)) : 0,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      label: 'This Month',
      value: userBadges.filter(badge => {
        const badgeDate = new Date(badge.createdAt);
        const currentDate = new Date();
        return badgeDate.getMonth() === currentDate.getMonth() && 
               badgeDate.getFullYear() === currentDate.getFullYear();
      }).length,
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Overview of your badge creation activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <IconComponent className={`h-6 w-6 ${stat.textColor}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Badges */}
      {recentBadges.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Badges</h3>
          <div className="space-y-4">
            {recentBadges.map(badge => (
              <div key={badge.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={badge.image}
                  alt={badge.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{badge.name}</h4>
                  <p className="text-sm text-gray-600">{badge.recipients} recipients</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{badge.createdAt}</p>
                  <p className="text-xs text-gray-400">{badge.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {userBadges.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to Badge Creator!</h3>
          <p className="text-gray-600 mb-6">
            Create your first LSP 27 achievement badge to get started. 
            Share achievements and recognize accomplishments in the Web3 space.
          </p>
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg text-sm">
              Ready to create your first badge?
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;