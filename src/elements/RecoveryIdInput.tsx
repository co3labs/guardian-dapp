import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import StandardInput from './StandardInput';

export default function RecoverIdInput() {
  const { recoverInfo } = useContext(GlobalContext);

  return (
    <StandardInput
      id="recover_process_id"
      title="Recovery Process ID"
      info="The identifies the specific recovery process you are voting for, effectively grouping potentially concurrent processes."
      elementTitle="ID"
      maxLength={Infinity}
      paramName={'recoveryProcessId'}
      recover={true}
      placeholder="ID_1234"
      value={recoverInfo.recoveryProcessId}
      className="w-full"
    />
  );
}
