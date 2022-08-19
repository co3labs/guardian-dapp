import GuardianForm from '../elements/GuardianForm';
import ComponentWrapper from '../elements/ComponentWrapper';
import ConnectWallet from '../elements/ConnectWallet';
import VaultSetup from '../elements/VaultSetup';
import ReviewChanges from '../elements/ReviewChanges';

export default function CreateVault() {
  const fieldsToRender = { name: true, profile: true, secret: true, old: false, processId: false, secretToggle: false };
  return (
    <ComponentWrapper
      steps={[
        ['Connect Wallet', <ConnectWallet />],
        ['Setup Vault', <VaultSetup renderFields={fieldsToRender} />],
        ['Add Guardians', <GuardianForm />],
        ['Review & Deploy', <ReviewChanges />],
      ]}
      title="Create a New Recovery Vault"
    />
  );
}
