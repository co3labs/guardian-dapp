import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { globalStates, IUserVaults, IVaultInfo, supportedChains } from '../@types/types';
import { Location, NavigateFunction } from 'react-router-dom';

export const INITIAL_VAULT_STATE: IVaultInfo = {
  vaultName: '',
  threshold: 1,
  ERC725Address: '',
  guardianCount: 1,
  vaultAddress: '',
  timestampId: 0,
  lastUpdated: 0,
  guardianList: { 0: { name: '', address: '' } },
};

export const networks = {
  2828: 'Lukso Testnet (L16)',
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
  const [allVaults, setAllVaults] = useState<IUserVaults>();
  const [currentVaultEdits, setCurrentVaultEdits] = useState<IVaultInfo>(INITIAL_VAULT_STATE);
  const [currentStep, setCurrentStep] = useState(0);
  const [globalSnackbarQue, setGlobalSnackbarQue] = useState<string[]>([]);
  const [location, setLocation] = useState<Location | null>(null);

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

      const _chainId = await web3.eth.getChainId();
      setChainId(_chainId);

      console.log(_chainId);

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
      console.log(parseInt(String(chainId)));
      setChainId(parseInt(String(chainId)));
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
    if (!allVaults) {
      const storage = localStorage.getItem('user_vaults');
      console.log('Storage found:', storage);
      if (storage) setAllVaults(JSON.parse(storage));
    }
  }, []);

  const switchNetwork = async () => {
    if (chainId !== 2828) {
      try {
        //@ts-ignore
        await web3?.currentProvider?.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: web3.utils.toHex(2828) }],
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          alert('Lukso Testnet (L16) needs to be added in your wallet.');
          // setChainToAdd(String(2828));
        }
      }
    }
  };
  useEffect(() => {
    if (chainId !== 2828) {
      switchNetwork();
    }
  }, [chainId]);

  useEffect(() => {
    if (allVaults) localStorage.setItem('user_vaults', JSON.stringify(allVaults));
  }, [allVaults]);

  const resetVaultAndSteps = () => {
    setCurrentStep(0);
    setCurrentVaultEdits({ ...INITIAL_VAULT_STATE, timestampId: Date.now() });
  };

  const updateAndGoHome = (navigate: NavigateFunction, location: Location) => {
    setAllVaults({
      ...allVaults,
      [currentVaultEdits.timestampId]: { ...currentVaultEdits, lastUpdated: Date.now() },
    });

    setGlobalSnackbarQue([
      ...globalSnackbarQue,
      `Vault succesfully ${location.pathname.includes('manage') ? 'updated' : ' created'}`,
    ]);

    navigate('/app/welcome', { replace: true });
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
        globalSnackbarQue,
        setGlobalSnackbarQue,
        location,
        setLocation,
        updateAndGoHome
      }}
    >
      <>{children}</>
    </GlobalContext.Provider>
  );
};
