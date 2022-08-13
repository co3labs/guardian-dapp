import ConnectWallet from '../elements/ConnectWallet';
import GuardianForm from '../elements/GuardianForm';
import ImportVault from '../elements/ImportVault';
import ManageVaultConstructor from '../elements/ManageVaultConstructor';
import NameVault from '../elements/NameVault';
import ReviewChanges from '../elements/ReviewChanges';

export default function LoadVault() {
  return (
    <ManageVaultConstructor
      steps={[
        ['Connect Wallet', <ConnectWallet />],
        ['Vault', <ImportVault />],
        ['Name', <NameVault />],
        ['Guardians', <GuardianForm />],
        ['Review', <ReviewChanges />],
      ]}
      title="Load an Existing Vault"
    />
  );
}
