import { MouseEventHandler, useContext } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { GlobalContext } from '../context/GlobalState';

export default function BackOrContinueBtns({
  back,
  skip = [],
  conditionNext = true,
  confirmText,
  onNextClick,
  exitBtn,
  backText,
  onBackClick,
  confirmLoading,
}: {
  back?: string;
  skip?: number[];
  conditionNext?: boolean;
  confirmText?: string | JSX.Element;
  confirmLoading?: boolean;
  backText?: string | JSX.Element;
  onNextClick?: Function;
  exitBtn?: boolean;
  onBackClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
}) {
  const { setCurrentStep, currentStep } = useContext(GlobalContext);

  return (
    <div className="flex  m-4 justify-between">
      <div className="flex w-min">
        {back && skip && !skip.includes(1) ? (
          <Link to={back} onClick={onBackClick} className="h-full flex items-center btn btnSmall btnSecondary mr-4">
            {backText || 'Cancel'}
          </Link>
        ) : (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className={`btn btnSmall btnSecondary w-min font-bold`}
            type="button"
          >
            <BsChevronLeft />
          </button>
        )}

        {exitBtn ? (
          <Link to={'/app/welcome'} className="flex items-center btn btnSmall btnSecondary">
            Exit
          </Link>
        ) : (
          <></>
        )}
      </div>

      {skip && !skip.includes(2) ? (
        <div className="flex items-center">
          {confirmLoading ? (
            <div className="flex">
              <MoonLoader size={24} speedMultiplier={0.8} />
            </div>
          ) : (
            <></>
          )}

          <button
            type="button"
            onClick={() => {
              if (onNextClick) {
                onNextClick();
              } else if (conditionNext) {
                setCurrentStep(currentStep + 1);
              }
            }}
            disabled={!conditionNext}
            className={`btn btnSmall ${
              conditionNext ? 'btnPrimary' : 'bg-gray-200 opacity-25 cursor-not-allowed'
            } w-min transition-colors`}
          >
            {confirmText}
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
