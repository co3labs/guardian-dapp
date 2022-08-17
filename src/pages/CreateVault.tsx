import GuardianForm from '../elements/GuardianForm';
import ManageVaultConstructor from '../elements/ManageVaultConstructor';
import ConnectWallet from '../elements/ConnectWallet';
import Setup from '../elements/Setup';
import ReviewChanges from '../elements/ReviewChanges';

export default function CreateVault() {
  return (
    <ManageVaultConstructor
      steps={[
        ['Connect Wallet', <ConnectWallet />],
        ['Setup Vault', <Setup />],
        ['Add Guardians', <GuardianForm />],
        ['Review & Deploy', <ReviewChanges />],
      ]}
      title="Create a New Recovery Vault"
    />
  );
}
