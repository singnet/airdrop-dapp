import { ethers } from 'ethers';
import isNil from 'lodash/isNil';
import { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY;
const INFURA_NETWORK_ID = process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_ID;
const INFURA_NETWORK_NAME = INFURA_NETWORK_ID === '1' ? 'mainnet' : 'ropsten';

let provider: ethers.providers.Web3Provider;

let web3Modal: any = null;

if (typeof window !== 'undefined') {
  const providerOptions = {
    injected: {
      package: null,
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: INFURA_KEY,
      },
    },
  };

  web3Modal = new Web3Modal({
    network: INFURA_NETWORK_NAME,
    cacheProvider: true,
    providerOptions,
  });
}

export const useWalletHook = () => {
  const [address, setWalletAddress] = useState<string>('');

  const subscribeProvider = async (provider: ethers.providers.Web3Provider) => {
    if (!provider.on) {
      return;
    }
    provider.on('accountsChanged', async (accounts) => {
      const [address] = accounts;
      setWalletAddress(address);
    });
    provider.on('chainChanged', async (chainId) => {
      const networkId = (await provider.detectNetwork()).chainId;
      console.log('chainChanged', chainId, networkId);
    });
    provider.on('networkChanged', async (networkId) => {
      console.log('networkChanged', networkId);
    });
  };

  const getAccount = async () => {
    if (isNil(web3Modal)) {
      return;
    }
    // const address = await provider.getSigner()?.getAddress();
    // console.log('getAccount', address);
  };

  const openWallet = async () => {
    try {
      const instance = await web3Modal.connect();
      provider = new ethers.providers.Web3Provider(instance);
      subscribeProvider(provider);
      return provider;
    } catch (error) {
      throw error;
    }
  };

  const initializeConnection = async () => {
    try {
      const connected = !isNil(web3Modal.cachedProvider);
      if (connected) {
        await openWallet();
      }
    } catch (error) {
      console.log('wallet connection error', error);
    }
  };

  const getLatestBlock = async () => {
    const block = await provider.getBlockNumber();
    return block;
  };

  const signMessage = async (message: string | ethers.utils.Bytes) => {
    const hash = await provider.getSigner().signMessage(message);
    return hash;
  };

  const disconnectWallet = () => {
    web3Modal.clearCachedProvider();
    setWalletAddress('');
  };

  const getWalletAddress = async () => {
    try {
      const [walletAddress] = await provider?.listAccounts();
      return walletAddress;
    } catch (error) {
      console.log('getWalletAddress error', error);
    }
  };

  return {
    getAccount,
    initializeConnection,
    openWallet,
    disconnectWallet,
    address,
    signMessage,
    getLatestBlock,
    getWalletAddress,
  };
};
