import { useContext } from 'react';
import { IVaultDeployReceipt } from '../@types/types';
import { GlobalContext, vaultCreatedTopic } from '../context/GlobalState';

export default function useVault() {
  const { setVaultDeploying, recovery } = useContext(GlobalContext);

  const deployVault = async (account: string, walletAddress: string): Promise<[string, IVaultDeployReceipt]> => {
    try {
      setVaultDeploying('loading');
      const vaultDeployReceipt: IVaultDeployReceipt = await recovery?.createRecoveryVault(account, walletAddress);
      console.log('Vault Deployment Receipt: \n', vaultDeployReceipt);

      const vaultEvent = Object.values(vaultDeployReceipt.events).find((data) =>
        data.raw.topics.includes(vaultCreatedTopic)
      );

      if (!vaultEvent) throw new Error('Vault address could not be found in receipt.');
      const newVaultAddress = vaultEvent.address;
      console.log(walletAddress, newVaultAddress, account);
      setVaultDeploying('success');
      return [newVaultAddress, vaultDeployReceipt];
    } catch (error) {
      setVaultDeploying('failed');
      console.error(error);
      throw(error)
    }
  };

  return { deployVault };
}
