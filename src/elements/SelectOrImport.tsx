import { useContext, useState } from 'react';
import { getShortId, GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import ElementWithTitle from './ElementWithTitle';
import InfoParagraph from './InfoParagraph';
import { Link } from 'react-router-dom';
import { IVaultInfo } from '../@types/types';

export default function SelectOrImport() {
  const { allVaults, resetVaultAndSteps, setCurrentVaultEdits, currentVaultEdits } = useContext(GlobalContext);

  const selectedClasses = (vault: IVaultInfo) =>
    currentVaultEdits.vaultName === vault.vaultName ? 'border-blue-800' : '';

  return (
    <>
      <div className="m-6 font-light">
        <p>Your Recovery Vaults</p>
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
            {allVaults.map((vault, index) => (
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
        {allVaults.length === 0 ? (
          <div className="w-full py-2 border border-red-400 rounded-sm text-center">
            <span>No vaults in memory! Try importing a vault below or </span>
            <span>
              <Link to="/app/create" className="text-blue-800 hover:underline" onClick={resetVaultAndSteps}>
                create a new vault.
              </Link>
            </span>
          </div>
        ) : (
          <></>
        )}
        <div className="mb-6">
          <p className="font-light">Import a vault by entering it's ERC725 address</p>
        </div>
        <div className="flex items-center">
          <ElementWithTitle title="Import Vault" element={<input type="text" className="md:w-full flex-grow" />} />
          <button className="h-full py-[.9rem] flex justify-center items-center px-3 btnSecondary ml-2">
            <span className="cursor-pointer">Import</span>
          </button>
        </div>
      </div>
      <BackOrContinueBtns confirmText="Continue" />
    </>
  );
}
