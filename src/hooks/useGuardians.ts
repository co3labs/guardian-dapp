import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function useGuardians() {
  const { setGuardiangsLoading, recovery, currentVaultEdits } = useContext(GlobalContext);

  const updateGuardians = async (vaultAddress: string, account: string, walletAddress: string) => {
    setGuardiangsLoading(true);
    const guardianReceipts: { [id: string]: any } = {};

    for (const [id, guardian] of Object.entries(currentVaultEdits.guardianList)) {
      const guardianReceipt = await recovery?.addGuardian(vaultAddress, guardian.address, account, walletAddress);

      console.log('Guardian Receipt:\n', guardianReceipt);
      guardianReceipts[id] = guardianReceipt;
    }
    setGuardiangsLoading(false);
  };

  return { updateGuardians };
}
