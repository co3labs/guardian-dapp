import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useQuery } from '@tanstack/react-query';
import { MoonLoader } from 'react-spinners';
export default function ListProcessIds() {
  const { recovery, selectedVault } = useContext(GlobalContext);
  const { data: ids, isLoading: idsLoading } = useQuery([`process_ids_${selectedVault.current.vaultAddress}`], () =>
    recovery?.getRecoverProcessesIds(selectedVault.current.vaultAddress)
  );

  // const guardians = await recovery?.getGuardians(selectedVault.current.vaultAddress);
  // const account = await recovery?.getAccount(selectedVault.current.vaultAddress);
  // console.log('ids', ids, 'guardians', guardians, account);

  return (
    <div className="px-6 py-4">
      <p>Current Process Ids</p>
      <div className="w-1/2 h-1px bg-gray-400" />
      {idsLoading ? (
        <div className="w-full flex justify-center mt-6">
          {' '}
          <MoonLoader size={16} />{' '}
        </div>
      ) : (
        <></>
      )}
      {ids ? ids.map((id) => <p className='my-2'>{id}</p>) : <></>}
      {ids && ids.length == 0 ? (
        <div className="w-full p-6 border rounded-sm text-center text-gray-400 my-2">No Process Ids</div>
      ) : (
        <></>
      )}
    </div>
  );
}
