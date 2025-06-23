import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useWallet } from './hooks/useWallet';
import { useBadges } from './hooks/useBadges';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CreateBadgeForm from './components/CreateBadgeForm';
import BadgeGallery from './components/BadgeGallery';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isConnected, account } = useWallet();
  const { badges, isLoading, createBadge, awardBadge, getBadgesByCreator } = useBadges();

  const handleCreateBadge = async (formData: any) => {
    if (!account) return;
    await createBadge(formData, account);
    setActiveTab('my-badges');
  };

  const handleAwardBadge = async (badgeId: string) => {
    // In a real app, you'd have a form to input recipient address
    const recipientAddress = prompt('Enter recipient address:');
    if (recipientAddress) {
      await awardBadge(badgeId, recipientAddress);
    }
  };

  const renderContent = () => {
    if (!isConnected) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
            <p className="text-gray-600 mb-6">
              Connect your Universal Profile or Web3 wallet to start creating and managing achievement badges on the LUKSO blockchain.
            </p>
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-purple-100">
              <p className="text-sm text-gray-700">
                <strong>LSP 27 Standard:</strong> This application uses the LSP 27 standard for creating standardized achievement badges with rich metadata support.
              </p>
            </div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard badges={badges} userAddress={account} />;
      case 'create':
        return <CreateBadgeForm onSubmit={handleCreateBadge} isLoading={isLoading} />;
      case 'my-badges':
        return (
          <BadgeGallery
            badges={getBadgesByCreator(account || '')}
            onAwardBadge={handleAwardBadge}
            showAwardButton={true}
            title="My Badges"
            emptyMessage="You haven't created any badges yet"
          />
        );
      case 'gallery':
        return (
          <BadgeGallery
            badges={badges}
            title="All Badges"
            emptyMessage="No badges available"
          />
        );
      default:
        return <Dashboard badges={badges} userAddress={account} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Header />
      
      <div className="flex">
        {isConnected && (
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        )}
        
        <main className={`flex-1 ${isConnected ? 'p-8' : ''}`}>
          {renderContent()}
        </main>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            style: {
              background: '#059669',
            },
          },
          error: {
            style: {
              background: '#DC2626',
            },
          },
        }}
      />
    </div>
  );
}

export default App;