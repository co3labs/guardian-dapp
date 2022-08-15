import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import ConnectWallet from '../elements/ConnectWallet';
import GuardianForm from '../elements/GuardianForm';
import ManageVaultConstructor from '../elements/ManageVaultConstructor';
import NameVault from '../elements/NameVault';
import ReviewChanges from '../elements/ReviewChanges';

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
