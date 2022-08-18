import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ITxState, IVaultDeployReceipt, IVaultInfo, IVaultInfoEdits } from '../@types/types';
import { getInitialGuardiansAdded, GlobalContext, INITIAL_TX_STATE, vaultCreatedTopic } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import ElementWithTitle from './ElementWithTitle';
import TxApprovalModal from './TxApprovalModal';
import { useGuardians, usePermissions, useSecret, useThreshold, useVault } from '../hooks';

export default function ReviewChanges() {
  const { currentVaultEdits, walletAddress, setTxState, setAllVaults, allVaults } = useContext(GlobalContext);
  const [showSecret, setShowSecret] = useState(false);
  const fields: [string, string, boolean, string][] = [
    ['Vault Name', 'vaultName', false, '2xl'],
    ['Transaction Approval Threshold', 'threshold', false, '2xl'],
    ['ERC725 Address', 'ERC725Address', false, 'base'],
    ['Secret', 'newSecret', true, 'base'],
  ];

  const { updateGuardians } = useGuardians();
  const { addPermissions, checkPermissions } = usePermissions();
  const { setSecret } = useSecret();
  const { setThreshold } = useThreshold();
  const { deployVault } = useVault();

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
        onNextClick={async () => {
          setTxState({
            showModal: true,
            'Deploy Vault': true,
            'Add Permissions': true,
            'Set Secret': true,
            'Set Threshold': true,
            'Add Guardians': currentVaultEdits.guardianCount,
          });

          try {
            if (!walletAddress) throw new Error('No account id.');

            const account = currentVaultEdits.ERC725Address;

            const [newVaultAddress] = await deployVault(account, walletAddress);
            await addPermissions(walletAddress, newVaultAddress, account);
            const isPermitted = await checkPermissions(newVaultAddress, account);

            // if (isPermitted) {
            setSecret(newVaultAddress, account, walletAddress);
            setThreshold(newVaultAddress, account, walletAddress);
            updateGuardians(newVaultAddress, account, walletAddress)
            // }

            const timestampId = Date.now();
            const newVaultInfo: IVaultInfoEdits = { ...currentVaultEdits, vaultAddress: newVaultAddress, timestampId };
            setAllVaults({ ...allVaults, [timestampId]: newVaultInfo });
          } catch (error) {
            console.error(error);
            // addToGlobalSnackbarQue('An error occured when attempting to create a vault. Please try again.');
          }
        }}
      />
    </>
  );
}

// onNextClick={async () => {

// }}
