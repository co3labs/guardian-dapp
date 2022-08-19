import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function usePermissions() {
  const { setPermissionsUpdating, erc725Utils } = useContext(GlobalContext);

  const addPermissions = async (walletAddress: string, vaultAddress: string, account: string): Promise<string | void> => {
    try {
      setPermissionsUpdating('loading');
      const addPermissionReceipt = await erc725Utils?.grantAddPermissions(walletAddress, vaultAddress, account);
      setPermissionsUpdating('success');
      console.log('Add Permission Receipt: \n', addPermissionReceipt);
      return addPermissionReceipt;
    } catch (error) {
      console.error(error);
      setPermissionsUpdating('failed');
      throw(error)
    }
  };

  const checkPermissions = (vaultAddress: string, account: string) =>
    erc725Utils?.canAddPermissions(vaultAddress, account);

  return { checkPermissions, addPermissions };
}
