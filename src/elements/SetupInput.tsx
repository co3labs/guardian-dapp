import { Dispatch, SetStateAction, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import ElementWithTitle from './ElementWithTitle';

export default function SetupInput({
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
}) {
  const { currentVaultEdits, setCurrentVaultEdits, recoverInfo, setRecoverInfo } = useContext(GlobalContext);

  return (
    <div className={`w-min ml-6 ${className}`}>
      <div className="my-4">
        <p className="font-light">{title}</p>
        <p className="font-light text-xs text-gray-400">{info}</p>
      </div>

      <ElementWithTitle
        title={elementTitle}
        passStates={passStates}
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
