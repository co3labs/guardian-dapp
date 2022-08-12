import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinue';

export default function ReviewChanges() {
  const { currentVaultEdits } = useContext(GlobalContext);

  //? show previous vault here ?
  return (
    <div className="my-12 ">
      <div className="w-max">
        <span className="w-max">Does Everything Look Correct?</span> <div className="mb-12 h-1px w-full bg-gray-300" />
      </div>

      {currentVaultEdits ? (
        <div className="flex flex-col">
          <div className="grid grid-flow-col w-full ">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Vault Name</span>
              <span className="text-2xl">{currentVaultEdits.vaultName}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Transaction Approval Amount</span>
              <span className="text-2xl">{currentVaultEdits.threshold}</span>
            </div>
          </div>
          <div className="mt-6">
            <span className="text-xs text-gray-400">Guardian List</span>
            <div className="w-full grid grid-flow-row ">
              {Object.entries(currentVaultEdits?.guardianList).map(([id, { name, address }], index) => (
                <div className='my-4 border p-4 rounded-sm grid grid-flow-col text-left'>
                  <span className="text-gray-300 mr-3 text-right">{index + 1}</span> <span>{name}</span>{' '}
                  <span>{address}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>{/**TODO: Throw / show an error here */}</>
      )}
      <BackOrContinueBtns conditionNext={false} />
    </div>
  );
}
