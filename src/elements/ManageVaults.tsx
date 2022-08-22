import { useContext, useEffect, useState } from 'react';
import {
  blockExplorer,
  getShortId,
  GlobalContext,
  INITIAL_RECOVERY_INFO,
  INITIAL_VAULT_EDITS,
} from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import ElementWithTitle from './ElementWithTitle';
import InfoParagraph from './InfoParagraph';
import { Link } from 'react-router-dom';
import { IVaultInfo } from '../@types/types';
import { BsChevronDown, BsPen, BsPenFill } from 'react-icons/bs';

export default function ManageVaults() {
  const { allVaults, resetVaultAndSteps, setCurrentVaultEdits, currentVaultEdits, selectedVault } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentVaultEdits(INITIAL_VAULT_EDITS);
  }, []);

  const selectedClasses = (vault: IVaultInfo) =>
    `${currentVaultEdits.vaultAddress === vault.vaultAddress ? 'border-blue-800' : ''} group-hover:border-blue-800 `;

  const getLastUpdated = () => {
    const lastUpdated = new Date(currentVaultEdits.lastUpdated);
    return `${lastUpdated.getMonth()}-${lastUpdated.getDate()}-${lastUpdated.getFullYear()}`;
  };

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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(allVaults).map(([_, vault]) => (
                <>
                  <tr
                    id="vaultRow"
                    onClick={(e) => {
                      //@ts-ignore
                      if (e.target.id !== 'edit_vault_' + vault.vaultAddress) {
                        if (currentVaultEdits.vaultAddress === vault.vaultAddress) {
                          setCurrentVaultEdits(INITIAL_VAULT_EDITS);
                        } else {
                          setCurrentVaultEdits({ ...vault, newSecret: '', guardianRemoveAmt:0 });
                          selectedVault.current = vault;
                        }
                      }
                    }}
                    className="vaultListItem group"
                  >
                    <td
                      className={
                        'w-max overflow-x-scroll no-scrollbar h-full bg-blue-800 bg-opacity-10 border-l border-y rounded-l-sm group-hover:border-blue-800 ' +
                        selectedClasses(vault)
                      }
                    >
                      {vault.vaultName}
                    </td>
                    <td className={selectedClasses(vault)}>{vault.guardianCount}</td>
                    <td className={selectedClasses(vault)}>{vault.threshold}</td>
                    <td className={selectedClasses(vault)}>{getShortId(vault.vaultAddress)}</td>
                    <td className={'flex items-center border-r rounded-r-sm ' + selectedClasses(vault)}>
                      <Link
                        id={'edit_vault_' + vault.vaultAddress}
                        onClick={() => {
                          resetVaultAndSteps(vault);
                          selectedVault.current = vault;
                        }}
                        to="/app/edit"
                        className="text-xs btnSecondary py-1 px-2"
                      >
                        Update
                      </Link>
                      <Link
                        onClick={(e) => {
                          resetVaultAndSteps(vault);
                          selectedVault.current = vault;
                        }}
                        to="/app/recover"
                        className="text-xs btnSecondary flex items-center mx-2 py-1 px-2"
                      >
                        Recover
                      </Link>
                      <Link
                        onClick={() => {
                          resetVaultAndSteps(vault);
                          selectedVault.current = vault;
                        }}
                        to="/app/vote"
                        className="text-xs btnPrimary flex items-center mr-2 py-1 px-2"
                      >
                        Vote
                      </Link>
                      <BsChevronDown
                        className={`transition-transform ${
                          currentVaultEdits.vaultAddress === vault.vaultAddress ? 'rotate-180' : ''
                        }`}
                      />
                    </td>
                  </tr>
                  <tr className={`${currentVaultEdits.vaultAddress === vault.vaultAddress ? 'visible' : 'hidden'}`}>
                    <td colSpan={5}>
                      <div className="inline-flex">
                        <div className="flex-grow">
                          {[
                            ['Vault Address', getShortId(vault.vaultAddress)],
                            ['Profile Address', getShortId(vault.ERC725Address)],
                            ['Vault Owner', getShortId(vault.vaultOwner)],
                            ['Last Updated', getLastUpdated()],
                          ].map((item: string[]) => (
                            <div className="my-6 mr-6 ">
                              <ElementWithTitle
                                title={item[0]}
                                element={
                                  <a
                                    href={`${blockExplorer}${item[1]}`}
                                    className="vaultInfo hover:text-blue-800 px-12 w-96"
                                  >
                                    {item[1]}
                                  </a>
                                }
                              />
                            </div>
                          ))}
                        </div>
                        <ElementWithTitle
                          title={`Guardian List (${vault.guardianCount})`}
                          element={
                            <>
                              <div className="border mt-6  p-6">
                                {Object.entries(vault.guardianList).map(([_, guardian]) => (
                                  <div className="flex w-fit items-center my-3">
                                    <p className="mr-6">{guardian.name}</p>
                                    <a
                                      href={`${blockExplorer}${guardian.address}`}
                                      className="mr-6 text-sm text-gray-400 hover:text-black"
                                    >
                                      {guardian.address}
                                    </a>
                                  </div>
                                ))}
                              </div>
                            </>
                          }
                        />
                      </div>{' '}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full my-4 py-2 border border-red-400 rounded-sm text-center">
            <span>No vaults in memory! Try importing a vault below or </span>
            <span>
              <Link to="/app/create" className="text-blue-800 hover:underline" onClick={() => resetVaultAndSteps()}>
                create a new vault.
              </Link>
            </span>
          </div>
        )}

        <div className="mb-6">
          <p className="font-light text-sm md:text-base">Import a vault by entering it's ERC725 address</p>
        </div>
        <div className="flex flex-col md:flex-row items-center w-full py-1 px-6 md:px-0">
          <ElementWithTitle title="Import Vault" element={<input type="text" className="w-full flex-grow" />} />
          <button className="w-full md:w-auto rounded-sm md:py-[.9rem] flex justify-center hover:bg-blue-800 hover:bg-opacity-10 items-center px-3 border mt-2 md:mt-0 border-blue-800 md:ml-2">
            <span className="cursor-pointer">Import</span>
          </button>
        </div>
      </div>
      <BackOrContinueBtns skip={[2]} back="/app/welcome" backText={'Exit'} />
    </>
  );
}
