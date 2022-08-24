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
  isERC725,
  error,
  loading,
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
  isERC725?: boolean;
  error?: string;
  loading?: boolean;
}) {
  const { currentVaultEdits, setCurrentVaultEdits, recoverInfo, setRecoverInfo, web3, recovery, walletAddress } =
    useContext(GlobalContext);
  const [errorMessage, setErrorMessage] = useState('');

  //For misc error messaged passed to this component
  useEffect(() => {
    if (error || error === '') setErrorMessage(error);
  }, [error]);

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
        loading={loading}
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
