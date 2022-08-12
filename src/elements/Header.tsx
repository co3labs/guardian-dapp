import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlobalContext, networks } from '../context/GlobalState';
import logo from '../assets/logo.png';

export default function Header() {
  const { handleConnect, accountId, chainId } = useContext(GlobalContext);

  const location = useLocation();
  const getShortId = () => {
    if(!accountId) return
    const split = accountId.split('');
    split.splice(5, 33, "...")
    return split.join('')
  }
  return (
    <header
      className={`w-full flex justify-between items-center shadow-md z-20 absolute transition-transform transform ${
        location.pathname === '/' ? '-translate-y-full' : ''
      }`}
    >
      <Link to="/" className="ml-4">
        <img src={logo} className="w-32" />
      </Link>
      <div className="text-xs grid grid-flow-col gap-4 mr-4 ">
        {accountId ? (
          <span className="border-x border-gray-300 p-3 bg-blue-800 text-white">
            {getShortId()}
          </span>
        ) : (
          <button className="border-x border-gray-300 p-3 bg-blue-800 text-white" onClick={() => handleConnect()}>
            Connect Wallet
          </button>
        )}
        <button className="m-auto">{chainId ? networks[chainId] :'Network'}</button>
      </div>
    </header>
  );
}
