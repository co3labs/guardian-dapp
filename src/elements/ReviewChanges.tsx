import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ITxState } from '../@types/types';
import { getInitialGuardiansAdded, GlobalContext, INITIAL_TX_STATE } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import ElementWithTitle from './ElementWithTitle';
import TxApprovalModal from './TxApprovalModal';

export default function ReviewChanges() {
  const { currentVaultEdits, updateAndGoHome, location, setTxState } = useContext(GlobalContext);
  const [showSecret, setShowSecret] = useState(false);
  const navigate = useNavigate();
  const fields: [string, string, boolean, string][] = [
    ['Vault Name', 'vaultName', false, '2xl'],
    ['Transaction Approval Threshold', 'threshold', false, '2xl'],
    ['ERC725 Address', 'ERC725Address', false, 'base'],
    ['Secret', 'newSecret', true, 'base'],
  ];

  //? show previous vault here ?
  return (
    <>
      <div className="m-6">
        <span className="w-max font-light">Does Everything Look Correct?</span>

        {currentVaultEdits ? (
          <div className="flex flex-col mt-6">
            <div className="grid grid-flow-row grid-cols-2 w-full border-x border-t rounded-sm">
              {fields.map((params: [string, string, boolean, string], index) => (
                <ElementWithTitle
                  title={params[0]}
                  passStates={params[2] ? { show: showSecret, setShow: setShowSecret } : undefined}
                  element={
                    <div
                      className={`flex flex-col rounded-sm border-b p-4 overflow-x-scroll no-scrollbar ${
                        index % 2 !== 0 ? 'border-l' : ''
                      }`}
                    >
                      <span className={'text-' + params[3]}>
                        {params[2] && !showSecret ? (
                          <span className="flex p-2">
                            {' '}
                            {Array((currentVaultEdits[params[1] as keyof typeof currentVaultEdits] as string).length)
                              .fill(<div className="w-1 h-1 mr-1 mt-1 rounded-full bg-black" />)
                              .map((div) => div)}
                          </span>
                        ) : (
                          (currentVaultEdits[params[1] as keyof typeof currentVaultEdits] as string)
                        )}
                      </span>
                    </div>
                  }
                />
              ))}
            </div>
            <div className="mt-6">
              <span className="text-xs text-gray-400">Guardian List {`(${currentVaultEdits.guardianCount})`}</span>
              <div className="w-full grid grid-flow-row ">
                {Object.entries(currentVaultEdits?.guardianList).map(([_, { name, address }], index) => (
                  <div className="my-4 border p-4 rounded-sm grid grid-flow-col text-left">
                    <span className="text-gray-300 mr-3">{index + 1}</span> <span>{name}</span> <span>{address}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>{/**TODO: Throw / show an error here */}</>
        )}
      </div>
      <BackOrContinueBtns
        confirmText="Confirm"
        onNextClick={() => {
          setTxState({
            ...INITIAL_TX_STATE,
            showModal: true,
            guardiansAdded: getInitialGuardiansAdded(currentVaultEdits.guardianList),
          });
        }}
      />
    </>
  );
}

// onNextClick={async () => {
//   try {
//     if(!accountId) throw new Error("No account id.")
//     const txReceipt = await recovery?.createRecoveryVault(currentVaultEdits.ERC725Address, accountId);
//     console.log(txReceipt)
//     addToGlobalSnackbarQue("You vault has been successfully created. You can proceed to adding guardians.")
//   } catch (error) {
//     console.error(error)
//     addToGlobalSnackbarQue("An error occured when attempting to create a vault. Please try again.")
//   }
// }}
