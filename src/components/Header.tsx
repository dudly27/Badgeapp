import React from 'react';
import { Wallet, User, LogOut, Award } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

const Header: React.FC = () => {
  const { isConnected, account, profile, isLoading, connectWallet, disconnectWallet } = useWallet();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Badge Creator
              </h1>
              <p className="text-xs text-gray-500">LSP 27 Standard</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isConnected ? (
              <button
                onClick={connectWallet}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Wallet className="h-4 w-4" />
                <span>{isLoading ? 'Connecting...' : 'Connect Wallet'}</span>
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-2">
                  {profile?.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {profile?.name || `${account?.slice(0, 6)}...${account?.slice(-4)}`}
                    </p>
                    <p className="text-xs text-gray-500">LUKSO Profile</p>
                  </div>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  title="Disconnect"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;