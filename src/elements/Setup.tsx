import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { BsEye, BsEyeSlash, BsInfoCircle } from 'react-icons/bs';
import { GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import InfoParagraph from './InfoParagraph';
import ElementWithTitle from './ElementWithTitle';
import { IVaultInfo } from '../@types/types';

export default function Setup() {
  const maxLength = 42;
  const { currentVaultEdits, web3, location, recovery, addToGlobalSnackbarQue, accountId } = useContext(GlobalContext);
  const [showSecret, setShowSecret] = useState(false);
  return (
    <>
      <div className="flex flex-col w-full">
        <SetupInput
          title="Name Your Recovery Vault"
          subtitle="Vault Name"
          value={currentVaultEdits.vaultName}
          id="recovery_vault_name"
          placeholder="my vault"
          info="This name is for you to easily identify your vault while using the Guardian app. The name will not be
            stored on chain."
          paramName="vaultName"
          maxLength={maxLength}
          className="md:w-96"
        />

        {location?.pathname === '/app/create' ? (
          <>
            <SetupInput
              title="What profile will this Recovery Vault be for?"
              subtitle="ERC725 Address"
              value={currentVaultEdits.ERC725Address}
              id="recovery_vault_address"
              placeholder="0x0"
              info="This is the ERC725 contract address that the Recovery Vault will be associated with. Your contract must already be deployed."
              paramName="ERC725Address"
              maxLength={maxLength}
              className="w-[32rem]"
            />
            <SetupInput
              title="Set a Vault Recovery Secret"
              subtitle="Secret"
              value={currentVaultEdits.ownerSecret}
              id="recovery_vault_secret"
              placeholder="0x0"
              type={showSecret ? 'text' : 'password'}
              info="Set a recovery secret that will be needed anytime a recovery process occurs. This secret will be needed to transfer ownership."
              paramName="ownerSecret"
              maxLength={180}
              className="w-[32rem]"
              passStates={{ show: showSecret, setShow: setShowSecret }}
            />
          </>
        ) : (
          <></>
        )}
      </div>

      {location?.pathname === '/app/create' ? (
        <BackOrContinueBtns
          confirmText="Continue"
          exitBtn={true}
          conditionNext={!!currentVaultEdits.vaultName || !!currentVaultEdits.ERC725Address}
          // onClick={async () => {
          //   try {
          //     if(!accountId) throw new Error("No account id.")
          //     const txReceipt = await recovery?.createRecoveryVault(currentVaultEdits.ERC725Address, accountId);
          //     console.log(txReceipt)
          //     addToGlobalSnackbarQue("You vault has been successfully created. You can proceed to adding guardians.")
          //   } catch (error) {
          //     console.error(error)
          //     addToGlobalSnackbarQue("An error occured when attempting to create a vault. Please try again.")
          //   }
          // }}
        />
      ) : (
        <BackOrContinueBtns confirmText="Continue" exitBtn={true} conditionNext={!!currentVaultEdits.vaultName} />
      )}
    </>
  );
}

function SetupInput({
  paramName,
  title,
  info,
  maxLength,
  placeholder,
  subtitle,
  id,
  value,
  className,
  type = 'text',
  passStates,
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
  type?: string;
  passStates?: { show: boolean; setShow: Dispatch<SetStateAction<boolean>> };
}) {
  const { currentVaultEdits, setCurrentVaultEdits } = useContext(GlobalContext);

  return (
    <div className={`w-min ml-6 ${className}`}>
      <div className="my-4">
        <p className="font-light">{title}</p>
        <p className="font-light text-xs text-gray-400">{info}</p>
      </div>

      <ElementWithTitle
        title={subtitle}
        passStates={passStates}
        element={
          <input
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= maxLength) setCurrentVaultEdits({ ...currentVaultEdits, [paramName]: value });
            }}
            className={className}
            id={id}
            value={value}
            placeholder={placeholder}
            type={type}
          />
        }
      />
    </div>
  );
}
