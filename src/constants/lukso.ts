// Lukso Mainnet Configuration
export const LUKSO_MAINNET = {
  chainId: 42,
  chainName: 'LUKSO Mainnet',
  nativeCurrency: {
    name: 'LYX',
    symbol: 'LYX',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.lukso.network'],
  blockExplorerUrls: ['https://explorer.execution.mainnet.lukso.network'],
  iconUrls: ['https://docs.lukso.tech/img/lukso-logo.png'],
};

export const UNIVERSAL_PROFILE_INTERFACE_ID = '0x3e89ad98';
export const LSP0_TYPE_IDS = {
  LSP3Profile: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
  LSP27Achievement: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
};

export const BADGE_CATEGORIES = [
  'Achievement',
  'Certification',
  'Participation',
  'Skill',
  'Community',
  'Event',
  'Game',
  'Education',
];

export const RARITY_COLORS = {
  Common: 'from-gray-400 to-gray-600',
  Rare: 'from-blue-400 to-blue-600',
  Epic: 'from-purple-400 to-purple-600',
  Legendary: 'from-yellow-400 to-orange-500',
};