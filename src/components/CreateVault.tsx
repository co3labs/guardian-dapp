import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { BsChevronDown, BsTrash } from 'react-icons/bs';
import OutsideClickHandler from 'react-outside-click-handler';

interface IGuardianInfo {
  name: string;
  address: string;
}

export default function CreateVault() {
  const [guardians, setGuardians] = useState<{ [owner: number]: IGuardianInfo }>({ 0: { name: '', address: '' } });
  const [guardianCount, setGuardianCount] = useState(1);
  const [threshold, setThreshold] = useState<number>(1);
  const [openThresholdSelect, setOpenThresholdSelect] = useState(false);
  const { accountId } = useContext(GlobalContext);

  useEffect(() => {
    if (threshold > guardianCount && guardianCount > 0) setThreshold(guardianCount);
  }, [guardianCount, threshold]);

  useEffect(() => {
    if (accountId) {
      setGuardians({ ...guardians, 0: { name: '', address: accountId } });
      setGuardianCount(1);
    }
  }, [accountId]);

  function updateGuardian(val: string, index: number, field: 'name' | 'address') {
    const newGuardians = guardians;
    if (field === 'name') {
      newGuardians[index] = { ...newGuardians[index], name: val };
    } else {
      newGuardians[index] = { ...newGuardians[index], address: val };
    }

    setGuardians({ ...newGuardians });
  }

  return (
    <div className="w-full h-full flex justify-center items-center py-12 px-4 md:px-12 lg:px-0">
      <div className="rounded-sm flex flex-col shadow-lg bg-white w-full lg:w-2/3 xl:w-1/2 ">
        <div className="bg-gray-200 p-4">
          <h3>Create a new Recovery Vault</h3>
        </div>
        <form
          className="flex flex-col h-full p-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label htmlFor="recovery_vault_name">Recovery Vault Name</label>
          <input className="border rounded-sm" type="text" id="recovery_vault_name" />
          <div className="flex flex-col h-full">
            <div className="grid grid-flow-col">
              <p>Name</p>
              <p>Address</p>
            </div>
            {Object.entries(guardians).map(([id, owner]: [string, IGuardianInfo], index: number) => (
              <div key={`owner_${index}`} className="grid grid-flow-col gap-4 my-4">
                <input
                  type="text"
                  onChange={(event) => {
                    updateGuardian(event.target.value, index, 'name');
                  }}
                  className="border rounded-sm p-2"
                  value={owner.name}
                  placeholder="name"
                />
                <input
                  type="text"
                  onChange={(event) => {
                    updateGuardian(event.target.value, index, 'address');
                  }}
                  className="border rounded-sm p-2"
                  value={owner.address}
                  placeholder="address"
                />
                {index > 0 ? (
                  <button
                    type="button"
                    onClick={() => {
                      const newOwners = guardians;
                      delete newOwners[Number(id)];
                      setGuardians({ ...newOwners });
                      setGuardianCount(guardianCount - 1);
                    }}
                  >
                    <BsTrash />
                  </button>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>

          <button
            className="border rounded-sm"
            type="button"
            onClick={() => {
              setGuardians({
                ...guardians,
                [guardianCount]: {
                  name: '',
                  address: '',
                },
              });
              setGuardianCount(guardianCount + 1);
            }}
          >
            + Add Another Guardian
          </button>
          <div className="my-4">
            <p>Any transaction requires the confirmation of:</p>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setOpenThresholdSelect(!openThresholdSelect)}
                className="relative flex items-center p-2 border rounded-sm mr-3 my-4"
              >
                <span className="mr-3">{threshold}</span>
                <span>
                  <BsChevronDown />
                </span>
                {openThresholdSelect && guardianCount > 0 ? (
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      setOpenThresholdSelect(false);
                    }}
                  >
                    <ul className="absolute left-0 right-0 bottom-0 border rounded-sm bg-white max-h-96 overflow-scroll no-scrollbar">
                      {Object.keys(guardians).map((_: string, index: number) => (
                        <li
                          onClick={() => {
                            setThreshold(index + 1);
                            setOpenThresholdSelect(false);
                          }}
                          className="my-2 hover:bg-gray-200"
                        >
                          {index + 1}
                        </li>
                      ))}
                    </ul>
                  </OutsideClickHandler>
                ) : (
                  <></>
                )}
              </button>
              <span>out of {guardianCount} guardian(s)</span>
            </div>
          </div>
          <button type="submit" className="border rounded-sm ">
            Create New Vault
          </button>
        </form>
      </div>
    </div>
  );
}
