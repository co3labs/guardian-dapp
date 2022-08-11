import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function ConnectWallet() {
  const { handleConnect } = useContext(GlobalContext);

  return (
    <div className="grid grid-flow-row h-full p-12">
      <p>Connect a Wallet</p>
      <button onClick={() => handleConnect()} className="btn w-min">
        Connect
      </button>
    </div>
  );
}
