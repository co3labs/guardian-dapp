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
  // const [chainToAdd, setChainToAdd] = useState('');


  return (
    <>
      <div className="m-6">
        <p className="font-light">In order to create your Safe, you need to connect a wallet</p>
        <InfoParagraph text="Your vault will be made on the network you are currently connected to." />
      </div>
      <div className="w-full py-10 bg-gray-50 flex flex-col justify-center items-center">
        <BsShieldLock size={200} color="gray" />
        <div className="mt-12 flex items-center">
          <div>
            {' '}
            <button
              onClick={() => (!accountId ? handleConnect() : () => null)}
              className="btn btnBig w-min btnPrimary "
            >
              {accountId ? getShortId(accountId) : 'Connect'}
            </button>
          </div>
        </div>
      </div>
      <BackOrContinueBtns back="/app/welcome" confirmText='Continue' conditionNext={!!accountId && chainId === 2828} />
      
    </>
  );
}
// {chainToAdd ? (
//         <div className="absolute top-0 bottom-0 left-0 right-0 z-50 bg-black bg-opacity-25 flex justify-center items-center">
//           <OutsideClickHandler onOutsideClick={() => setChainToAdd('')}>
//             <div className="border-2 border-gray-500 p-24 bg-gray-100 flex flex-col justify-center items-center">
//               <BsXCircle className="text-red-500 text-5xl mb-4" />
//               <span>This chain is not added to your wallet.</span>
//               <span>Add this chain in your wallet before proceeding.</span>
//             </div>
//           </OutsideClickHandler>
//         </div>
//       ) : (
//         <></>
//       )}