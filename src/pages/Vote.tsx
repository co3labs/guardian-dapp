import ComponentWrapper from '../elements/ComponentWrapper';
import ConnectWallet from '../elements/ConnectWallet';
import VoteWithId from '../elements/VoteWithId';

export default function Vote() {

  return (
    <ComponentWrapper
      title={
        "Vote For a New Owner"
      }
      steps={[
        ['Connect Wallet', <ConnectWallet back="/app/manage" />],
        ['Vote', <VoteWithId />],
      ]}
    />
  );
}
