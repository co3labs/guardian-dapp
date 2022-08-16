import { useContext } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { GlobalContext } from '../context/GlobalState';

export default function ManageVaultConstructor({ steps, title }: { steps: [string, JSX.Element][]; title: string }) {
  const { currentStep, setCurrentStep } = useContext(GlobalContext);
  return (
    <div className="w-full h-full flex justify-center items-center px-4 md:px-12 lg:px-0 relative z-10">
      <div className="rounded-sm flex flex-col w-full lg:w-2/3 xl:w-1/2 h-full shadow-md bg-white pt-16">
        <div className="p-4 text-2xl">
          <h3>{title}</h3>
        </div>
        <div className="flex flex-col h-full">
          <div className={`grid grid-flow-col w-full rounded-sm shadow-md bg-white`}>
            {steps.map(([title], index) => (
              <div className={`px-2 py-1 relative border-y border-blue-800 overflow-hidden`}>
                <div
                  className={`z-10 relative text-center flex items-center justify-center ${
                    index === currentStep ? 'text-white' : 'text-black'
                  }`}
                >
                  <div className="mr-2">
                    {currentStep > index ? (
                      <BsCheckCircleFill size={22} color={'green'} />
                    ) : (
                      <div
                        className={`text-xs border ${
                          index === currentStep ? 'border-white' : 'border-black'
                        } rounded-full w-5 h-5 flex items-center justify-center`}
                      >
                        {index + 1}
                      </div>
                    )}
                  </div>

                  <span className={`text-center font-light mr-2 `}>{title}</span>
                </div>
                <div
                  className={`absolute top-0 left-0 right-0 bottom-0 transition-all z-0 bg-blue-800 ${
                    index === currentStep
                      ? 'translate-x-0'
                      : index < currentStep
                      ? 'translate-x-full'
                      : '-translate-x-full'
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="h-full flex flex-col justify-between flex-grow">{steps[currentStep][1]}</div>
        </div>
      </div>
    </div>
  );
}
