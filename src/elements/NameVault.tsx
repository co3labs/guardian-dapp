import { useContext, useEffect, useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import InfoParagraph from './InfoParagraph';
import ElementWithTitle from './ElementWithTitle';

export default function NameVault() {
  const { currentVaultEdits, setCurrentVaultEdits } = useContext(GlobalContext);
  const maxLength = 32;

  return (
    <>
      <div className='w-min  ml-6'>
        <div className="my-6">
          <p className="font-light">Name Your Recovery Vault</p>
          <p className='font-light text-xs text-gray-400'>This name will be used to identify your vault while you're using the Guardian app. The name will not be stored on chain.</p>
        </div>

        <ElementWithTitle
          title="Vault Name"
          element={
            <input
              onChange={(e) => {
                const value = e.target.value;
                if (value.length < maxLength) setCurrentVaultEdits({ ...currentVaultEdits, vaultName: value });
              }}
              className="md:w-96"
              type="text"
              id="recovery_vault_name"
              value={currentVaultEdits.vaultName}
              placeholder="my vault"
            />
          }
        />
      </div>

      <BackOrContinueBtns conditionNext={!!currentVaultEdits.vaultName} />
    </>
  );
}
