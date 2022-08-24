import { useContext, useEffect, useState } from 'react';
import { BsCheck, BsChevronLeft, BsX } from 'react-icons/bs';
import { GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import StandardInput from './StandardInput';
import UpdateSecretFields from './UpdateSecretFields';
import { useCheckAddVault } from '../hooks/usePermissions';

export default function VaultSetup({
  renderFields,
}: {
  renderFields: {
    name: boolean;
    profile: boolean;
    secret: boolean;
    old: boolean;
    processId: boolean;
    secretToggle: boolean;
  };
}) {
  const maxLength = 42;
  const { currentVaultEdits, location, allVaults } = useContext(GlobalContext);
  const [updateSecret, setUpdateSecret] = useState(false);
  const { name, profile, secret, old, secretToggle } = renderFields;
  const [nameIsTaken, setNameIsTaken] = useState(false);

  const [validERC725, addressMessage, addVaultCheckLoading] = useCheckAddVault(true);

  useEffect(() => {
    if (allVaults) {
      const names = Object.values(allVaults).map((vault) => vault.vaultName);
      if (names.includes(currentVaultEdits.vaultName)) {
        setNameIsTaken(true);
      } else {
        setNameIsTaken(false);
      }
    }
  }, [currentVaultEdits.vaultName]);

  return (
    <>
      <div className="flex flex-col w-full xl:w-1/2">
        {name ? (
          <StandardInput
            title="Recovery Vault Name"
            elementTitle="Name"
            value={currentVaultEdits.vaultName}
            id="recovery_vault_name"
            placeholder="my vault"
            info="This name is for you to easily identify your Recovery Vault while using the Guardians dApp. The name will not be
            stored on chain."
            paramName="vaultName"
            maxLength={maxLength}
            className="w-full"
            error={
              nameIsTaken && location?.pathname === '/app/create' ? 'You already have a vault with this name.' : ''
            }
          />
        ) : (
          <></>
        )}

        {profile ? (
          <StandardInput
            title="ERC725 Account to Recover"
            elementTitle="ERC725 Address"
            value={currentVaultEdits.ERC725Address}
            id="recovery_vault_address"
            placeholder="0x0"
            info="This is the ERC725 contract address that the new Recovery Vault will be associated with."
            paramName="ERC725Address"
            maxLength={maxLength}
            className="w-full"
            error={addressMessage}
            loading={addVaultCheckLoading}
          />
        ) : (
          <></>
        )}

        {secretToggle ? (
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

        {updateSecret || location?.pathname === '/app/create' ? (
          <UpdateSecretFields renderFields={{ old, secret, updateSecret }} />
        ) : (
          <></>
        )}
      </div>

      {location?.pathname === '/app/create' ? (
        <BackOrContinueBtns
          confirmText="Continue"
          exitBtn={true}
          conditionNext={
            validERC725 &&
            !!currentVaultEdits.vaultName &&
            !!currentVaultEdits.ERC725Address &&
            !!currentVaultEdits.newSecret &&
            !nameIsTaken &&
            !addVaultCheckLoading
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
