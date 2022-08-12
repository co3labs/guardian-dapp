import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinue';

export default function NameVault() {
  const { currentVaultEdits, setCurrentVaultEdits } = useContext(GlobalContext);
  const maxLength = 32;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="grid grid-flow-row gap-12 pt-12"
      >
        <div>
          <label htmlFor="recovery_vault_name" className="w-min">
            Name your Recovery Vault <div className="w-full h-1px bg-gray-300" />
          </label>

          <p className="text-xs max-w-md text-gray-600">
            This name will be used to identify your vault while you're using the Guardian app. The name will not be
            stored on chain.
          </p>
        </div>

        <input
          onChange={(e) => {
            const value = e.target.value;
            if (value.length < maxLength) setCurrentVaultEdits({ ...currentVaultEdits, vaultName: value });
          }}
          className=""
          type="text"
          id="recovery_vault_name"
          value={currentVaultEdits.vaultName}
          placeholder="my vault"
        />
        <BackOrContinueBtns formSubmit={true} conditionNext={!!currentVaultEdits.vaultName} />
      </form>
    </>
  );
}
