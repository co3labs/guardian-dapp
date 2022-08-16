import { useContext, useState } from 'react';
import { getShortId, GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import ElementWithTitle from './ElementWithTitle';
import InfoParagraph from './InfoParagraph';
import { Link } from 'react-router-dom';
import { IVaultInfo } from '../@types/types';

export default function ManageVaults() {
  const { allVaults, resetVaultAndSteps, setCurrentVaultEdits, currentVaultEdits } = useContext(GlobalContext);

  const selectedClasses = (vault: IVaultInfo) =>
    currentVaultEdits.vaultName === vault.vaultName ? 'border-blue-800' : '';

  return (
    <>
      <div className="m-6 font-light flex flex-col">
        <p>Your Recovery Vaults</p>
        {allVaults ? (
          <table className="w-full border-separate border-spacing-y-6">
            <thead className="text-left text-xs text-gray-400 table-header-group">
              <tr>
                <th>Name</th>
                <th>Guardians</th>
                <th>Approval Threshold</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(allVaults).map(([_, vault]) => (
                <tr
                  onClick={() => {
                    setCurrentVaultEdits(vault);
                  }}
                  className="vaultListItem group"
                >
                  <td
                    className={
                      'h-full bg-blue-800 bg-opacity-10 border-l border-y rounded-l-sm group-hover:border-blue-800 ' +
                      selectedClasses(vault)
                    }
                  >
                    {vault.vaultName}
                  </td>
                  <td className={'group-hover:border-blue-800 ' + selectedClasses(vault)}>{vault.guardianCount}</td>
                  <td className={'group-hover:border-blue-800 ' + selectedClasses(vault)}>{vault.threshold}</td>
                  <td className={'border-r rounded-r-sm group-hover:border-blue-800 ' + selectedClasses(vault)}>
                    {getShortId(vault.ERC725Address)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full my-4 py-2 border border-red-400 rounded-sm text-center">
            <span>No vaults in memory! Try importing a vault below or </span>
            <span>
              <Link to="/app/create" className="text-blue-800 hover:underline" onClick={resetVaultAndSteps}>
                create a new vault.
              </Link>
            </span>
          </div>
        )}

        <div className="mb-6">
          <p className="font-light text-sm md:text-base">Import a vault by entering it's ERC725 address</p>
        </div>
        <div className="flex flex-col md:flex-row items-center w-full py-1 px-6 md:px-0">
          <ElementWithTitle title="Import Vault" element={<input type="text" className='w-full flex-grow' />} />
          <button className="w-full md:w-auto rounded-sm md:py-[.9rem] flex justify-center items-center px-3 border-2 mt-2 md:mt-0 border-blue-800 md:ml-2">
            <span className="cursor-pointer">Import</span>
          </button>
        </div>
      </div>
      <BackOrContinueBtns confirmText="Continue" conditionNext={!!currentVaultEdits.timestampId} />
    </>
  );
}
