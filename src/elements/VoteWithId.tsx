import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useCheckAddVault, useCheckNewOwner, useCheckUserCanVote } from '../hooks/usePermissions';
import BackOrContinueBtns from './BackOrContinueBtns';
import CannotContinueError from './CannotContinueError';
import ListProcessIds from './ProcessIdList';
import RecoverIdInput from './RecoveryIdInput';
import StandardInput from './StandardInput';

export default function VoteWithId() {
  const { recoverInfo, selectedVault, recovery, walletAddress, addToGlobalSnackbarQue } = useContext(GlobalContext);

  const [userCanVote, canVoteMessage] = useCheckUserCanVote();
  const [isNotPrevOwner, prevOwnerMessage] = useCheckNewOwner();
  return (
    <>
      <div className="w-full flex flex-row">
        <div className="w-1/2">
          <ListProcessIds />
        </div>
        <div className="w-1/2 flex flex-col justify-between">
          <RecoverIdInput />
          <StandardInput
            id="new_owner"
            title="New Profile Owner"
            info="Vote for a new owner of the ERC725 contract. The new owner cannot be an existing owner."
            elementTitle="New Owner"
            maxLength={180}
            paramName={'newOwner'}
            recover={true}
            placeholder="0x0"
            value={recoverInfo.newOwner}
            className="w-full"
            error={prevOwnerMessage}
          />
          <div className="m-6">
            <CannotContinueError render={userCanVote} message={canVoteMessage} />
          </div>
        </div>
      </div>
      <BackOrContinueBtns
        back="/app/manage"
        backText={'My Vaults'}
        exitBtn={true}
        conditionNext={!!(recoverInfo.recoveryProcessId && userCanVote && isNotPrevOwner)}
        confirmText="Vote"
        onNextClick={() => {
          console.log(
            'Values passed to voteToRecover in order: \n',
            recoverInfo.recoveryProcessId,
            '<-- process id \n',
            recoverInfo.newOwner,
            '<-- new owner \n',
            selectedVault.current.vaultAddress,
            '<-- vaultAddress \n',
            selectedVault.current.ERC725Address,
            '<-- account \n',
            walletAddress,
            '<-- walletAddress \n'
          );
          if (walletAddress) {
            recovery
              ?.voteToRecover(
                recoverInfo.recoveryProcessId,
                recoverInfo.newOwner,
                selectedVault.current.vaultAddress,
                selectedVault.current.ERC725Address,
                walletAddress
              )
              .then(() => {
                addToGlobalSnackbarQue('Successfuly Voted');
              });
          }
        }}
      />
    </>
  );
}
