import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { globalStates, supportedChains } from '../@types/types';

export const GlobalContext = createContext({} as globalStates);

export const GlobalProvider = ({ children }: { children: PropsWithChildren<{}> }) => {
  // essential states for connection to web3, user wallet, ocean operations, and DataX configurations
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>();
  const [accountId, setAccountId] = useState<string>();
  const [chainId, setChainId] = useState<supportedChains>();
  const [provider, setProvider] = useState<Web3Modal>();
  const [web3, setWeb3] = useState<Web3>();
  const [unsupportedNet, setUnsupportedNet] = useState<boolean>(false);
  const [cookiesAllowed, setCookiesAllowed] = useState<boolean | null>(null);

  // intitialize web3modal to use to connect to provider
  useEffect(() => {
    async function init() {
      try {
        const web3Modal = new Web3Modal({
          cacheProvider: true,
          network: 'mainnet', // optional
          theme: {
            background: 'rgb(0, 0, 0, 1)',
            main: 'rgb(199, 199, 199)',
            secondary: 'rgb(136, 136, 136)',
            border: 'rgba(45, 45, 45, 1)',
            hover: 'rgba(58, 123, 191, .3)',
          },
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
      setAccountId(accounts[0])

      const _chainId = String(await web3.eth.getChainId());
      setChainId(_chainId as supportedChains);

      setListeners(provider, web3)

      console.info("Connected to account" + account + ", on chain" + _chainId)
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
      console.info("Account changed");
      
    });

    // Subscribe to chainId change
    provider.on('chainChanged', async (chainId: supportedChains) => {
      console.info("Chain changed")

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
      }}
    >
      <>{children}</>
    </GlobalContext.Provider>
  );
};
