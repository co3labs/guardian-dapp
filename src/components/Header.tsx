import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

export default function Header() {
  const { handleConnect, accountId, chainId } = useContext(GlobalContext);

  return (
    <header className="w-full flex justify-between items-center shadow-md absolute transition-transform transform -transate-y-full">
      <Link to="/" className="ml-4">Logo Here</Link>
      <div className="text-xs grid grid-flow-col gap-4 mr-4">
        <button className="border-x p-2" onClick={() => handleConnect()}>
          {accountId ? accountId : "Connect Wallet"}
        </button>
        <button className="m-auto">{chainId || "Network"}</button>
      </div>
    </header>
  );
}
