import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getShortId, GlobalContext, networks } from '../context/GlobalState';
import logo from '../assets/logo.png';

export default function Header() {
  const { handleConnect, walletAddress, chainId, switchNetwork } = useContext(GlobalContext);

  const location = useLocation();

  return (
    <>
      <header
        className={`w-full bg-white flex justify-between items-center shadow-md z-20 absolute transition-transform transform ${
          location.pathname === '/' ? '-translate-y-full' : ''
        }`}
      >
        <Link to="/" className="ml-4">
          <img src={logo} className="w-28 md:w-32" />
        </Link>
        <div className="text-xs grid grid-flow-col gap-4 mr-4 ">
          {walletAddress ? (
            <span className="border-x border-gray-300 p-3 bg-blue-800 text-white">{getShortId(walletAddress)}</span>
          ) : (
            <button className="border-x border-gray-300 p-3 bg-blue-800 text-white" onClick={handleConnect}>
              Connect Wallet
            </button>
          )}
          <button
            className={`m-auto  ${chainId === Number(process.env.REACT_APP_CHAIN_ID) ? 'hover:cursor-default' : ''}`}
            onClick={switchNetwork}
          >
            {chainId === Number(process.env.REACT_APP_CHAIN_ID)
              ? 'Lukso Testnet (L16)'
              : chainId
              ? 'Switch to Lukso Network'
              : 'Network'}
          </button>
        </div>
      </header>
    </>
  );
}
