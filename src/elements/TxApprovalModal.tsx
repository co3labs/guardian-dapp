import { useContext } from 'react';
import { BsCheck, BsX } from 'react-icons/bs';
import { MoonLoader } from 'react-spinners';
import { ITxState } from '../@types/types';
import { GlobalContext } from '../context/GlobalState';

export default function TxApprovalModal() {
  const {
    txState,
    setTxState,
    secretUpdating,
    thresholdUpdating,
    permissionsUpdating,
    vaultDeploying,
    guardiansLoading,
  } = useContext(GlobalContext);

  const loadingAtIndex = [secretUpdating, thresholdUpdating, permissionsUpdating, vaultDeploying, guardiansLoading];

  if (txState) {
    return (
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-black z-20 bg-opacity-25">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100 flex flex-col p-6 rounded-sm border border-blue-800 shadow-lg">
          <div className="w-full flex justify-end">
            <button
              onClick={() => {
                setTxState({ ...txState, showModal: false });
              }}
            >
              <BsX />
            </button>
          </div>
          <p className="max-w-xs">
            You will need to sign a transaction for each item in this list. Each guardian will be a seperate
            transaction.
          </p>
          <>
            {Object.entries(txState).map(([title, value], index) => {
              let state: boolean;
              switch (title) {
                case 'Deploy Vault':
                  state = vaultDeploying;
                  break;
                case 'Add Guardians':
                  state = guardiansLoading;
                  break;
                case 'Set Secret':
                  state = secretUpdating;
                  break;
                case 'Set Threshold':
                  state = thresholdUpdating;
                  break;
                default:
                  state = permissionsUpdating;
                  break;
              }

              if (index === 0 || !value) return <></>;

              return (
                <div className={`p-2 my-2 border  ${state ? 'border-blue-800' : 'border-gray-200'}`}>
                  <p className="flex  items-center">
                    {state ? <MoonLoader size={16} /> : index + '.'}
                    <span className="ml-3">{title}</span>
                  </p>
                </div>
              );
            })}
          </>{' '}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
