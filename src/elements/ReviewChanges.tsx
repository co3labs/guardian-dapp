import { useContext, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  IGuardianInfo,
  IGuardianList,
  ITxState,
  IVaultDeployReceipt,
  IVaultInfo,
  IVaultInfoEdits,
} from '../@types/types';
import { getInitialGuardiansAdded, GlobalContext, INITIAL_TX_STATE, vaultCreatedTopic } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import ElementWithTitle from './ElementWithTitle';
import TxApprovalModal from './TxApprovalModal';
import { useGuardians, usePermissions, useSecret, useThreshold, useVault } from '../hooks';

export default function ReviewChanges() {
  const { currentVaultEdits, walletAddress, location, setTxState, txState, setAllVaults, allVaults, selectedVault } =
    useContext(GlobalContext);
  const [showSecret, setShowSecret] = useState(false);
  const fields: [string, string, boolean, string][] = [
    ['Vault Name', 'vaultName', false, '2xl'],
    ['Transaction Approval Threshold', 'threshold', false, '2xl'],
    ['ERC725 Address', 'ERC725Address', false, 'base'],
    ['Secret', 'newSecret', true, 'base'],
  ];

  const navigate = useNavigate();
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
            <div className="grid grid-flow-row grid-cols-2 gap-2 w-full">
              {fields.map((params: [string, string, boolean, string], index) => {
                if (index === 3 && !currentVaultEdits.newSecret) return <></>;
                return (
                  <ElementWithTitle
                    title={params[0]}
                    passStates={params[2] ? { show: showSecret, setShow: setShowSecret } : undefined}
                    element={
                      <div className={`flex flex-col rounded-sm border p-4 overflow-x-scroll no-scrollbar`}>
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
                );
              })}
            </div>
            <div className="mt-6">
              <span className="text-xs text-gray-400">Guardian List {`(${currentVaultEdits.guardianCount})`}</span>
              <div className="w-full grid grid-flow-row ">
                {Object.entries(currentVaultEdits?.guardianList).map(([_, { name, address, action }], index) => (
                  <ElementWithTitle
                    title={location?.pathname === '/app/create' ? '' : action || ''}
                    parentClasses="my-4"
                    titleClasses={`italic ${action === 'remove' ? 'text-red-500' : 'text-green-400'} capitalize`}
                    element={
                      <div className="border rounded-sm">
                        <div className="grid grid-flow-col p-4 text-left">
                          <span className="text-gray-300 mr-3">{index + 1}</span> <span>{name}</span>{' '}
                          <span>{address}</span>
                        </div>
                      </div>
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>{/**TODO: Throw / show an error here */}</>
        )}
      </div>
      <BackOrContinueBtns
        confirmText={'Confirm'}
        exitBtn={true}
        onNextClick={async () => {
          let vaultAddress;
          const callDeployVault = !!!selectedVault.current.vaultAddress;
          const callAddPermissions = location?.pathname === '/app/create'; //this should actually check permissions
          const callSetSecret = !!currentVaultEdits.newSecret;
          const callSetThreshold =
            location?.pathname === '/app/create' || selectedVault.current.threshold !== currentVaultEdits.threshold;

          let addGuardianList = [];
          let removeGuardianList = [];

          for (const guardian of Object.values(currentVaultEdits.guardianList)) {
            switch (guardian.action) {
              case 'remove':
                removeGuardianList.push(guardian.address);
                break;
              case 'add':
                addGuardianList.push(guardian.address);
                break;
              default:
                if (location?.pathname === '/app/create') addGuardianList.push(guardian.address);
                break;
            }
          }

          const transactionIsNeeded =
            callDeployVault ||
            callAddPermissions ||
            callSetSecret ||
            callSetThreshold ||
            addGuardianList.length ||
            removeGuardianList.length;

          if (transactionIsNeeded) {
            const account = currentVaultEdits.ERC725Address;
            if (!walletAddress) throw new Error('No account id.');
            setTxState({
              showModal: true,
              'Deploy Vault': callDeployVault,
              'Add Permissions': callAddPermissions,
              'Set Secret': callSetSecret,
              'Remove Guardians': removeGuardianList.length,
              'Add Guardians': addGuardianList.length,
              'Set Threshold': callSetThreshold,
            });
            try {
              if (callDeployVault) {
                const [newVault] = await deployVault(account, walletAddress);
                vaultAddress = newVault;
              } else {
                vaultAddress = currentVaultEdits.vaultAddress;
              }

              if (callAddPermissions) await addPermissions(walletAddress, vaultAddress, account);

              const isPermitted = await checkPermissions(vaultAddress, account);

              // if (isPermitted) {
              if (callSetSecret) await setSecret(vaultAddress, account, walletAddress);
              if (removeGuardianList.length > 0)
                await updateGuardians(removeGuardianList, 'remove', vaultAddress, account, walletAddress);
              if (addGuardianList.length > 0)
                await updateGuardians(addGuardianList, 'add', vaultAddress, account, walletAddress);
              if (callSetThreshold) await setThreshold(vaultAddress, account, walletAddress);
              // }

              const now = Date.now();
              const { ERC725Address, guardianCount, guardianList, threshold, vaultName, timestampId } =
                currentVaultEdits;

              const finalGuardianList: IGuardianList = {};
              Object.values(guardianList).forEach((guardian) => {
                finalGuardianList[guardian.address] = { address: guardian.address, name: guardian.name };
              });

              const newVaultInfo: IVaultInfo = {
                ERC725Address,
                guardianCount,
                guardianList: finalGuardianList,
                lastUpdated: now,
                threshold,
                vaultName,
                vaultOwner: walletAddress,
                vaultAddress: vaultAddress,
                timestampId: timestampId || now,
              };

              selectedVault.current = newVaultInfo;
              setAllVaults({ ...allVaults, [vaultAddress]: newVaultInfo });
            } catch (error) {
              console.error(error);
            }
          } else {
            const nameChanged = selectedVault.current.vaultName !== currentVaultEdits.vaultName;
            const guardiansNameChanged = Object.values(currentVaultEdits.guardianList).find(
              (guardian) => guardian.name !== selectedVault.current.guardianList[guardian.address].name
            );

            if (nameChanged || guardiansNameChanged) {
              const newGuardians: IGuardianList = {};
              Object.values(currentVaultEdits.guardianList).forEach((guardian) => {
                newGuardians[guardian.address] = { name: guardian.name, address: guardian.address };
              });

              setAllVaults({
                ...allVaults,
                [selectedVault.current.vaultAddress]: {
                  ...selectedVault.current,
                  vaultName: currentVaultEdits.vaultName,
                  guardianList: newGuardians,
                },
              });
              navigate('/app/manage');
              alert('Vault has been updated.');
            }
          }
        }}
      />
    </>
  );
}

// onNextClick={async () => {

// }}
