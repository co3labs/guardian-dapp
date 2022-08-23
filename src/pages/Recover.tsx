import { useContext } from 'react';
import { getShortId, GlobalContext } from '../context/GlobalState';
import ComponentWrapper from '../elements/ComponentWrapper';
import ConnectWallet from '../elements/ConnectWallet';
import RecoverOwnerShip from '../elements/RecoverOwnership';
import VaultSetup from '../elements/VaultSetup';
import VoteWithId from '../elements/VoteWithId';

export default function Recover() {
  const { selectedVault } = useContext(GlobalContext);

  return (
    <ComponentWrapper
      title={
        <>
          <h2>
            Recover {selectedVault.current.vaultName}
            <span className="text-gray-400 ml-4 text-sm">
              {'('}
              {getShortId(selectedVault.current.vaultAddress)}
              {')'}
            </span>
          </h2>
          <p className="text-gray-400 text-sm ml-2">Profile: {getShortId(selectedVault.current.ERC725Address)}</p>
        </>
      }
      steps={[
        ['Connect Wallet', <ConnectWallet back="/app/manage" />],
        ['Recover Vault', <RecoverOwnerShip />],
      ]}
    />
  );
}
