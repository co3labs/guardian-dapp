import { useContext } from 'react';
import { BsInfoCircle, BsShieldLock } from 'react-icons/bs';
import { getShortId, GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import InfoParagraph from './InfoParagraph';

export default function ConnectWallet() {
  const { handleConnect, accountId } = useContext(GlobalContext);

  return (
    <>
      <div className="m-6">
        <p className="font-light">In order to create your Safe, you need to connect a wallet</p>
        <InfoParagraph text="Your vault will be made on the network you are currently connected to." />
      </div>
      <div className="w-full py-10 bg-gray-50 flex flex-col justify-center items-center">
        <BsShieldLock size={200} color="gray" />
        <div>
          <button onClick={() => !accountId? handleConnect() : () => null} className="mt-12 btn btnBig w-min btnPrimary ">
            {accountId ? getShortId(accountId) : 'Connect'}
          </button>
          <div className="text-xs flex items-center">
            <div className={`w-2 h-2 mr-2 rounded-full ${accountId ? 'bg-green-400' : 'bg-red-500'}`} />
            {accountId ? 'connected' : 'disconnected'}
          </div>
        </div>
      </div>

      <BackOrContinueBtns back="/app/welcome" conditionNext={!!accountId} />
    </>
  );
}
