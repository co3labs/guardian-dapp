import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function useSecret() {
  const { setSecretUpdating, recovery, currentVaultEdits } = useContext(GlobalContext);
  const setSecret = async (vaultAddress: string, account: string, walletAddress: string) => {
    setSecretUpdating(true);
    const addSecretReceipt = await recovery?.setSecret(
      currentVaultEdits.newSecret,
      vaultAddress,
      account,
      walletAddress
    );
    setSecretUpdating(false);

    console.log('Set Secret Receipt:\n', addSecretReceipt);
  };

  return { setSecret };
}
