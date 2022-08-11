import { useState } from 'react';
import ManageVaultContainer from './ManageVaultContainer';

export default function ManageVaultConstructor({ steps, title }: { steps: [string, JSX.Element][]; title: string }) {
  const [currentStep, setCurrentStep] = useState(0);


  return (
    <ManageVaultContainer>
      <div className="p-4">
        <h3>{title}</h3>
      </div>
      <div className="shadow-lg bg-white ">
        <div className="grid grid-flow-col w-full">
          {steps.map(([title], index) => (
            <button className='px-2 py-1' onClick={()=> setCurrentStep(index)}>
              <h4>{title}</h4>
            </button>
          ))}
        </div>

        {steps[currentStep][1]}
      </div>
    </ManageVaultContainer>
  );
}
