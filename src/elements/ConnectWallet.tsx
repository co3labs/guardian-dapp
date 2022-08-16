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
  const switchNetwork = async (event:React.MouseEvent<HTMLButtonElement>) => {
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
          setChainToAdd(String(2828));
        }
      }
    }
  };


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
              title="Network"
              tailwindColor="bg-gray-50"
              element={
                <button
                  className={`btnBig btnSecondary  ${!chainId ? 'cursor-not-allowed' : ''}`}
                  onClick={switchNetwork}
                >
                 {chainId === 2828 ? "Lukso Testnet (L16)" : 'Switch to Lukso Testnet (L16)'}
                </button>
              }
            />
            <div className="text-xs flex items-center absolute bottom-0 translate-y-full">
              <div className={`w-2 h-2 mr-2 rounded-full ${accountId && chainId === 2828 ? 'bg-green-400' : 'bg-red-500'}`} />
              {accountId && chainId === 2828 ? 'connected' : 'disconnected'}
            </div>
          </div>
        </div>
      </div>
      <BackOrContinueBtns back="/app/welcome" conditionNext={!!accountId && chainId === 2828} />
      {chainToAdd ? (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-50 bg-black bg-opacity-25 flex justify-center items-center">
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
