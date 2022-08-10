import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function Header() {
  const { handleConnect, accountId, chainId } = useContext(GlobalContext);

  return (
    <div className="w-full flex justify-between items-center shadow-md">
      <span className="ml-4">Logo Here</span>
      <div className="text-xs grid grid-flow-col gap-4 mr-4">
        <button className="border-x p-2" onClick={() => handleConnect()}>
          {accountId ? accountId : "Connect Wallet"}
        </button>
        <button className="m-auto">{chainId || "Network"}</button>
      </div>
    </div>
  );
}
