import ConnectWallet from '../elements/ConnectWallet';
import GuardianForm from '../elements/GuardianForm';
import ManageVaultConstructor from '../elements/ManageVaultConstructor';
import NameVault from '../elements/NameVault';
import SelectVault from '../elements/SelectVault';

export default function EditVault() {
  return (
    <ManageVaultConstructor
      steps={[
        ['Connect Wallet', <ConnectWallet />],
        ['Select Vault', <SelectVault />],
        ['Name', <NameVault />],
        ['Guardians', <GuardianForm />],
        ['Review', <></>],
      ]}
      title="Edit Existing Recover Vault"
    />
  );
}
