import { useContext, useEffect, useState } from 'react';
import {
  blockExplorer,
  getShortId,
  GlobalContext,
  INITIAL_RECOVERY_INFO,
  INITIAL_VAULT_STATE,
} from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import ElementWithTitle from './ElementWithTitle';
import InfoParagraph from './InfoParagraph';
import { Link } from 'react-router-dom';
import { IVaultInfo } from '../@types/types';
import { BsChevronDown, BsPen, BsPenFill } from 'react-icons/bs';

export default function ManageVaults() {
  const { allVaults, resetVaultAndSteps, setCurrentVaultEdits, currentVaultEdits, setRecoverInfo,  } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentVaultEdits(INITIAL_VAULT_STATE);
  }, []);

  const selectedClasses = (vault: IVaultInfo) =>
    `${currentVaultEdits.vaultName === vault.vaultName ? 'border-blue-800' : ''} group-hover:border-blue-800 `;

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
                    onClick={() => {
                      if (currentVaultEdits.vaultName === vault.vaultName) {
                        setCurrentVaultEdits(INITIAL_VAULT_STATE);
                      } else {
                        setCurrentVaultEdits(vault);
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
                    <td className={selectedClasses(vault)}>{getShortId(vault.ERC725Address)}</td>
                    <td className={'flex items-center border-r rounded-r-sm ' + selectedClasses(vault)}>
                      <Link
                        onClick={() => {
                          setCurrentVaultEdits({ ...vault });
                        }}
                        to="/app/edit"
                        className="text-xs hover:text-blue-800 flex items-center  py-1 px-2"
                      >
                        <BsPen className="mr-1" size={12} />
                        Edit
                      </Link>
                      <Link
                        onClick={() => {
                          resetVaultAndSteps(vault)
                        }}
                        to="/app/recover"
                        className="text-xs btnSecondary flex items-center ml-4 mr-1 py-1 px-2"
                      >
                        Recover
                      </Link>
                      <Link
                        onClick={() => {
                          resetVaultAndSteps(vault)

                        }}
                        to="/app/vote"
                        className="text-xs btnPrimary flex items-center mr-4 ml-1 py-1 px-2"
                      >
                        Vote
                      </Link>
                      <BsChevronDown
                        className={`transition-transform ${
                          currentVaultEdits.vaultName === vault.vaultName ? 'rotate-180' : ''
                        }`}
                      />
                    </td>
                  </tr>
                  <tr className={`${currentVaultEdits.vaultName === vault.vaultName ? 'visible' : 'hidden'}`}>
                    <td colSpan={5}>
                      <div className="inline-flex">
                        <div>
                          {[
                            [
                              'Vault Address',
                              getShortId(
                                currentVaultEdits.vaultAddress || '0x5a2BB322D6425e1CDEa1ce5d3f17F035C1f73022'
                              ),
                            ],
                            [
                              'Profile Address',
                              getShortId(
                                currentVaultEdits.ERC725Address || '0x5a2BB322D6425e1CDEa1ce5d3f17F035C1f73022'
                              ),
                            ],
                            [
                              'Vault Owner',
                              getShortId(currentVaultEdits.vaultOwner || '0x5a2BB322D6425e1CDEa1ce5d3f17F035C1f73022'),
                            ],
                            ['Last Updated', getLastUpdated()],
                          ].map((item: string[]) => (
                            <div className="my-6 mr-6">
                              <ElementWithTitle
                                title={item[0]}
                                element={
                                  <a
                                    href={`${blockExplorer}${item[1]}`}
                                    className="vaultInfo hover:text-blue-800 px-12"
                                  >
                                    {item[1]}
                                  </a>
                                }
                              />
                            </div>
                          ))}
                        </div>
                        <ElementWithTitle
                          title={`Guardian List (${currentVaultEdits.guardianCount})`}
                          element={
                            <>
                              <div className="border mt-6  p-6">
                                {Object.entries(currentVaultEdits.guardianList).map(([_, guardian]) => (
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
          <button className="w-full md:w-auto rounded-sm md:py-[.9rem] flex justify-center items-center px-3 border-2 mt-2 md:mt-0 border-blue-800 md:ml-2">
            <span className="cursor-pointer">Import</span>
          </button>
        </div>
      </div>
      <BackOrContinueBtns skip={[2]} back="/app/welcome" backText={'Exit'} />
    </>
  );
}
