import ComponentWrapper from '../elements/ComponentWrapper';
import ConnectWallet from '../elements/ConnectWallet';
import GuardianForm from '../elements/GuardianForm';
import ReviewChanges from '../elements/ReviewChanges';
import VaultSetup from '../elements/VaultSetup';

export default function EditVault() {
  const fieldsToRender = { name: true, profile: false, secret: true, old: false, processId: false, secretToggle: true };
  return (
    <ComponentWrapper
      steps={[
        [
          <p className="flex items-center">
            Connect <span className="ml-1 hidden md:block">Wallet</span>{' '}
          </p>,
          <ConnectWallet back="/app/manage" />,
        ],
        [
          <p className="flex items-center">
            Setup <span className="ml-1 hidden md:block">Recovery Vault</span>
          </p>,
          <VaultSetup renderFields={fieldsToRender} />,
        ],
        [
          <p className="flex items-center">
            <span className="mr-1 hidden md:block">Add </span>Guardians
          </p>,
          <GuardianForm />,
        ],
        [
          <p className="flex items-center">
            Review <span className="ml-1 hidden md:block">& Deploy</span>
          </p>,
          <ReviewChanges />,
        ],
      ]}
      title="Update Your Recovery Vault"
    />
  );
}
