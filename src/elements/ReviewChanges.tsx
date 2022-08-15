import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';

export default function ReviewChanges() {
  const { currentVaultEdits, setAllVaults, allVaults } = useContext(GlobalContext);
  const navigate = useNavigate()
  //? show previous vault here ?
  return (
    <>
      <div className="m-6">
        <span className="w-max font-light">Does Everything Look Correct?</span>

        {currentVaultEdits ? (
          <div className="flex flex-col mt-6">
            <div className="grid grid-flow-col w-full">
              <div className="flex flex-col border-l border-y rounded-l-sm p-4">
                <span className="text-xs text-gray-400">Vault Name</span>
                <span className="text-2xl">{currentVaultEdits.vaultName}</span>
              </div>
              <div className="flex flex-col border rounded-sm p-4">
                <span className="text-xs text-gray-400">Transaction Approval Threshold</span>
                <span className="text-2xl">{currentVaultEdits.threshold}</span>
              </div>
            </div>
            <div className="mt-6">
              <span className="text-xs text-gray-400">Guardian List {`(${currentVaultEdits.guardianCount})`}</span>
              <div className="w-full grid grid-flow-row ">
                {Object.entries(currentVaultEdits?.guardianList).map(([id, { name, address }], index) => (
                  <div className="my-4 border p-4 rounded-sm grid grid-flow-col text-left">
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
      </div>
      <BackOrContinueBtns
        onClick={() => {
          setAllVaults([
            ...allVaults.filter((vault) => vault.vaultName !== currentVaultEdits.vaultName),
            currentVaultEdits,
          ]);

          navigate("/app/welcome", {replace:true})
        }}
      />
    </>
  );
}
