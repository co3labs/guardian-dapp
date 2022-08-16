import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import InfoParagraph from './InfoParagraph';
import ElementWithTitle from './ElementWithTitle';
import { IVaultInfo } from '../@types/types';

export default function NameVault() {
  const maxLength = 32;
  const { currentVaultEdits } = useContext(GlobalContext);

  return (
    <>
      <div className='grid grid-flow-row'>
        <NameVaultInput
          title="Name Your Recovery Vault"
          subtitle="Vault Name"
          value={currentVaultEdits.vaultName}
          id="recover_vault_name"
          placeholder="my vault"
          info="This name is for you to easily identify your vault while using the Guardian app. The name will not be
            stored on chain."
          paramName="vaultName"
          maxLength={maxLength}
        />
        <NameVaultInput
          title="Which profile will this Recovery Vault be for?"
          subtitle="ERC725 Address"
          value={currentVaultEdits.ERC725Address}
          id="recover_vault_address"
          placeholder="0x0"
          info="This is the ERC725 contract address that the Recovery Vault will be associated with. Your contract must already be deployed."
          paramName="ERC725Address"
          maxLength={maxLength}
        />
      </div>

      <BackOrContinueBtns confirmText='Deploy Vault' exitBtn={true} conditionNext={!!currentVaultEdits.vaultName || !!currentVaultEdits.ERC725Address} />
    </>
  );
}

function NameVaultInput({
  paramName,
  title,
  info,
  maxLength,
  placeholder,
  subtitle,
  id,
  value,
  className,
}: {
  paramName: string;
  subtitle: string;
  placeholder: string;
  id: string;
  title: string;
  info: string;
  maxLength: number;
  value: string;
  className?: string;
}) {
  const { currentVaultEdits, setCurrentVaultEdits } = useContext(GlobalContext);

  return (
    <div className={`w-min ml-6 ${className}`}>
      <div className="my-6">
        <p className="font-light">{title}</p>
        <p className="font-light text-xs text-gray-400">{info}</p>
      </div>

      <ElementWithTitle
        title={subtitle}
        element={
          <input
            onChange={(e) => {
              const value = e.target.value;
              if (value.length < maxLength) setCurrentVaultEdits({ ...currentVaultEdits, [paramName]: value });
            }}
            className="md:w-96"
            type="text"
            id={id}
            value={value}
            placeholder={placeholder}
          />
        }
      />
    </div>
  );
}
