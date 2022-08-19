import { createContext, PropsWithChildren, useEffect, useRef, useState } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import {
  globalStates,
  IGuardianList,
  IRecoveryProcessInfo,
  ITxProgress,
  ITxState,
  IUserVaults,
  IVaultInfo,
  IVaultInfoEdits,
  supportedChains,
} from '../@types/types';
import { Location, NavigateFunction } from 'react-router-dom';
import { ERC725Utils, Recovery } from 'guardians.js';
export const blockExplorer = 'https://explorer.execution.l16.lukso.network/address/';
export const INITIAL_VAULT_STATE: IVaultInfoEdits = {
  vaultName: '',
  threshold: 1,
  ERC725Address: '',
  guardianCount: 1,
  vaultAddress: '',
  timestampId: 0,
  lastUpdated: 0,
  guardianList: { 0: { name: '', address: '' } },
  oldSecret: '',
  newSecret: '',
  vaultOwner: '',
};

export const INITIAL_RECOVERY_INFO: IRecoveryProcessInfo = {
  recoveryProcessId: '',
  newOwner: '',
};

export const INITIAL_TX_STATE: ITxState = {
  showModal: false,
  'Deploy Vault': false,
  'Add Permissions': false,
  'Set Secret': false,
  'Set Threshold': false,
  'Add Guardians': 0,
};

export const vaultCreatedTopic = '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0';

export const getInitialGuardiansAdded = (guardians: IGuardianList) => {
  const initialList: { [name: string]: boolean } = {};
  Object.entries(guardians).forEach(([id, guardian]) => {
    initialList[guardian.name] = false;
  });
  return initialList;
};

export const networks = {
  2828: 'Lukso Testnet (L16)',
};

export const getShortId = (id: string) => {
  const split = id.split('');
  split.splice(5, 33, '...');
  return split.join('');
};

export const GlobalContext = createContext({} as globalStates);

export const GlobalProvider = ({ children }: { children: PropsWithChildren<{}> }) => {
  // essential states for connection to web3, user wallet, ocean operations, and DataX configurations
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>();
  const [walletAddress, setWalletAddress] = useState<string>();
  const [chainId, setChainId] = useState<any>();
  const [provider, setProvider] = useState<Web3Modal>();
  const [web3, setWeb3] = useState<Web3>();
  const [unsupportedNet, setUnsupportedNet] = useState<boolean>(false);
  const [cookiesAllowed, setCookiesAllowed] = useState<boolean | null>(null);
  const [allVaults, setAllVaults] = useState<IUserVaults>();
  const [currentVaultEdits, setCurrentVaultEdits] = useState<IVaultInfoEdits>(INITIAL_VAULT_STATE);
  const [currentStep, setCurrentStep] = useState(0);
  const [globalSnackbarQue, setGlobalSnackbarQue] = useState<string[]>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [recovery, setRecovery] = useState<Recovery>();
  const [recoverInfo, setRecoverInfo] = useState<IRecoveryProcessInfo>(INITIAL_RECOVERY_INFO);
  const [erc725Utils, setErc725Utils] = useState<ERC725Utils>();

  const [txState, setTxState] = useState<ITxState>(INITIAL_TX_STATE);
  const [vaultDeploying, setVaultDeploying] = useState<ITxProgress>("");
  const [secretUpdating, setSecretUpdating] = useState<ITxProgress>("");
  const [thresholdUpdating, setThresholdUpdating] = useState<ITxProgress>("");
  const [permissionsUpdating, setPermissionsUpdating] = useState<ITxProgress>("");
  const [guardiansLoading, setGuardiangsLoading] = useState<ITxProgress>("");

  const currentVault = useRef<IVaultInfo>();
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
      setWalletAddress(accounts[0]);

      const _chainId = await web3.eth.getChainId();
      setChainId(_chainId);

      const _recovery = new Recovery(web3);
      setRecovery(_recovery);

      const _erc725Utils = new ERC725Utils(web3);
      setErc725Utils(_erc725Utils);

      setListeners(provider, web3);

      console.info('Connected to account' + account + ', on chain' + _chainId);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Sets listeners events on: walletAddress, chainId, provider connection, provider disconnection.
   *
   * @param provider
   * @param web3
   */

  function setListeners(provider: any, web3: Web3) {
    provider.on('accountsChanged', async (accounts: string[]) => {
      setWalletAddress(accounts[0]);
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
          addNetwork();
        }
      }
    }
  };

  const addNetwork = async () => {
    try {
      //@ts-ignore
      await web3?.currentProvider?.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0xB0C',
            chainName: 'L16',
            nativeCurrency: {
              name: 'LYXt',
              symbol: 'LYXt',
              decimals: 18,
            },
            rpcUrls: ['https://rpc.l16.lukso.network/'],
            blockExplorerUrls: ['https://explorer.consensus.l16.lukso.network/'],
          },
        ],
      });
    } catch (error: any) {
      if (error.code !== 4001)
        alert(
          'An error occured when adding the Lukso network to your wallet. Please add it in your wallet to continue.'
        );
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

  const resetVaultAndSteps = (vault?: IVaultInfoEdits) => {
    if (walletAddress) {
      setCurrentStep(1);
    } else {
      setCurrentStep(0);
    }

    if (vault) {
      currentVault.current = vault;
      setCurrentVaultEdits({ ...vault });
    } else {
      setCurrentVaultEdits({ ...INITIAL_VAULT_STATE });
    }
    setRecoverInfo({ ...INITIAL_RECOVERY_INFO });
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

  const addToGlobalSnackbarQue = (message: string) => {
    setGlobalSnackbarQue([...globalSnackbarQue, message]);
  };

  return (
    <GlobalContext.Provider
      value={{
        handleConnect,
        walletAddress,
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
        updateAndGoHome,
        switchNetwork,
        recovery,
        addToGlobalSnackbarQue,
        recoverInfo,
        setRecoverInfo,
        currentVault,
        erc725Utils,
        vaultDeploying,
        setVaultDeploying,
        secretUpdating,
        setSecretUpdating,
        thresholdUpdating,
        setThresholdUpdating,
        permissionsUpdating,
        setPermissionsUpdating,
        guardiansLoading,
        setGuardiangsLoading,
        txState,
        setTxState,
      }}
    >
      <>{children}</>
    </GlobalContext.Provider>
  );
};
