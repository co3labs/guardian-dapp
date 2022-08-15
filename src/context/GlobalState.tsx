import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { globalStates, IVaultInfo, supportedChains } from '../@types/types';

export const INITIAL_VAULT_STATE: IVaultInfo = {
  vaultName: '',
  threshold: 1,
  address: '',
  guardianCount: 1,
  guardianList: { 0: { name: '', address: '' } },
};

export const networks = {
  1: 'Ethereum',
  56: 'Binance',
  137: 'Polygon',
  246: 'Energyweb',
  1285: 'Moonriver',
};

export const getShortId = (id: string) => {
  if (!id) return;
  const split = id.split('');
  split.splice(5, 33, '...');
  return split.join('');
};

export const GlobalContext = createContext({} as globalStates);

export const GlobalProvider = ({ children }: { children: PropsWithChildren<{}> }) => {
  // essential states for connection to web3, user wallet, ocean operations, and DataX configurations
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>();
  const [accountId, setAccountId] = useState<string>();
  const [chainId, setChainId] = useState<any>();
  const [provider, setProvider] = useState<Web3Modal>();
  const [web3, setWeb3] = useState<Web3>();
  const [unsupportedNet, setUnsupportedNet] = useState<boolean>(false);
  const [cookiesAllowed, setCookiesAllowed] = useState<boolean | null>(null);
  const [allVaults, setAllVaults] = useState<IVaultInfo[]>([]);
  const [currentVault, setCurrentVault] = useState({});
  const [currentVaultEdits, setCurrentVaultEdits] = useState<IVaultInfo>(INITIAL_VAULT_STATE);
  const [currentStep, setCurrentStep] = useState(0);

  // intitialize web3modal to use to connect to provider
  useEffect(() => {
    async function init() {
      try {
        const web3Modal = new Web3Modal({
          // disableInjectedProvider:true,
          cacheProvider: false,
          network: 'mainnet',
          providerOptions: {
            walletconnect: {
              package: WalletConnectProvider, // required
              options: {
                infuraId: process.env.REACT_APP_INFURA_ID, // required
                rpc: { 137: 'https://matic-mainnet.chainstacklabs.com' },
              },
            },
          }, // required
        });
        setWeb3Modal(web3Modal);
      } catch (error) {
        console.log(error);
      }
    }

    init();
  }, [web3, chainId]);

  /**
   *
   * Handles client side disclaimer approval.
   *
   * @param account
   * @param web3
   * @param localSignature
   * @returns
   * current localSignature value
   */

  /**
   * Handles connection to web3 and user wallet.
   */
  async function handleConnect() {
    try {
      const provider = await web3Modal?.connect();
      setProvider(provider);

      const web3 = new Web3(provider);
      setWeb3(web3);

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0] ? accounts[0].toLowerCase() : null;
      setAccountId(accounts[0]);

      const _chainId = String(await web3.eth.getChainId());
      setChainId(_chainId);

      setListeners(provider, web3);

      console.info('Connected to account' + account + ', on chain' + _chainId);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Sets listeners events on: accountId, chainId, provider connection, provider disconnection.
   *
   * @param provider
   * @param web3
   */

  function setListeners(provider: any, web3: Web3) {
    provider.on('accountsChanged', async (accounts: string[]) => {
      setAccountId(accounts[0]);
    });

    // Subscribe to chainId change
    provider.on('chainChanged', async (chainId: supportedChains) => {
      setChainId(parseInt(chainId));
    });

    // Subscribe to provider connection
    provider.on('connect', (info: { chainId: number }) => {
      console.info('Connect event fired');
      console.info(info);
    });

    // Subscribe to provider disconnection
    provider.on('disconnect', (error: { code: number; message: string }) => {
      console.error(error);
    });
  }

  useEffect(() => {
    if (!allVaults.length) {
      const storage = localStorage.getItem('user_vaults');
      console.log('Storage found:', storage);
      if (storage) setAllVaults(JSON.parse(storage));
    }
  }, []);

  useEffect(() => {
    if (allVaults.length > 1) localStorage.setItem('user_vaults', JSON.stringify(allVaults));
  }, [allVaults]);

  const resetVaultAndSteps = () => {
    setCurrentStep(accountId ? 1 : 0);
    setCurrentVaultEdits(INITIAL_VAULT_STATE);
  };
  return (
    <GlobalContext.Provider
      value={{
        handleConnect,
        accountId,
        chainId,
        provider,
        web3,
        unsupportedNet,
        cookiesAllowed,
        setCookiesAllowed,
        currentVaultEdits,
        setCurrentVaultEdits,
        currentStep,
        setCurrentStep,
        allVaults,
        setAllVaults,
        resetVaultAndSteps,
      }}
    >
      <>{children}</>
    </GlobalContext.Provider>
  );
};
