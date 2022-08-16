import ConnectWallet from '../elements/ConnectWallet';
import GuardianForm from '../elements/GuardianForm';
import SelectOrImport from '../elements/SelectOrImport';
import ManageVaultConstructor from '../elements/ManageVaultConstructor';
import NameVault from '../elements/NameVault';
import ReviewChanges from '../elements/ReviewChanges';

export default function MyVaults() {
  return (
    <ManageVaultConstructor
      steps={[
        ['Connect Wallet', <ConnectWallet />],
        ['Vault', <SelectOrImport />],
        ['Name', <NameVault />],
        ['Guardians', <GuardianForm />],
      ]}
      title="Load an Existing Vault"
    />
  );
}
