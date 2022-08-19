import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function useGuardians() {
  const { setAddGuardiansLoading, setRemoveGuardiansLoading, recovery, currentVaultEdits, selectedVault } =
    useContext(GlobalContext);

  const updateGuardians = async (vaultAddress: string, account: string, walletAddress: string) => {
    const guardianReceipts: { [id: string]: any } = {};

    const currentGuardiansArray = Object.values(selectedVault.current.guardianList).map((guardian) => guardian.address);

    for (const [id, guardian] of Object.entries(currentVaultEdits.guardianList)) {
      if (!currentGuardiansArray.includes(guardian.address)) {
        let guardianReceipt;
        if (guardian.action === 'remove') {
          try {
            setRemoveGuardiansLoading('loading');
            await recovery?.removeGuardian(guardian.address, vaultAddress, account, walletAddress);
            setRemoveGuardiansLoading('success');
          } catch (error) {
            console.error(error);
            setRemoveGuardiansLoading('failed');
          }
        } else {
          try {
            setAddGuardiansLoading('loading');
            await recovery?.addGuardian(vaultAddress, guardian.address, account, walletAddress);
            setAddGuardiansLoading('success');
          } catch (error) {
            setAddGuardiansLoading('failed');
            throw error;
          }
        }
        console.log('Guardian Receipt:\n', guardianReceipt);
        guardianReceipts[id] = guardianReceipt;
      }
    }
  };

  return { updateGuardians };
}
