import { useContext, useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { getShortId, GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import ElementWithTitle from './ElementWithTitle';
import InfoParagraph from './InfoParagraph';
import vaults from '../sample-data.json';

export default function ImportVault() {
  const { allVaults } = useContext(GlobalContext);
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
            {vaults.map((vault, index) => (
              <tr
                onClick={() => {
                  console.log(index);
                }}
                className="vaultListItem group"
              >
                <td className="h-full bg-blue-800 bg-opacity-10 border-l border-y rounded-l-sm group-hover:border-blue-800">
                  {vault.vaultName}
                </td>
                <td className="group-hover:border-blue-800">{vault.guardianCount}</td>
                <td className="group-hover:border-blue-800">{vault.threshold}</td>
                <td className="border-r rounded-r-sm group-hover:border-blue-800">{getShortId(vault.address)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BackOrContinueBtns back="/app/welcome" />
    </>
  );
}
