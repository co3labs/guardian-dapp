import { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getShortId, GlobalContext, networks } from '../context/GlobalState';
import logo from '../assets/logo.png';

export default function Header() {
  const { handleConnect, walletAddress, chainId, switchNetwork } = useContext(GlobalContext);

  const location = useLocation();

  useEffect(()=>{
    console.log(chainId, process.env.REACT_APP_CHAIN_ID)
  }, [chainId])

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
            className={`m-auto  ${Number(chainId) === Number(process.env.REACT_APP_CHAIN_ID) ? 'hover:cursor-default' : ''}`}
            onClick={switchNetwork}
          >
            {Number(chainId) === Number(process.env.REACT_APP_CHAIN_ID) ? (
              'Lukso Testnet (L16)'
            ) : chainId ? (
              <p>
                Switch to Lukso <span className='ml-1 hidden md:block'>Network</span>{' '}
              </p>
            ) : (
              'Network'
            )}
          </button>
        </div>
      </header>
    </>
  );
}
