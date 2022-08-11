import { useContext, useEffect, useState } from 'react';
import { BsChevronDown, BsTrash } from 'react-icons/bs';
import OutsideClickHandler from 'react-outside-click-handler';
import { IGuardianInfo, IGuardianList, IVaultInfo } from '../@types/types';
import { GlobalContext } from '../context/GlobalState';

export default function GuardianForm({
  existingGuardians = { 0: { name: '', address: '' } },
}: {
  existingGuardians?: IGuardianList;
}) {
  const [guardians, setGuardians] = useState<IGuardianList>(existingGuardians);
  const [guardianCount, setGuardianCount] = useState(Object.keys(existingGuardians).length);
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
    <form
      className="flex flex-col h-full p-4"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
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
  );
}
