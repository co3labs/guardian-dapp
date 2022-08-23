import { useContext } from 'react';
import { getShortId, GlobalContext } from '../context/GlobalState';
import ComponentWrapper from '../elements/ComponentWrapper';
import ConnectWallet from '../elements/ConnectWallet';
import VoteWithId from '../elements/VoteWithId';

export default function Vote() {
  const { selectedVault } = useContext(GlobalContext);

  return (
    <ComponentWrapper
      title={
        <>
          <h2>
            <span>Vote for a new Profile Owner</span>{' '}
            <span className="text-base text-gray-400">
              {'('}
              {getShortId(selectedVault.current.vaultAddress)}
              {')'}
            </span>
          </h2>
          <p className="text-sm text-gray-400 ml-2">
            <span>Profile:</span> <span>{getShortId(selectedVault.current.ERC725Address)}</span>
          </p>
        </>
      }
      steps={[
        ['Connect Wallet', <ConnectWallet back="/app/manage" />],
        ['Vote', <VoteWithId />],
      ]}
    />
  );
}
