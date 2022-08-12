import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

export default function BackOrContinueBtns({
  back,
  skip,
  conditionNext = true,
  last = false,
  onClick,
}: {
  back?: string;
  skip?: 1 | 2;
  conditionNext?: boolean;
  last?: boolean;
  onClick?: Function;
}) {
  const { setCurrentStep, currentStep } = useContext(GlobalContext);

  return (
    <div className="flex m-4 justify-between">
      {back && skip !== 1 ? (
        <div className="h-full flex items-center btn btnSmall btnSecondary">
          <Link to={back}>Cancel</Link>
        </div>
      ) : (
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          className={`btn btnSmall btnSecondary w-min `}
          type="button"
        >
          Back
        </button>
      )}

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
          {last ? 'Confirm' : 'Continue'}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
