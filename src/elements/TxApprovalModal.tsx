import { useContext, useEffect, useState } from 'react';
import { BsCheckCircleFill, BsX } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { ITxProgress} from '../@types/types';
import { GlobalContext } from '../context/GlobalState';
import Confetti from './Confetti';
import InfoParagraph from './InfoParagraph';

export default function TxApprovalModal() {
  const {
    txState,
    setTxState,
    secretUpdating,
    thresholdUpdating,
    permissionsUpdating,
    vaultDeploying,
    addGuardiansLoading,
    removeGuardiansLoading,
    showConfetti
  } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [txs, setTxs] = useState<[string, any][]>([]);

  async function indexTransactions() {
    let txList: [string, any][] = [];
    Object.entries(txState).forEach(([key, value], index) => {
      const addTx = () => txList.push([key, value]);

      if (['Add Guardians', 'Remove Guardians'].includes(key)) {
        if (value.length > 0) {
          addTx();
        }
      } else if (value && index !== 0) {
        addTx();
      }
    });
    setTxs(txList);
  }

  useEffect(() => {
    indexTransactions();
  }, []);

  return (
    <>
      {showConfetti ? <Confetti /> : <></>}

      <div className="absolute top-0 right-0 left-0 bottom-0 bg-black z-20 bg-opacity-25">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100 flex flex-col p-6 rounded-sm border border-blue-800 shadow-lg">
          <div className="w-full flex justify-end">
            <button
              onClick={() => {
                setTxState({ ...txState, showModal: false });
                navigate('/app/welcome');
              }}
            >
              <BsX />
            </button>
          </div>
          {txs.length > 0 ? (
            <>
              Sign these transactions in your wallet.
              <InfoParagraph
                tailwindMaxW="max-w-sm"
                text={`You will need to sign a transaction for each 
            item in this list. Each guardian will be a seperate
            transaction`}
              />
              <>
                {txs.map(([title, value], index) => {
                  let state: ITxProgress;

                  switch (title) {
                    case 'Deploy Recovery Vault':
                      state = vaultDeploying;
                      break;
                    case 'Add Guardians':
                      state = addGuardiansLoading;
                      break;
                    case 'Set Secret':
                      state = secretUpdating;
                      break;
                    case 'Set Threshold':
                      state = thresholdUpdating;
                      break;
                    case 'Remove Guardians':
                      state = removeGuardiansLoading;
                      break;
                    default:
                      state = permissionsUpdating;
                      break;
                  }

                  return (
                    <div
                      className={`p-2 my-2 border ${
                        state === 'loading'
                          ? 'border-blue-800 bg-blue-800 bg-opacity-10'
                          : 'border-gray-200 text-gray-400'
                      }`}
                    >
                      <p className="flex items-center">
                        {state === 'loading' ? (
                          <MoonLoader size={16} />
                        ) : state === 'success' ? (
                          <BsCheckCircleFill className="text-green-500" />
                        ) : state === 'failed' ? (
                          <BsX className="text-red-500" />
                        ) : (
                          index + 1 + '.'
                        )}
                        <span className="ml-3">{title}</span>
                        <span className="mx-1">
                          {title === 'Add Guardians' || title === 'Remove Guardians' ? `(x${value.length})` : ''}
                        </span>
                        {state === 'failed' ? (
                          <span className="italic text-xs text-gray-400 ml-3">An error occured</span>
                        ) : (
                          <></>
                        )}
                      </p>
                    </div>
                  );
                })}
              </>
            </>
          ) : (
            <div>No changes have been made!</div>
          )}
        </div>
      </div>
    </>
  );
}
