import { useContext } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

export default function BackOrContinueBtns({
  back,
  skip,
  conditionNext = true,
  confirmText,
  onClick,
  exitBtn,
}: {
  back?: string;
  skip?: 1 | 2;
  conditionNext?: boolean;
  confirmText: string;
  onClick?: Function;
  exitBtn?: boolean;
}) {
  const { setCurrentStep, currentStep } = useContext(GlobalContext);

  return (
    <div className="flex m-4 justify-between">
      <div className='flex'>
        {back && skip !== 1 ? (
          <Link to={back} className="h-full flex items-center btn btnSmall btnSecondary mr-4">
            Cancel
          </Link>
        ) : (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className={`btn btnSmall btnSecondary w-min font-bold`}
            type="button"
          >
            <BsChevronLeft/>
          </button>
        )}

        {exitBtn ? (
          <Link to={'/app/welcome'} className="h-full flex items-center btn btnSmall btnSecondary">
            Exit
          </Link>
        ) : (
          <></>
        )}
      </div>

      {skip !== 2 ? (
        <button
          type="button"
          onClick={() => {
            if (onClick) {
              onClick();
            } else if (conditionNext) setCurrentStep(currentStep + 1);
          }}
          className={`btn btnSmall ${conditionNext ? 'btnPrimary' : 'bg-gray-200 opacity-25'} w-min transition-colors`}
        >
          {confirmText}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
