import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import ListProcessIds from './ProcessIdList';
import RecoverIdInput from './RecoveryIdInput';
import StandardInput from './StandardInput';

export default function VoteWithId() {
  const { recoverInfo, selectedVault, recovery, walletAddress } = useContext(GlobalContext);

  return (
    <>
      <div className="w-full flex flex-row">
        <div className="w-1/2">
          <ListProcessIds />
        </div>
        <div className="w-1/2">
          <RecoverIdInput />
          <StandardInput
            id="new_owner"
            title="New Vault Owner"
            info="Propose a new owner for the vault. The new owner must be an existing guardian."
            elementTitle="New Owner"
            maxLength={180}
            paramName={'newOwner'}
            recover={true}
            placeholder="0x0"
            value={recoverInfo.newOwner}
            className="w-full"
          />{' '}
        </div>
      </div>
      <BackOrContinueBtns
        back="/app/manage"
        backText={'My Vaults'}
        exitBtn={true}
        conditionNext={!!(recoverInfo && selectedVault.current)}
        confirmText="Vote"
        onNextClick={() => {
          console.log(
            "Values passed to voteToRecover in order: \n",
            recoverInfo.recoveryProcessId,
            '<-- process id \n',
            recoverInfo.newOwner,
            '<-- new owner \n',
            selectedVault.current.vaultAddress,
            '<-- vaultAddress \n',
            selectedVault.current.ERC725Address,
            '<-- account \n',
            walletAddress,
            '<-- walletAddress \n',
          );
          if (walletAddress) {
            recovery?.voteToRecover(
              recoverInfo.recoveryProcessId,
              recoverInfo.newOwner,
              selectedVault.current.vaultAddress,
              selectedVault.current.ERC725Address,
              walletAddress
            );
          }
        }}
      />
    </>
  );
}
