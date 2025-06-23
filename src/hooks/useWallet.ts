import { useState, useEffect, useCallback } from 'react';
import { BrowserProvider } from 'ethers';
import { WalletState, UniversalProfile } from '../types';
import { LUKSO_MAINNET } from '../constants/lukso';
import toast from 'react-hot-toast';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    account: null,
    profile: null,
    isLoading: false,
    error: null,
  });

  const checkConnection = useCallback(async () => {
    if (!window.ethereum) return;

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();
      
      if (accounts.length > 0) {
        const account = accounts[0].address;
        setWalletState(prev => ({
          ...prev,
          isConnected: true,
          account,
        }));
        
        // Load Universal Profile data
        await loadProfile(account);
      }
    } catch (error) {
      console.error('Error checking connection:', error);
    }
  }, []);

  const loadProfile = async (address: string) => {
    try {
      // This would typically fetch from LUKSO network
      // For demo purposes, we'll use mock data
      const mockProfile: UniversalProfile = {
        address,
        name: `Profile ${address.slice(0, 6)}...${address.slice(-4)}`,
        description: 'Universal Profile on LUKSO',
        profileImage: `https://api.dicebear.com/7.x/shapes/svg?seed=${address}`,
      };

      setWalletState(prev => ({
        ...prev,
        profile: mockProfile,
      }));
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('Please install a Web3 wallet like MetaMask or Universal Profile Browser Extension');
      return;
    }

    setWalletState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Switch to Lukso network
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${LUKSO_MAINNET.chainId.toString(16)}` }],
        });
      } catch (switchError: any) {
        // Add network if it doesn't exist
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${LUKSO_MAINNET.chainId.toString(16)}`,
                chainName: LUKSO_MAINNET.chainName,
                nativeCurrency: LUKSO_MAINNET.nativeCurrency,
                rpcUrls: LUKSO_MAINNET.rpcUrls,
                blockExplorerUrls: LUKSO_MAINNET.blockExplorerUrls,
                iconUrls: LUKSO_MAINNET.iconUrls,
              },
            ],
          });
        }
      }

      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();
      
      if (accounts.length > 0) {
        const account = accounts[0].address;
        setWalletState(prev => ({
          ...prev,
          isConnected: true,
          account,
          isLoading: false,
        }));
        
        await loadProfile(account);
        toast.success('Connected to LUKSO!');
      }
    } catch (error: any) {
      setWalletState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
      toast.error('Failed to connect wallet');
    }
  };

  const disconnectWallet = () => {
    setWalletState({
      isConnected: false,
      account: null,
      profile: null,
      isLoading: false,
      error: null,
    });
    toast.success('Wallet disconnected');
  };

  useEffect(() => {
    checkConnection();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          checkConnection();
        }
      });

      window.ethereum.on('chainChanged', () => {
        checkConnection();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, [checkConnection]);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
  };
};