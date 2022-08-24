import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import Confetti from './Confetti';
import ListProcessIds from './ProcessIdList';
import RecoverIdInput from './RecoveryIdInput';
import UpdateSecretFields from './UpdateSecretFields';

export default function RecoverOwnerShip() {
  const {
    recoverInfo,
    recovery,
    selectedVault,
    walletAddress,
    addToGlobalSnackbarQue,
    setAllVaults,
    allVaults,
    setShowConfetti,
    showConfetti,
  } = useContext(GlobalContext);

  const [canRecover, setCanRecover] = useState<[boolean, string]>([false, '']);
  const [userCanRecover, recoverMessage] = canRecover;

  async function canRecoverProfile() {
    if (walletAddress) {
      const userCanRecover = await recovery?.canRecover(
        selectedVault.current.vaultAddress,
        recoverInfo.recoveryProcessId,
        walletAddress
      );

      if (userCanRecover) {
        setCanRecover([true, '']);
      } else {
        setCanRecover([false, 'There are not enough votes for this wallet address.']);
      }
    }
  }

  useEffect(() => {
    if (walletAddress && recoverInfo.recoveryProcessId) {
      canRecoverProfile();
    }
  }, [walletAddress, recoverInfo.recoveryProcessId]);

  return (
    <>
      {showConfetti ? <Confetti /> : <></>}
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
        conditionNext={
          !!(recoverInfo.recoveryProcessId && recoverInfo.newSecret && recoverInfo.oldSecret && userCanRecover)
        }
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
                setShowConfetti(true);
                addToGlobalSnackbarQue('Profile Successfully Recovered!');
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
