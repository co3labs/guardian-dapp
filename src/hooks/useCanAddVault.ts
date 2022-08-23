import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';

/**
 * Returns a boolean state signifying whether the current connected address can add vaults to a up.
 *
 */
export default function useCanAddVault(isERC725:boolean = false) {
  const [canAddVaults, setCanAddVaults] = useState<[boolean, string]>([false, '']);

  const { web3, walletAddress, currentVaultEdits, recovery } = useContext(GlobalContext);

  async function checkVaultAddress() {
    if (!web3 || !walletAddress) return;
    const isAddress = web3.utils.isAddress(currentVaultEdits.ERC725Address);
    let canAddVault;
    try {
      canAddVault = await recovery?.canCreateRecoveryVault(walletAddress, currentVaultEdits.ERC725Address);
      if (!isAddress) {
        setCanAddVaults([false, 'Invalid Eth Address']);
      } else if (!canAddVault) {
        setCanAddVaults([false, 'Connected wallet cannot add Recovery Vaults to this Profile.']);
      } else {
        setCanAddVaults([true, '']);
      }
    } catch (error) {
      if (isERC725) setCanAddVaults([false, 'This is not a vaild UP ERC725 address.']);
    }
  }
  useEffect(() => {
    if (web3 && web3.utils.isAddress(currentVaultEdits.ERC725Address) && walletAddress) {
      checkVaultAddress();
    }
  }, [currentVaultEdits.ERC725Address, walletAddress]);

  return canAddVaults;
}
