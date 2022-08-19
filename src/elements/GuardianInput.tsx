import React, { PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react';
import { DebounceInput, PropConstraints } from 'react-debounce-input';
import { BsTrash } from 'react-icons/bs';
import { IGuardianInfo, IGuardianInfoEdits, IGuardianList } from '../@types/types';
import { GlobalContext } from '../context/GlobalState';
import ElementWithTitle from './ElementWithTitle';
import InvalidInputAlert from './InvalidInputAlert';

export default function GuardianInput({
  index,
  guardian,
  id,
  setIsLoading,
  setDuplicate,
  duplicate,
}: {
  index: number;
  guardian: IGuardianInfoEdits;
  id: string;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  setDuplicate: React.Dispatch<SetStateAction<number[] | undefined>>;
  duplicate: number[] | undefined;
}) {
  const [hasTypedName, setHasTypedName] = useState(false);
  const [hasTypedAddress, setHasTypedAddress] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const {
    currentVaultEdits,
    setCurrentVaultEdits,
    selectedVault,
    web3,
    location,
    setGuardiansToRemove,
    guardiansToRemove,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (guardian.name && !hasTypedName) setHasTypedName(true);
    if (guardian.address && !hasTypedAddress) setHasTypedAddress(true);

    if (hasTypedAddress && guardian.address.length > 0) {
      if (guardian.address) {
        const isValidAddress = web3?.utils.isAddress(guardian.address);
        if (!isValidAddress) {
          setErrorMessage('Invalid Eth Address');
        } else {
          setErrorMessage(undefined);
        }
      }
    } else if (errorMessage) {
      setErrorMessage(undefined);
    }
  }, [guardian.name, guardian.address, currentVaultEdits]);

  function updateGuardian(val: string, index: number, field: 'name' | 'address') {
    const newGuardians = currentVaultEdits.guardianList;
    if (field === 'name') {
      newGuardians[index] = { ...newGuardians[index], name: val };
    } else {
      newGuardians[index] = { ...newGuardians[index], address: val };
    }

    setCurrentVaultEdits({ ...currentVaultEdits, guardianList: { ...newGuardians } });
  }

  function removeGuardian() {
    const newGuardians = currentVaultEdits.guardianList;
    let newCount = currentVaultEdits.guardianCount;

    if (guardian.action === 'remove') {
      const updatedGuardian: IGuardianInfoEdits = { ...guardian, action: 'add' };
      newGuardians[Number(id)] = updatedGuardian;
      newCount++;
    } else {
      if (location?.pathname === '/app/create') {
        delete newGuardians[Number(id)];
      } else {
        const updatedGuardian: IGuardianInfoEdits = { ...guardian, action: 'remove' };
        newGuardians[Number(id)] = updatedGuardian;
      }
      newCount--;
    }
    setCurrentVaultEdits({
      ...currentVaultEdits,
      guardianList: newGuardians,
      guardianCount: newCount,
    });
  }

  return (
    <div key={`owner_${index}`} className="flex my-4 w-full text-sm">
      <div className="relative min-w-[30%]">
        <ElementWithTitle
          title="Guardian Name"
          element={
            <input
              type="text"
              //   debounceTimeout={500}
              onChange={(event) => {
                updateGuardian(event.target.value, index, 'name');
              }}
              className={`border rounded-sm p-2 w-full mr-1 ${
                !!((hasTypedAddress && !guardian.address) || errorMessage) ? 'border-red-500' : ''
              }`}
              value={guardian.name}
              placeholder="name"
            />
          }
        />
        <InvalidInputAlert condition={hasTypedName && !guardian.name} message="Guardian must have a name." />
      </div>
      <div className="relative w-full">
        <ElementWithTitle
          title="Wallet Address"
          element={
            <input
              type="text"
              onChange={(event) => {
                updateGuardian(event.target.value, index, 'address');
              }}
              className={`border rounded-sm p-2 w-full ml-1 ${
                !!((hasTypedAddress && !guardian.address) || errorMessage) ? 'border-red-500' : ''
              }`}
              value={guardian.address}
              placeholder="address"
            />
          }
        />

        <InvalidInputAlert
          condition={!!((hasTypedAddress && !guardian.address) || errorMessage || duplicate?.includes(index))}
          message={
            errorMessage
              ? errorMessage
              : duplicate?.includes(index)
              ? 'Duplicate Address'
              : 'Guardian must have an address.'
          }
        />
      </div>
      {index > 0 ? (
        <button
          type="button"
          className={`transition-colors ml-2 ${guardian.action !== "remove"?"hover:bg-red-500": "hover:bg-blue-800"}  hover:text-white w-10 rounded-sm bg-gray-100 flex justify-center items-center`}
          onClick={removeGuardian}
        >
          {guardian.action !== 'remove' ? <BsTrash /> : '+'}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
