import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function useThreshold() {
  const { setThresholdUpdating, recovery, currentVaultEdits } = useContext(GlobalContext);

  const setThreshold = async (vaultAddress: string, account: string, walletAddress: string) => {
    try {
      setThresholdUpdating('loading');
      const setThresholdReceipt = await recovery?.setThreshold(
        currentVaultEdits.threshold,
        vaultAddress,
        account,
        walletAddress
      );
      setThresholdUpdating('success');

      console.log('Set threshold Receipt: \n', setThresholdReceipt);
    } catch (error) {
      console.error(error);
      setThresholdUpdating('failed');
    }
  };

  return { setThreshold };
}
