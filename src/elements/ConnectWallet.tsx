import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinue';

export default function ConnectWallet() {
  const { handleConnect, accountId } = useContext(GlobalContext);

  return (
    <div className="grid grid-flow-row h-full p-12 gap-12">
      <p className="font-light">In order to create your Safe, you need to connect a wallet</p>
      <button onClick={() => handleConnect()} className="btn btnSmall w-min btnPrimary">
        Connect
      </button>
      <BackOrContinueBtns back='/app/welcome' conditionNext={!!accountId}/>
    </div>
  );
}
