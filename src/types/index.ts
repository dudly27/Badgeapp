export interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  symbol: string;
  creator: string;
  createdAt: string;
  recipients: number;
  criteria: string;
  category: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  contractAddress?: string;
}

export interface UniversalProfile {
  address: string;
  name?: string;
  description?: string;
  profileImage?: string;
  backgroundImage?: string;
}

export interface WalletState {
  isConnected: boolean;
  account: string | null;
  profile: UniversalProfile | null;
  isLoading: boolean;
  error: string | null;
}

export interface BadgeCreationForm {
  name: string;
  description: string;
  image: string;
  symbol: string;
  criteria: string;
  category: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  maxSupply: number;
}