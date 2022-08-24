import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Web3 from 'web3';

export default function useSetPermissions() {
  const { setPermissionsUpdating, erc725Utils } = useContext(GlobalContext);

  const addPermissions = async (
    walletAddress: string,
    vaultAddress: string,
    account: string
  ): Promise<string | void> => {
    try {
      setPermissionsUpdating('loading');
      const addPermissionReceipt = await erc725Utils?.grantAddPermissions(walletAddress, vaultAddress, account);
      setPermissionsUpdating('success');
      console.log('Add Permission Receipt: \n', addPermissionReceipt);
      return addPermissionReceipt;
    } catch (error) {
      console.error(error);
      setPermissionsUpdating('failed');
      throw error;
    }
  };

  const checkPermissions = (vaultAddress: string, account: string) =>
    erc725Utils?.canAddPermissions(vaultAddress, account);

  return { checkPermissions, addPermissions };
}

const checkEthAddy = (web3: Web3, address: string) => web3.utils.isAddress(address);

/**
 * Checks wetherthe current wallet can add vaults to an ERC725 contract
 * @param isERC725 If provided and the function catches an error, it will set the
 * string in the response to 'This is not a valid UP ERC725 address'
 * @returns An array containing [
 * boolean (whether the connected wallet can add vaults)
 * string (an error message if the user cannot add vaults)
 * boolean (a loading state)
 * ]
 */
export function useCheckAddVault(isERC725: boolean = false): [boolean, string, boolean] {
  const [canAddVaults, setCanAddVaults] = useState<[boolean, string]>([true, '']);
  const [loading, setLoading] = useState(false);

  const { web3, walletAddress, currentVaultEdits, recovery } = useContext(GlobalContext);

  async function checkVaultAddress() {
    if (!web3 || !walletAddress) return;
    setLoading(true);
    const isAddress = checkEthAddy(web3, currentVaultEdits.ERC725Address);
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
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (web3 && web3.utils.isAddress(currentVaultEdits.ERC725Address) && walletAddress) {
      checkVaultAddress();
    }
  }, [currentVaultEdits.ERC725Address, walletAddress]);

  return [...canAddVaults, loading];
}

/**
 * Checks wether the current wallet can vote.
 *
 * @returns An array containing [
 * boolean (whether the connected wallet can vode)
 * string (an error message if the user cannot vote)
 * boolean (a loading state)
 * ]
 */
export function useCheckUserCanVote(): [boolean, string, boolean] {
  const [canVote, setCanVote] = useState<[boolean, string]>([true, '']);
  const [loading, setLoading] = useState(false);

  const { walletAddress, recovery, selectedVault } = useContext(GlobalContext);

  async function checkUserCanVote() {
    if (recovery && walletAddress) {
      try {
        setLoading(true);
        const isAGuardian = await recovery.isGuardian(selectedVault.current.vaultAddress, walletAddress);
        if (!isAGuardian) {
          setCanVote([
            false,
            'Current connected wallet is not a guardian of this vault. Only guardians can vote to recover.',
          ]);
        } else {
          setCanVote([true, '']);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    checkUserCanVote();
  }, [walletAddress, selectedVault.current.vaultAddress]);

  return [...canVote, loading];
}

export function useCheckNewOwner(): [boolean, string, boolean] {
  const [canBeNewOwner, setCanBeNewOwner] = useState<[boolean, string]>([true, '']);
  const [loading, setLoading] = useState(false);

  const { selectedVault, recovery, recoverInfo, web3 } = useContext(GlobalContext);

  async function checkCanBeNewOwner() {
    if (web3 && recovery && recoverInfo.newOwner) {
      try {
        setLoading(true)
        const isAddress = checkEthAddy(web3, recoverInfo.newOwner);
        if (!isAddress) {
          setCanBeNewOwner([false, 'Invalid Eth Address']);
          return;
        }

        const isCurrentController = await recovery.canCreateRecoveryVault(
          recoverInfo.newOwner,
          selectedVault.current.ERC725Address
        );
        if (isCurrentController) {
          setCanBeNewOwner([false, 'Cannot vote for current controller.']);
          return;
        }

        setCanBeNewOwner([true, '']);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    checkCanBeNewOwner();
  }, [recoverInfo.newOwner, selectedVault.current.ERC725Address]);

  return [...canBeNewOwner, loading];
}
