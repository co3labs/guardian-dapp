import ComponentWrapper from '../elements/ComponentWrapper';
import ConnectWallet from '../elements/ConnectWallet';
import GuardianForm from '../elements/GuardianForm';
import ReviewChanges from '../elements/ReviewChanges';
import VaultSetup from '../elements/VaultSetup';

export default function EditVault() {
  const fieldsToRender = { name: true, profile: false, secret: true, old: false, processId:false, secretToggle:true};
  return (
    <ComponentWrapper
      steps={[
        ['Connect Wallet', <ConnectWallet back='/app/manage' />],
        ['Name & Secret', <VaultSetup renderFields={fieldsToRender} />],
        ['Guardians', <GuardianForm />],
        ['Review & Update', <ReviewChanges />],
      ]}
      title="Update Your Recovery Vault"
    />
  );
}
