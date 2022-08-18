import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import SetupInput from './SetupInput';

export default function VoteWithId() {
  const { recoverInfo } = useContext(GlobalContext);

  return (
    <>
      <div>
        {' '}
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
        <div className="p-6">
          <button className="btnBig btnPrimary">Initialize Recovery Process</button>
        </div>
      </div>
      <BackOrContinueBtns skip={[2]} back="/app/manage" backText={'My Vaults'} exitBtn={true} />
    </>
  );
}
