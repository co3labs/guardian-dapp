import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import RecoverIdInput from './RecoveryIdInput';
import SetupInput from './SetupInput';
import UpdateSecretFields from './UpdateSecretFields';

export default function RecoverOwnerShip() {
  const { recoverInfo } = useContext(GlobalContext);

  return (
    <>
      <div className="w-full flex flex-col">
        <RecoverIdInput />
        <UpdateSecretFields renderFields={{ old: true, secret: true, updateSecret: true }} />
      </div>
      <BackOrContinueBtns
        back="/app/manage"
        backText={'My Vaults'}
        exitBtn={true}
        conditionNext={!!(recoverInfo)}
        confirmText="Recover Ownership"
        onNextClick={() => {}}
      />    </>
  );
}
