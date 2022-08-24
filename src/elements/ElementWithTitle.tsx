import { Dispatch, SetStateAction } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { MoonLoader } from 'react-spinners';

export default function ElementWithTitle({
  title,
  element,
  tailwindColor = 'bg-white',
  passStates,
  parentClasses,
  titleClasses,
  error,
  loading,
}: {
  title: string;
  element: JSX.Element;
  tailwindColor?: string;
  passStates?: { show: boolean; setShow: Dispatch<SetStateAction<boolean>> };
  parentClasses?: string;
  titleClasses?: string;
  error?: string;
  loading?: boolean;
}) {
  return (
    <div className={`relative flex-grow ${parentClasses}`}>
      <div className={`absolute top-0 left-5 -translate-y-1/2 px-1 text-xs text-gray-400`}>
        <div className={`absolute z-10 top-0 bottom-1/2 right-0 left-0 ${tailwindColor} translate-y-2px`} />
        <span className={`relative z-20 ${titleClasses}`}>{title}</span>
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
      {loading ? (
        <div className="bg-white flex text-black p-2 absolute right-2 top-1/2 -translate-y-1/2">
          {<MoonLoader size={16} />}
        </div>
      ) : (
        <></>
      )}
      {<p className="absolute text-xs text-red-400 bottom-0 translate-y-full">{error}</p>}
    </div>
  );
}
