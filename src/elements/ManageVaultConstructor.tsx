import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import ManageVaultContainer from './ManageVaultContainer';

export default function ManageVaultConstructor({ steps, title }: { steps: [string, JSX.Element][]; title: string }) {
  const { currentStep, setCurrentStep } = useContext(GlobalContext);
  return (
    <ManageVaultContainer>
      <div className="py-4 text-2xl">
        <h3>{title}</h3>
      </div>
      <div className="">
        <div className={`grid grid-flow-col w-full rounded-sm shadow-md bg-white`}>
          {steps.map(([title], index) => (
            <h4
              className={`px-2 py-1 bg ${index === currentStep ? 'bg-blue-100' : 'bg-blue-50'} ${
                index !== 0 ? 'border-l-[1px] border-blue-100' : ''
              }`}
            >
              {title}
            </h4>
          ))}
        </div>

        {steps[currentStep][1]}
      </div>
    </ManageVaultContainer>
  );
}
