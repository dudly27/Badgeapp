import { useState, useCallback } from 'react';
import { Badge, BadgeCreationForm } from '../types';
import toast from 'react-hot-toast';

// Mock data for demonstration
const MOCK_BADGES: Badge[] = [
  {
    id: '1',
    name: 'Web3 Pioneer',
    description: 'Awarded to early adopters of Web3 technology',
    image: 'https://images.pexels.com/photos/6804595/pexels-photo-6804595.jpeg?auto=compress&cs=tinysrgb&w=400',
    symbol: 'W3P',
    creator: '0x1234...5678',
    createdAt: '2024-01-15',
    recipients: 125,
    criteria: 'Must have created at least 5 transactions on Lukso mainnet',
    category: 'Achievement',
    rarity: 'Rare',
  },
  {
    id: '2',
    name: 'Community Builder',
    description: 'Recognized for outstanding community contributions',
    image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400',
    symbol: 'CB',
    creator: '0x9876...5432',
    createdAt: '2024-01-10',
    recipients: 45,
    criteria: 'Active participation in community governance',
    category: 'Community',
    rarity: 'Epic',
  },
  {
    id: '3',
    name: 'NFT Creator',
    description: 'First NFT creation milestone',
    image: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400',
    symbol: 'NFTC',
    creator: '0x5555...7777',
    createdAt: '2024-01-20',
    recipients: 89,
    criteria: 'Successfully created and deployed first NFT collection',
    category: 'Skill',
    rarity: 'Common',
  },
];

export const useBadges = () => {
  const [badges, setBadges] = useState<Badge[]>(MOCK_BADGES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBadge = useCallback(async (formData: BadgeCreationForm, creatorAddress: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newBadge: Badge = {
        id: Date.now().toString(),
        ...formData,
        creator: creatorAddress,
        createdAt: new Date().toISOString().split('T')[0],
        recipients: 0,
      };

      setBadges(prev => [newBadge, ...prev]);
      toast.success('Badge created successfully!');
      
      return newBadge;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to create badge';
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const awardBadge = useCallback(async (badgeId: string, recipientAddress: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setBadges(prev => prev.map(badge => 
        badge.id === badgeId 
          ? { ...badge, recipients: badge.recipients + 1 }
          : badge
      ));

      toast.success('Badge awarded successfully!');
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to award badge';
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getBadgesByCreator = useCallback((creatorAddress: string) => {
    return badges.filter(badge => badge.creator.toLowerCase() === creatorAddress.toLowerCase());
  }, [badges]);

  return {
    badges,
    isLoading,
    error,
    createBadge,
    awardBadge,
    getBadgesByCreator,
  };
};