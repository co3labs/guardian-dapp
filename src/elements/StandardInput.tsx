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
  erc725states,
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
  erc725states?: { isValid: boolean; setIsValid: Dispatch<SetStateAction<boolean>> };
}) {
  const { currentVaultEdits, setCurrentVaultEdits, recoverInfo, setRecoverInfo, web3, recovery, walletAddress } =
    useContext(GlobalContext);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!erc725states) return;
    const { setIsValid } = erc725states;
    async function checkEthAddress() {
      if (!web3 || !walletAddress) return;
      const isAddress = web3.utils.isAddress(currentVaultEdits.ERC725Address);
      let canAddVault;
      try {
        canAddVault = await recovery?.canCreateRecoveryVault(walletAddress, currentVaultEdits.ERC725Address);
        if (!isAddress) {
          setErrorMessage('Invalid Eth Address');
          setIsValid(false);
        } else if (!canAddVault) {
          setErrorMessage('Connected wallet cannot add vault to this profile.');
          setIsValid(false);
        } else {
          setErrorMessage('');
          setIsValid(true);
        }
      } catch (error) {
        setErrorMessage('This is not a valid ERC725 address.');
        setIsValid(false);
      }
    }

    if (web3 && currentVaultEdits.ERC725Address.length === 42 && walletAddress) {
      checkEthAddress();
    }
  }, [currentVaultEdits.ERC725Address, walletAddress]);

  return (
    <div className={`px-6 ${className}`}>
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
