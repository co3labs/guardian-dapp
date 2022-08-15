import { useEffect, useState } from 'react';
import { ChangeEvent, useContext } from 'react';
import { BsInfoCircle, BsShieldLock, BsXCircle } from 'react-icons/bs';
import OutsideClickHandler from 'react-outside-click-handler';
import { getShortId, GlobalContext, networks } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import ElementWithTitle from './ElementWithTitle';
import InfoParagraph from './InfoParagraph';

export default function ConnectWallet() {
  const { handleConnect, accountId, web3, chainId } = useContext(GlobalContext);
  const [chainToAdd, setChainToAdd] = useState('');
  const switchNetwork = async (event: ChangeEvent<HTMLSelectElement>) => {
    const newChainId = event.target.value;

    console.log(chainId, newChainId);

    if (String(chainId) !== newChainId) {
      try {
        //@ts-ignore
        await web3?.currentProvider?.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: web3.utils.toHex(newChainId) }],
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          setChainToAdd(newChainId);
        }
      }
    }
  };

  const options: [string, number][] = [
    ['Ethereum', 1],
    ['Polygon', 137],
    ['Rinkeby', 4],
    ['Energyweb', 246],
    ['Moonriver', 1285],
    ['Moonbeam', 1284],
  ];

  //persists selected option in network select matches current selected network
  useEffect(() => {
    console.log(chainId);
    if (chainId) {
      const selected = document.getElementById(`network_option_${networks[chainId].toLowerCase()}`);
      selected?.setAttribute('selected', 'true');
    }
  }, [chainId, chainToAdd]);

  return (
    <>
      <div className="m-6">
        <p className="font-light">In order to create your Safe, you need to connect a wallet</p>
        <InfoParagraph text="Your vault will be made on the network you are currently connected to." />
      </div>
      <div className="w-full py-10 bg-gray-50 flex flex-col justify-center items-center">
        <BsShieldLock size={200} color="gray" />
        <div className="mt-12 flex items-center">
          <div className="mr-4">
            {' '}
            <button
              onClick={() => (!accountId ? handleConnect() : () => null)}
              className="btn btnBig w-min btnPrimary "
            >
              {accountId ? getShortId(accountId) : 'Connect'}
            </button>
          </div>
          <div className="relative">
            <ElementWithTitle
              title="Switch Network"
              tailwindColor="bg-gray-50"
              element={
                <select
                  name={accountId && chainId ? networks[chainId] : 'Network'}
                  className={`btnBig btnSecondary  ${!chainId ? 'cursor-not-allowed' : ''}`}
                  onChange={switchNetwork}
                >
                  <option id="default_network_option" selected disabled hidden>
                    Network
                  </option>
                  {options.map((option) => (
                    <option
                      // selected={chainId === option[1] ? true : false}
                      id={'network_option_' + option[0].toLowerCase()}
                      value={option[1]}
                    >
                      {option[0]}
                    </option>
                  ))}
                </select>
              }
            />
            <div className="text-xs flex items-center absolute bottom-0 translate-y-full">
              <div className={`w-2 h-2 mr-2 rounded-full ${accountId ? 'bg-green-400' : 'bg-red-500'}`} />
              {accountId ? 'connected' : 'disconnected'}
            </div>
          </div>
        </div>
      </div>
      <BackOrContinueBtns back="/app/welcome" conditionNext={!!accountId} />
      {chainToAdd ? (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-40 bg-black bg-opacity-25 flex justify-center items-center">
          <OutsideClickHandler onOutsideClick={() => setChainToAdd('')}>
            <div className="border-2 border-gray-500 p-24 bg-gray-100 flex flex-col justify-center items-center">
              <BsXCircle className="text-red-500 text-5xl mb-4" />
              <span>This chain is not added to your wallet.</span>
              <span>Add this chain in your wallet before proceeding.</span>
            </div>
          </OutsideClickHandler>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
