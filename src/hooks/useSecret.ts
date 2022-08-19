import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function useSecret() {
  const { setSecretUpdating, recovery, currentVaultEdits } = useContext(GlobalContext);
  const setSecret = async (vaultAddress: string, account: string, walletAddress: string) => {
    try {
      setSecretUpdating('loading');
      const addSecretReceipt = await recovery?.setSecret(
        currentVaultEdits.newSecret,
        vaultAddress,
        account,
        walletAddress
      );
      setSecretUpdating('success');

      console.log('Set Secret Receipt:\n', addSecretReceipt);
    } catch (error) {
      console.error(error);
      setSecretUpdating('failed');
      throw(error)

    }
  };

  return { setSecret };
}
