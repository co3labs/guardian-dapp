import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function Swap() {
  const { accountId, chainId, web3 } = useContext(GlobalContext);

  return (
    <div
      className={`absolute w-full max-w-[32rem] top-1/2 left-1/2 transition-transform transform duration-500 -translate-y-1/2`}
    ></div>
  );
}
