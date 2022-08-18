import ConnectWallet from '../elements/ConnectWallet';
import GuardianForm from '../elements/GuardianForm';
import ManageVaults from '../elements/ManageVaults';
import ComponentWrapper from '../elements/ComponentWrapper';
import VaultSetup from '../elements/VaultSetup';
import ReviewChanges from '../elements/ReviewChanges';

export default function MyVaults() {
  return (
    <ComponentWrapper
      steps={[
        ["",<ManageVaults />],
      ]}
      title="Manage Your Existing Vaults"
    />
  );
}
