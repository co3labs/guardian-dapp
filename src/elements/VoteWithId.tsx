import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import RecoverIdInput from './RecoveryIdInput';
import SetupInput from './SetupInput';

export default function VoteWithId() {
  const { recoverInfo, currentVaultEdits } = useContext(GlobalContext);

  return (
    <>
      <div>
        {' '}
        <RecoverIdInput />
        <SetupInput
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
        onNextClick={() => {}}
      />
    </>
  );
}
