import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import ElementWithTitle from './ElementWithTitle';

export default function StandardInput({
  paramName,
  title,
  info,
  maxLength,
  placeholder,
  elementTitle,
  id,
  value,
  className,
  type = 'text',
  passStates,
  recover,
  isEthAddress = false,
}: {
  paramName: string;
  elementTitle: string;
  placeholder: string;
  id: string;
  title: string;
  info: string;
  maxLength: number;
  value: string;
  className?: string;
  type?: string;
  passStates?: { show: boolean; setShow: Dispatch<SetStateAction<boolean>> };
  recover?: boolean;
  isEthAddress?: boolean;
}) {
  const { currentVaultEdits, setCurrentVaultEdits, recoverInfo, setRecoverInfo, web3, recovery, walletAddress } =
    useContext(GlobalContext);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if(!isEthAddress) return 
    async function checkEthAddress() {
      if (!web3 || !walletAddress) return;
      const isAddress = web3.utils.isAddress(currentVaultEdits.ERC725Address);
      const canAddVault = await recovery
        ?.canCreateRecoveryVault(walletAddress, currentVaultEdits.ERC725Address)
      if (!isAddress) {
        setErrorMessage('Invalid Eth Address');
      } else if (!canAddVault) {
        setErrorMessage('Connected wallet cannot add vault to this profile.');
      } else {
        setErrorMessage('');
      }
    }

    if (web3 && currentVaultEdits.ERC725Address.length === 42 && walletAddress) {
      checkEthAddress();
    }
  }, [currentVaultEdits.ERC725Address, walletAddress]);

  return (
    <div className={`w-min ml-6 ${className}`}>
      <div className="my-4">
        <p className="font-light">{title}</p>
        <p className="font-light text-xs text-gray-400">{info}</p>
      </div>

      <ElementWithTitle
        title={elementTitle}
        passStates={passStates}
        error={errorMessage}
        element={
          <input
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= maxLength) {
                if (recover) {
                  setRecoverInfo({ ...recoverInfo, [paramName]: value });
                } else {
                  setCurrentVaultEdits({ ...currentVaultEdits, [paramName]: value });
                }
              }
            }}
            autoComplete="off"
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
