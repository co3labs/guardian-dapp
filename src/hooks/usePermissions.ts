import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function usePermissions() {
  const { setPermissionsUpdating, erc725Utils } = useContext(GlobalContext);

  const addPermissions = async (walletAddress: string, vaultAddress: string, account: string): Promise<string> => {
    setPermissionsUpdating(true);
    const addPermissionReceipt = await erc725Utils?.grantAddPermissions(walletAddress, vaultAddress, account);
    setPermissionsUpdating(false);
    console.log('Add Permission Receipt: \n', addPermissionReceipt);
    return addPermissionReceipt;
  };

  const checkPermissions = (vaultAddress: string, account: string) => erc725Utils?.canAddPermissions(vaultAddress, account);

  return { checkPermissions, addPermissions };
}
