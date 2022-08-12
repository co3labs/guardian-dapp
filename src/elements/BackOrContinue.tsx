import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

export default function BackOrContinueBtns({
  back,
  skip,
  conditionNext = true,
  formSubmit = false,
  last = false
}: {
  back?: string;
  skip?: 1 | 2;
  conditionNext?: boolean;
  formSubmit?: boolean;
  last?:boolean
}) {
  const {setCurrentStep, currentStep } = useContext(GlobalContext);

  return (
    <div className="flex mt-4">
      {back && skip !== 1 ? (
        <Link to={back} className="btn btnSmall btnSecondary">
          Cancel
        </Link>
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
          type={formSubmit ? 'submit' : 'button'}
          onClick={() => {
            if (conditionNext) setCurrentStep(currentStep + 1);
          }}
          className={`btn btnSmall ${conditionNext ? 'btnPrimary' : 'bg-gray-200 opacity-25'} w-min `}
        >
          {last? "Confirm" : "Continue"}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
