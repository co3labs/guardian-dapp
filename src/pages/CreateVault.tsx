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
        [
          <p className="flex items-center">
            Connect <span className="ml-1 hidden md:block">Wallet</span>{' '}
          </p>,
          <ConnectWallet />,
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
      title="Create a New Recovery Vault"
    />
  );
}
