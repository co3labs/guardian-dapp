import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function useThreshold() {
  const { setThresholdUpdating, recovery, currentVaultEdits } = useContext(GlobalContext);

  const setThreshold = async (vaultAddress: string, account: string, walletAddress: string) => {
    setThresholdUpdating(true);
    const setThresholdReceipt = await recovery?.setThreshold(
      currentVaultEdits.threshold,
      vaultAddress,
      account,
      walletAddress
    );
    setThresholdUpdating(false);

    console.log('Set threshold Receipt: \n', setThresholdReceipt);
  };

  return { setThreshold };
}
