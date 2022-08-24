import { useContext, useEffect, useState } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { GlobalContext, INITIAL_TX_STATE } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import CannotContinueError from './CannotContinueError';
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
    setRecovering,
    setTxState,
  } = useContext(GlobalContext);

  const [canRecover, setCanRecover] = useState<[boolean, string]>([false, '']);
  const [loading, setLoading] = useState<boolean>(false);
  const [userCanRecover, recoverMessage] = canRecover;

  async function canRecoverProfile() {
    try {
      setLoading(true);
      if (walletAddress) {
        const userCanRecover = await recovery?.canRecover(
          selectedVault.current.vaultAddress,
          recoverInfo.recoveryProcessId,
          walletAddress
        );

        if (userCanRecover) {
          setCanRecover([true, '']);
        } else {
          setCanRecover([false, 'There are not enough votes for this wallet address to recover ownership.']);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
          <div className='ml-6 my-6'>
            <CannotContinueError render={userCanRecover} message={recoverMessage} />
          </div>
        </div>
      </div>
      <BackOrContinueBtns
        back="/app/manage"
        backText={<BsChevronLeft />}
        exitBtn={true}
        confirmLoading={loading}
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
          if (walletAddress) {
            setRecovering('loading');
            setTxState({
              ...INITIAL_TX_STATE,
              showModal: true,
              'Recover Ownership': true,
            });
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
                setRecovering('success');
                addToGlobalSnackbarQue('Profile Successfully Recovered!');
                setAllVaults({
                  ...allVaults,
                  [selectedVault.current.vaultAddress]: { ...selectedVault.current, vaultOwner: walletAddress },
                });
              })
              .catch(() => {
                setRecovering('failed');
              });
          }
        }}
      />{' '}
    </>
  );
}
