import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function useGuardians() {
  const { setAddGuardiansLoading, setRemoveGuardiansLoading, recovery, selectedVault } = useContext(GlobalContext);

  const updateGuardians = async (
    list: string[],
    action: 'add' | 'remove',
    vaultAddress: string,
    account: string,
    walletAddress: string
  ) => {
    const guardianReceipts: { [id: string]: any } = {};

    for (let i = 0; i < list.length; i++) {
      let address = list[i];
      let guardianReceipt;
      if (action === 'remove') {
        try {
          setRemoveGuardiansLoading('loading');
          console.log(
            "removeGuardin params in the order they're passed\n",
            address,
            '<-- address to remove',
            vaultAddress,
            '<-- vaultAddress',
            account,
            '<-- account',
            walletAddress,
            '<-- wallet address connected to dapp'
          );
          const threshold = await recovery?.getGuardiansThreshold(vaultAddress);
          const guardians = await recovery?.getGuardians(vaultAddress);
          if (threshold && guardians && threshold < guardians.length) {
            await recovery?.removeGuardian(address, vaultAddress, account, walletAddress);
          } else {
            throw new Error ("Cannot set threshold less than the amount of guardians.")
          }
          setRemoveGuardiansLoading('success');
        } catch (error) {
          setRemoveGuardiansLoading('failed');
          throw error;
        }
      } else {
        try {
          setAddGuardiansLoading('loading');
          await recovery?.addGuardian(vaultAddress, address, account, walletAddress);
          console.log(
            "addGuardian params in the order they're passed\n",
            vaultAddress,
            '<-- vaultAddress',
            address,
            '<-- address to add',
            account,
            '<-- account',
            walletAddress,
            '<-- wallet address connected to dapp'
          );
          setAddGuardiansLoading('success');
        } catch (error) {
          setAddGuardiansLoading('failed');
          throw error;
        }
      }
      console.log('Guardian Receipt:\n', guardianReceipt);
      guardianReceipts[i] = guardianReceipt;
    }

    return guardianReceipts;
  };

  return { updateGuardians };
}
