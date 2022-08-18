import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import SetupInput from './SetupInput';

export default function RecoverIdInput() {
  const { recoverInfo } = useContext(GlobalContext);

  return (
    <SetupInput
      id="recover_process_id"
      title="Recovery Process ID"
      info="The identifies the specific recovery process you are voting for, effectively grouping potentially concurrent processes."
      elementTitle="ID"
      maxLength={32}
      paramName={'recoveryProcessId'}
      recover={true}
      placeholder="ID_1234"
      value={recoverInfo.recoveryProcessId}
      className="md:w-96"
    />
  );
}
