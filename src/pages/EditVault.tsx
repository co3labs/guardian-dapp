import ConnectWallet from '../elements/ConnectWallet';
import GuardianForm from '../elements/GuardianForm';
import ManageVaultConstructor from '../elements/ManageVaultConstructor';
import NameVault from '../elements/NameVault';
import ReviewChanges from '../elements/ReviewChanges';
import SelectVault from '../elements/SelectVault';

export default function EditVault() {
  return (
    <ManageVaultConstructor
      steps={[
        ['Connect Wallet', <ConnectWallet />],
        ['Name', <NameVault />],
        ['Guardians', <GuardianForm />],
        ['Review', <ReviewChanges/>],
      ]}
      title="Edit Existing Recover Vault"
    />
  );
}
