import ConnectWallet from '../elements/ConnectWallet';
import GuardianForm from '../elements/GuardianForm';
import ManageVaults from '../elements/ManageVaults';
import ManageVaultConstructor from '../elements/ManageVaultConstructor';
import Setup from '../elements/Setup';
import ReviewChanges from '../elements/ReviewChanges';

export default function MyVaults() {
  return (
    <ManageVaultConstructor
      steps={[
        ['Connect Wallet', <ConnectWallet />],
        ['Vault', <ManageVaults />],
        ['Name', <Setup />],
        ['Guardians', <GuardianForm />],
      ]}
      title="Load an Existing Vault"
    />
  );
}
