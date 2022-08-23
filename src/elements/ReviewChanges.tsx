import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IGuardianList, ITxState, IVaultInfo } from '../@types/types';
import { cantAddVaults, GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import ElementWithTitle from './ElementWithTitle';
import { useGuardians, usePermissions, useSecret, useThreshold, useVault } from '../hooks';
import Confetti from './Confetti';
import {useCheckAddVault} from '../hooks/usePermissions';
import CannotContinueError from './CannotContinueError';

export default function ReviewChanges() {
  const {
    currentVaultEdits,
    walletAddress,
    location,
    setTxState,
    txState,
    setAllVaults,
    allVaults,
    selectedVault,
    addToGlobalSnackbarQue,
    setShowConfetti,
    showConfetti,
  } = useContext(GlobalContext);
  const [showSecret, setShowSecret] = useState(false);
  const fields: [string, string, boolean, string][] = [
    ['Recovery Vault Name', 'vaultName', false, '2xl'],
    ['Transaction Approval Threshold', 'threshold', false, '2xl'],
    ['ERC725 Address', 'ERC725Address', false, 'base'],
    ['Secret', 'newSecret', true, 'base'],
  ];

  const navigate = useNavigate();
  const [canAddVault] = useCheckAddVault();

  console.log(Object.values(txState).filter((value) => !!value).length > 1);

  const { updateGuardians } = useGuardians();
  const { addPermissions, checkPermissions } = usePermissions();
  const { setSecret } = useSecret();
  const { setThreshold } = useThreshold();
  const { deployVault } = useVault();

  async function executeTransactions(newTxState: ITxState) {
    if (!walletAddress) throw new Error('No wallet address connected');

    const {
      'Add Guardians': addGuardians,
      'Add Permissions': callAddPermissions,
      'Deploy Recovery Vault': callDeployVault,
      'Remove Guardians': removeGuardians,
      'Set Secret': callSetSecret,
      'Set Threshold': callSetThreshold,
    } = newTxState;

    let vaultAddress;
    const { ERC725Address, guardianCount, guardianList, threshold, vaultName, timestampId } = currentVaultEdits;

    try {
      if (callDeployVault) {
        const [newVault] = await deployVault(ERC725Address, walletAddress);
        vaultAddress = newVault;
      } else {
        vaultAddress = currentVaultEdits.vaultAddress;
      }

      if (callAddPermissions) await addPermissions(walletAddress, vaultAddress, ERC725Address);

      const isPermitted = await checkPermissions(vaultAddress, ERC725Address);

      // if (isPermitted) {
      if (callSetSecret) await setSecret(vaultAddress, ERC725Address, walletAddress);

      if (addGuardians.length > 0)
        await updateGuardians(addGuardians, 'add', vaultAddress, ERC725Address, walletAddress);

      if (callSetThreshold) await setThreshold(vaultAddress, ERC725Address, walletAddress);

      if (removeGuardians.length > 0)
        await updateGuardians(removeGuardians, 'remove', vaultAddress, ERC725Address, walletAddress);
      // }

      const now = Date.now();

      const finalGuardianList: IGuardianList = {};
      Object.values(guardianList).forEach((guardian) => {
        if (guardian.action !== 'remove') {
          finalGuardianList[guardian.address] = { address: guardian.address, name: guardian.name };
        }
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
      setShowConfetti(true);
      addToGlobalSnackbarQue('Recovery Vault Succesfully Created!');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {showConfetti ? <Confetti /> : <></>}
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
            <div className="w-full flex justify-end">
              <CannotContinueError render={canAddVault} message={cantAddVaults}/>
            </div>
          </div>
        ) : (
          <>{/**TODO: Throw / show an error here */}</>
        )}
      </div>
      <BackOrContinueBtns
        confirmText={'Confirm'}
        exitBtn={true}
        conditionNext={canAddVault}
        onNextClick={async () => {
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
            if (!walletAddress) throw new Error('No account id.');
            const newTxState = {
              showModal: true,
              'Deploy Recovery Vault': callDeployVault,
              'Add Permissions': callAddPermissions,
              'Set Secret': callSetSecret,
              'Add Guardians': addGuardianList,
              'Set Threshold': callSetThreshold,
              'Remove Guardians': removeGuardianList,
            };

            setTxState(newTxState);
            await executeTransactions(newTxState);
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
              alert('Recovery Vault has been updated.');
            }
          }
        }}
      />
    </>
  );
}

// onNextClick={async () => {

// }}
