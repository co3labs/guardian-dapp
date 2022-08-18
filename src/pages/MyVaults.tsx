import ConnectWallet from '../elements/ConnectWallet';
import GuardianForm from '../elements/GuardianForm';
import ManageVaults from '../elements/ManageVaults';
import ComponentWrapper from '../elements/ComponentWrapper';
import VaultSetup from '../elements/VaultSetup';
import ReviewChanges from '../elements/ReviewChanges';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function MyVaults() {
  const { setCurrentStep, currentStep } = useContext(GlobalContext);
  useEffect(() => {
    setCurrentStep(0);
  }, []);

  if (currentStep === 0)
    return <ComponentWrapper steps={[['', <ManageVaults />]]} title="Manage Your Existing Vaults" />;
  return <></>;
}
