import { ChangeEvent, useContext } from 'react';
import { BsInfoCircle, BsShieldLock } from 'react-icons/bs';
import { getShortId, GlobalContext, networks } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import ElementWithTitle from './ElementWithTitle';
import InfoParagraph from './InfoParagraph';

export default function ConnectWallet() {
  const { handleConnect, accountId, web3, chainId } = useContext(GlobalContext);

  const switchNetwork = async (event: ChangeEvent<HTMLSelectElement>) => {
    const network = event.target.value;

    console.log(chainId, network);

    if (String(chainId) !== network) {
      try {
        //@ts-ignore
        await web3?.currentProvider?.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: web3.utils.toHex(network) }],
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          alert('add this chain id');
        }
      }
    }
  };

  const options = [
    ['Ethereum', 1],
    ['Polygon', 137],
    ['Rinkeby', 4],
    ['Energyweb', 246],
    ['Moonriver', 1285],
  ];

  return (
    <>
      <div className="m-6">
        <p className="font-light">In order to create your Safe, you need to connect a wallet</p>
        <InfoParagraph text="Your vault will be made on the network you are currently connected to." />
      </div>
      <div className="w-full py-10 bg-gray-50 flex flex-col justify-center items-center">
        <BsShieldLock size={200} color="gray" />
        <div className="mt-12 flex items-center">
          <div className="mr-4 relative">
            {' '}
            <button
              onClick={() => (!accountId ? handleConnect() : () => null)}
              className="btn btnBig w-min btnPrimary "
            >
              {accountId ? getShortId(accountId) : 'Connect'}
            </button>
            <div className="text-xs flex items-center absolute bottom-0 translate-y-full">
              <div className={`w-2 h-2 mr-2 rounded-full ${accountId ? 'bg-green-400' : 'bg-red-500'}`} />
              {accountId ? 'connected' : 'disconnected'}
            </div>
          </div>
          <ElementWithTitle
            title="Switch Network"
            tailwindColor="bg-gray-50"
            element={
              <select
                name={accountId && chainId ? networks[chainId] : 'Network'}
                className={`btnBig btnSecondary  ${!chainId ? 'cursor-not-allowed' : ''}`}
                onChange={switchNetwork}
              >
                {options.map((option) => (
                  <option value={option[1]}>{option[0]}</option>
                ))}
              </select>
            }
          />
        </div>
      </div>

      <BackOrContinueBtns back="/app/welcome" conditionNext={!!accountId} />
    </>
  );
}
