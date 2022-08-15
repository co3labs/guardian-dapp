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
        <div className="mb-6">
          <p className="font-light">Import your vault by entering thier ERC725 address.</p>
          <InfoParagraph text="Make sure you are connected to the same chain your vault is on." />
        </div>
        <ElementWithTitle title="Import Vault" element={<input type="text" className="md:w-full" />} />
        <div className="mt-6">
          <p>Or select from your vaults below</p>
        </div>
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
                  {getShortId(vault.address)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {allVaults.length === 0 ? (
          <div className="w-full py-2 border border-red-400 rounded-sm text-center">
            <span>No vaults in memory! Try importing a vault above or </span>
            <span>
              <Link to="/app/create" className="text-blue-800 hover:underline" onClick={resetVaultAndSteps}>
                create a new vault.
              </Link>
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
      <BackOrContinueBtns />
    </>
  );
}
