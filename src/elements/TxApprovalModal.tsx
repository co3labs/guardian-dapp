import { useContext } from 'react';
import { BsCheck, BsX } from 'react-icons/bs';
import { ITxState } from '../@types/types';
import { GlobalContext } from '../context/GlobalState';
import TxApproveItems from './TxApproveItems';

export default function TxApprovalModal() {
  const { txState, setTxState } = useContext(GlobalContext);
  if (txState) {
    return (
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-black z-20 bg-opacity-25">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100 flex flex-col p-6 rounded-sm border border-blue-800 shadow-lg">
          <div className="w-full flex justify-end">
            <button
              onClick={() => {
                setTxState({ ...txState, showModal: false });
              }}
            >
              <BsX />
            </button>
          </div>
          <TxApproveItems object={txState} isGuardians={false} />
          <TxApproveItems object={txState.guardiansAdded} isGuardians={true} />
        </div>
      </div>
    );
  } else {
    return <></>
  }
}
