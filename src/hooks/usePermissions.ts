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
 * Returns a boolean state signifying whether the current connected address can add vaults to a up.
 *
 */
export function useCheckAddVault(isERC725: boolean = false) {
  const [canAddVaults, setCanAddVaults] = useState<[boolean, string]>([false, '']);

  const { web3, walletAddress, currentVaultEdits, recovery } = useContext(GlobalContext);

  async function checkVaultAddress() {
    if (!web3 || !walletAddress) return;
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
    }
  }
  useEffect(() => {
    if (web3 && web3.utils.isAddress(currentVaultEdits.ERC725Address) && walletAddress) {
      checkVaultAddress();
    }
  }, [currentVaultEdits.ERC725Address, walletAddress]);

  return canAddVaults;
}

export function useCheckUserCanVote() {
  const [canVote, setCanVote] = useState<[boolean, string]>([true, '']);
  const { walletAddress, recovery, selectedVault } = useContext(GlobalContext);

  async function checkUserCanVote() {
    if (recovery && walletAddress) {
      const isAGuardian = await recovery.isGuardian(selectedVault.current.vaultAddress, walletAddress);
      if (!isAGuardian) {
        setCanVote([false, 'Current connected wallet can not vote.']);
      } else {
        setCanVote([true, '']);
      }
    }
  }

  useEffect(() => {
    checkUserCanVote();
  }, [walletAddress, selectedVault.current.vaultAddress]);

  return canVote;
}

export function useCheckNewOwner() {
  const [canBeNewOwner, setCanBeNewOwner] = useState<[boolean, string]>([true, '']);
  const { selectedVault, recovery, recoverInfo, web3 } = useContext(GlobalContext);

  async function checkCanBeNewOwner() {
    if (web3 && recovery && recoverInfo.newOwner) {
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
    }
  }

  useEffect(() => {
    checkCanBeNewOwner();
  }, [recoverInfo.newOwner, selectedVault.current.ERC725Address]);

  return canBeNewOwner;
}
