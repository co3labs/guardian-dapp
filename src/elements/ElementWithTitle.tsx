import { Dispatch, SetStateAction } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

export default function ElementWithTitle({
  title,
  element,
  tailwindColor = 'bg-white',
  passStates,
}: {
  title: string;
  element: JSX.Element;
  tailwindColor?: string;
  passStates?: { show: boolean; setShow: Dispatch<SetStateAction<boolean>> };
}) {
  return (
    <div className="relative flex-grow">
      <div className={`absolute top-0 left-5 -translate-y-1/2 px-1 text-xs text-gray-400`}>
        <div className={`absolute z-10 top-0 bottom-1/2 right-0 left-0 ${tailwindColor} translate-y-2px`} />
        <span className="relative z-20">{title}</span>
      </div>
      {element}
      {passStates ? (
        <button
          className="btnSecondary text-black p-2 absolute right-2 top-1/2 -translate-y-1/2"
          onClick={() => {
            passStates.setShow(!passStates.show);
          }}
        >
          {passStates.show ? <BsEye /> : <BsEyeSlash />}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
