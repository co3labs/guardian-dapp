import React, { PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react';
import { DebounceInput, PropConstraints } from 'react-debounce-input';
import { BsTrash } from 'react-icons/bs';
import { IGuardianInfo } from '../@types/types';
import { GlobalContext } from '../context/GlobalState';
import InvalidInputAlert from './InvalidInputAlert';

export default function GuardianInput({
  index,
  guardian,
  id,
  setGuardianCount,
  guardianCount,
  setIsLoading,
}: {
  index: number;
  guardian: IGuardianInfo;
  id: string;
  setGuardianCount: React.Dispatch<React.SetStateAction<number>>;
  guardianCount: number;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [hasTypedName, setHasTypedName] = useState(false);
  const [hasTypedAddress, setHasTypedAddress] = useState(false);
  const { currentVaultEdits, setCurrentVaultEdits } = useContext(GlobalContext);

  useEffect(() => {
    if (guardian.name && !hasTypedName) setHasTypedName(true);
    if (guardian.address && !hasTypedAddress) setHasTypedAddress(true);
  }, [guardian.name, guardian.address]);

  function updateGuardian(val: string, index: number, field: 'name' | 'address') {
    const newGuardians = currentVaultEdits.guardianList;
    if (field === 'name') {
      newGuardians[index] = { ...newGuardians[index], name: val };
    } else {
      newGuardians[index] = { ...newGuardians[index], address: val };
    }

    setCurrentVaultEdits({ ...currentVaultEdits, guardianList: newGuardians });
  }

  return (
    <div key={`owner_${index}`} className="grid grid-flow-col gap-4 my-4">
      <div className="relative">
        <input
          type="text"
        //   debounceTimeout={500}
          onChange={(event) => {
            updateGuardian(event.target.value, index, 'name');
          }}
          className="border rounded-sm p-2"
          value={guardian.name}
          placeholder="name"
        />
        <InvalidInputAlert condition={hasTypedName && !guardian.name} message="Guardian must have a name." />
      </div>
      <div className="relative">
        <input
          type="text"
        //   debounceTimeout={500}
          onChange={(event) => {
            updateGuardian(event.target.value, index, 'address');
          }}
          className="border rounded-sm p-2"
          value={guardian.address}
          placeholder="address"
        />
        <InvalidInputAlert condition={hasTypedAddress && !guardian.address} message="Guardian must have an address." />
      </div>
      {index > 0 ? (
        <button
          type="button"
          onClick={() => {
            const newGuardians = currentVaultEdits.guardianList;
            delete newGuardians[Number(id)];
            setCurrentVaultEdits({ ...currentVaultEdits, guardianList: newGuardians });
            setGuardianCount(guardianCount - 1);
          }}
        >
          <BsTrash />
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

interface InputProps extends PropsWithChildren {
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  onChange:Function
}

function ImmediateChangeWrapper(props: InputProps) {
  return (
    <input
      {...props}
      onChange={(e) => {
        props.setIsLoading(true);
        props.onChange(e)
      }}
    />
  );
}
