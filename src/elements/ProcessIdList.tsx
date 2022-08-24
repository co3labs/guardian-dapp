import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useQuery } from '@tanstack/react-query';
import { MoonLoader } from 'react-spinners';
export default function ListProcessIds() {
  const { recovery, selectedVault, setRecoverInfo, recoverInfo } = useContext(GlobalContext);
  const { data: ids, isLoading: idsLoading } = useQuery([`process_ids_${selectedVault.current.vaultAddress}`], () =>
    recovery?.getRecoverProcessesIds(selectedVault.current.vaultAddress)
  );

  interface IVoteTotals {
    [id: string]: number;
  }

  const [processIdVotes, setProcessIdVotes] = useState<IVoteTotals>({});

  const getTotals = async (ids: string[]) => {
    const totals: IVoteTotals = {};
    for (let i = 0; i < ids.length; i++) {
      const currId = ids[i];
      const totalVotes = await recovery?.getTotalVotes(selectedVault.current.vaultAddress, currId);
      if (totalVotes) totals[currId] = totalVotes;
    }
    return totals;
  };

  useEffect(() => {
    if (ids)
      getTotals(ids).then((res) => {
        console.log("Vote totals: ", res)
        setProcessIdVotes(res);
      });
  }, [ids]);

  return (
    <div className="px-6 py-4 flex flex-col justify-start">
      <p>Current Recovery Processes</p>
      <div className="w-full my-2 h-1px bg-gray-200 " />
      {idsLoading ? (
        <div className="w-full flex justify-center mt-6">
          <MoonLoader size={16} />
        </div>
      ) : (
        <></>
      )}
      {processIdVotes && ids ? (
        ids.map((id) => (
          <div className="w-1/2 flex items-center justify-between ">
            <button className="my-2 w-fit" onClick={() => setRecoverInfo({ ...recoverInfo, recoveryProcessId: id })}>
              {id}
            </button>
            <p className="text-gray-400 flex items-center">
              <span className="pb-1 flex">{processIdVotes[id] || <MoonLoader size={16}/>}</span>
              <span className="mx-1">/</span>
              <span className="pt-1">{selectedVault.current.guardianCount}</span>
            </p>
          </div>
        ))
      ) : (
        <></>
      )}
      {ids && ids.length == 0 ? (
        <div className="w-full p-6 border rounded-sm text-center text-gray-400 my-2">
          There are no ongoing recovery processes yet.
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
