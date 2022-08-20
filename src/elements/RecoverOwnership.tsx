import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import ListProcessIds from './ProcessIdList';
import RecoverIdInput from './RecoveryIdInput';
import StandardInput from './StandardInput';
import UpdateSecretFields from './UpdateSecretFields';

export default function RecoverOwnerShip() {
  const { recoverInfo, recovery, currentVaultEdits, walletAddress } = useContext(GlobalContext);

  

  return (
    <>
      <div className="w-full flex">
        <div className="w-1/2">
          <ListProcessIds />
        </div>
        <div className="w-1/2">
          <RecoverIdInput />
          <UpdateSecretFields renderFields={{ old: true, secret: true, updateSecret: true }} />
        </div>
      </div>
      <BackOrContinueBtns
        back="/app/manage"
        backText={'My Vaults'}
        exitBtn={true}
        conditionNext={!!recoverInfo}
        confirmText="Recover Ownership"
        onNextClick={() => {
          if (walletAddress)
            recovery?.recoverOwnership(
              currentVaultEdits.vaultAddress,
              currentVaultEdits.ERC725Address,
              recoverInfo.recoveryProcessId,
              currentVaultEdits.oldSecret,
              currentVaultEdits.newSecret,
              walletAddress
            );
        }}
      />{' '}
    </>
  );
}
