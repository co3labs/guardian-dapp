import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { BsCheck, BsChevronLeft, BsEye, BsEyeSlash, BsInfoCircle, BsX } from 'react-icons/bs';
import { GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import InfoParagraph from './InfoParagraph';
import ElementWithTitle from './ElementWithTitle';
import { IVaultInfo } from '../@types/types';
import StandardInput from './StandardInput';
import RecoverOwnerShip from './RecoverOwnership';
import UpdateSecretFields from './UpdateSecretFields';
import { useNavigate } from 'react-router-dom';

export default function VaultSetup({
  renderFields,
}: {
  renderFields: { name: boolean; profile: boolean; secret: boolean; old: boolean; processId: boolean };
}) {
  const maxLength = 42;
  const { currentVaultEdits, web3, location, currentStep, setCurrentStep } = useContext(GlobalContext);
  const [updateSecret, setUpdateSecret] = useState(false);
  const [isEthAddress, setIsEthAddress] = useState<boolean>(true);
  const { name, profile, secret, old, processId } = renderFields;

  useEffect(() => {
    if (profile && web3 && currentVaultEdits.ERC725Address.length === 42) {
      const isAddress = web3.utils.isAddress(currentVaultEdits.ERC725Address);
      if (isAddress) {
        setIsEthAddress(true)
        return
      }
    } 
    setIsEthAddress(false);
  }, [currentVaultEdits.ERC725Address]);

  return (
    <>
      <div className="flex flex-col w-full">
        {name ? (
          <StandardInput
            title="Recovery Vault Name"
            elementTitle="Vault Name"
            value={currentVaultEdits.vaultName}
            id="recovery_vault_name"
            placeholder="my vault"
            info="This name is for you to easily identify your vault while using the Guardian app. The name will not be
            stored on chain."
            paramName="vaultName"
            maxLength={maxLength}
            className="md:w-96"
          />
        ) : (
          <></>
        )}

        {profile ? (
          <StandardInput
            title="Universal Profile"
            elementTitle="ERC725 Address"
            value={currentVaultEdits.ERC725Address}
            id="recovery_vault_address"
            placeholder="0x0"
            info="This is the ERC725 contract address that the Recovery Vault will be associated with. Your contract must already be deployed."
            paramName="ERC725Address"
            maxLength={maxLength}
            className="w-[32rem]"
            isEthAddress={isEthAddress}
          />
        ) : (
          <></>
        )}

        {old && secret ? (
          <div className="w-full font-light px-6 mt-6 flex items-center">
            <span className="mr-2">Update Secret</span>
            <button onClick={() => setUpdateSecret(!updateSecret)} className="relative z-10 flex border rounded-sm">
              <div
                className={`absolute z-20 bg-white left-0 bottom-0 right-1/2 top-0 transition-transform ${
                  updateSecret ? 'translate-x-full' : ''
                }`}
              />
              <div className="h-4 w-4 bg-green-400">
                <BsCheck className="text-white" />
              </div>
              <div className="h-4 w-4 bg-red-500">
                <BsX className="text-white" />
              </div>
            </button>
          </div>
        ) : (
          <></>
        )}

        {secret ? <UpdateSecretFields renderFields={{ old, secret, updateSecret }} /> : <></>}
      </div>

      {location?.pathname === '/app/create' ? (
        <BackOrContinueBtns
          confirmText="Continue"
          exitBtn={true}
          conditionNext={
            !!currentVaultEdits.vaultName &&
            !!currentVaultEdits.ERC725Address &&
            !!currentVaultEdits.newSecret &&
            isEthAddress
          }
        />
      ) : (
        <BackOrContinueBtns
          back={old ? '/app/manage' : undefined}
          backText={<BsChevronLeft />}
          confirmText="Continue"
          exitBtn={true}
          conditionNext={!!currentVaultEdits.vaultName}
        />
      )}
    </>
  );
}
