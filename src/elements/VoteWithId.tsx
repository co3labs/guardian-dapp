import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import RecoverIdInput from './RecoveryIdInput';
import StandardInput from './StandardInput';

export default function VoteWithId() {
  const { recoverInfo, currentVaultEdits, recovery, walletAddress } = useContext(GlobalContext);

  return (
    <>
      <div>
        {' '}
        <RecoverIdInput />
        <StandardInput
          id="new_owner"
          title="New Vault Owner"
          info="Propose a new owner for the vault. The new owner must be an existing guardian."
          elementTitle="New Owner"
          maxLength={42}
          paramName={'newOwner'}
          recover={true}
          placeholder="0x0"
          value={recoverInfo.newOwner}
          className="md:w-96"
        />{' '}
      </div>
      <BackOrContinueBtns
        back="/app/manage"
        backText={'My Vaults'}
        exitBtn={true}
        conditionNext={!!(recoverInfo && currentVaultEdits)}
        confirmText="Vote"
        onNextClick={() => {
          if (walletAddress)
            recovery?.voteToRecover(
              recoverInfo.recoveryProcessId,
              recoverInfo.newOwner,
              currentVaultEdits.vaultAddress,
              currentVaultEdits.ERC725Address,
              walletAddress
            );
        }}
      />
    </>
  );
}
