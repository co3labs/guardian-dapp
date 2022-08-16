import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getShortId, GlobalContext, networks } from '../context/GlobalState';
import logo from '../assets/logo.png';

export default function Header() {
  const { handleConnect, accountId, chainId, switchNetwork } = useContext(GlobalContext);

  const location = useLocation();

  return (
    <>
      <Link to="/" className="ml-4">
        <img src={logo} className="w-32 absolute z-30 top-2 left-2" />
      </Link>
      <header
        className={`w-full bg-white flex justify-end items-center shadow-md z-20 absolute transition-transform transform ${
          location.pathname === '/' ? '-translate-y-full' : ''
        }`}
      >
        <div className="text-xs grid grid-flow-col gap-4 mr-4 ">
          {accountId ? (
            <span className="border-x border-gray-300 p-3 bg-blue-800 text-white">{getShortId(accountId)}</span>
          ) : (
            <button className="border-x border-gray-300 p-3 bg-blue-800 text-white" onClick={handleConnect}>
              Connect Wallet
            </button>
          )}
          <button className="m-auto" onClick={switchNetwork}>
            {chainId === 2828 ? 'Lukso Testnet (L16)' : chainId ? 'Switch to Lukso Network' : 'Network'}
          </button>
        </div>
      </header>
    </>
  );
}
