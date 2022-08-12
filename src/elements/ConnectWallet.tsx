import { useContext } from 'react';
import { BsInfoCircle, BsShieldLock } from 'react-icons/bs';
import { GlobalContext } from '../context/GlobalState';
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
      <div className="w-full py-12 bg-gray-50 flex flex-col justify-center items-center">
        <BsShieldLock size={200} color="gray" />
        <button onClick={() => handleConnect()} className="btn btnBig w-min btnPrimary mt-12">
          Connect
        </button>
      </div>

      <BackOrContinueBtns back="/app/welcome" conditionNext={!!accountId} />
    </>
  );
}
