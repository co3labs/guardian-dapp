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
          <p>
            Connect <span className="hidden md:visible">Wallet</span>{' '}
          </p>,
          <ConnectWallet />,
        ],
        [
          <p>
            Setup <span className="hidden md:visible">Recovery Vault</span>
          </p>,
          <VaultSetup renderFields={fieldsToRender} />,
        ],
        [<p><span className='hidden md:visible'>Add </span>Guardians</p>, <GuardianForm />],
        [<p>Review <span className="hidden md:visible">& Deploy</span></p>, <ReviewChanges />],
      ]}
      title="Create a New Recovery Vault"
    />
  );
}
