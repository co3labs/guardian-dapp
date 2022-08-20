import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import ListProcessIds from './ProcessIdList';
import RecoverIdInput from './RecoveryIdInput';
import StandardInput from './StandardInput';
import UpdateSecretFields from './UpdateSecretFields';

export default function RecoverOwnerShip() {
  const { recoverInfo, recovery, selectedVault, walletAddress, addToGlobalSnackbarQue, setAllVaults, allVaults } =
    useContext(GlobalContext);

  return (
    <>
      <div className="w-full flex">
        <div className="w-1/2">
          <ListProcessIds />
        </div>
        <div className="w-1/2">
          <RecoverIdInput />
          <UpdateSecretFields renderFields={{ old: true, secret: true, updateSecret: true }} />
        </div>
      </div>
      <BackOrContinueBtns
        back="/app/manage"
        backText={'My Vaults'}
        exitBtn={true}
        conditionNext={!!recoverInfo}
        confirmText="Recover Ownership"
        onNextClick={() => {
          console.log(
            'Values passed to recoverOwnership in order: \n',
            selectedVault.current.vaultAddress,
            '<-- vaultAddress \n',
            selectedVault.current.ERC725Address,
            '<-- account \n',
            recoverInfo.recoveryProcessId,
            '<-- process id \n',
            recoverInfo.oldSecret,
            '<-- old secret \n',
            recoverInfo.newSecret,
            '<-- new secret \n',
            walletAddress,
            '<-- walletAddress \n'
          );
          if (walletAddress)
            recovery
              ?.recoverOwnership(
                selectedVault.current.vaultAddress,
                selectedVault.current.ERC725Address,
                recoverInfo.recoveryProcessId,
                recoverInfo.oldSecret,
                recoverInfo.newSecret,
                walletAddress
              )
              .then(() => {
                addToGlobalSnackbarQue('vault recovered');
                setAllVaults({
                  ...allVaults,
                  [selectedVault.current.vaultAddress]: { ...selectedVault.current, vaultOwner: walletAddress },
                });
              });
        }}
      />{' '}
    </>
  );
}
