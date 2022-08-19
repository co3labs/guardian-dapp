import { useContext } from 'react';
import { getShortId, GlobalContext } from '../context/GlobalState';
import ComponentWrapper from '../elements/ComponentWrapper';
import ConnectWallet from '../elements/ConnectWallet';
import RecoverOwnerShip from '../elements/RecoverOwnership';
import VaultSetup from '../elements/VaultSetup';
import VoteWithId from '../elements/VoteWithId';

export default function Recover() {
  const { currentVaultEdits } = useContext(GlobalContext);
  const fieldsToRender = { name: false, profile: false, secret: true, old:true, processId:true };
  return (
    <ComponentWrapper
      title={
        <p>
          Recover {currentVaultEdits.vaultName}
          <span className="text-gray-400 ml-4 text-sm">
            {'('}
            {getShortId(currentVaultEdits.vaultAddress)}
            {')'}
          </span>
        </p>
      }
      steps={[
        ['Connect Wallet', <ConnectWallet back="/app/manage" />],
        ['Recover Vault', <RecoverOwnerShip />],
      ]}
    />
  );
}
