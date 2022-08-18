import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import SetupInput from './SetupInput';
import UpdateSecretFields from './UpdateSecretFields';

export default function RecoverOwnerShip() {
  const { recoverInfo } = useContext(GlobalContext);

  return (
    <>
      <div className="w-full flex flex-col">
        <SetupInput
          id="recover_process_id"
          title="Recovery Process ID"
          info="This will identity this specific recovery process. The ID can be string of text, numbers, or special characters, up to 32 characters."
          elementTitle="ID"
          maxLength={32}
          paramName={'recoveryProcessId'}
          recover={true}
          placeholder="ID_1234"
          value={recoverInfo.recoveryProcessId}
          className="md:w-96"
        />{' '}
        <UpdateSecretFields renderFields={{ old: true, secret: true, updateSecret: true }} />
      </div>
      <BackOrContinueBtns confirmText={'Recover Ownership'} />
    </>
  );
}
