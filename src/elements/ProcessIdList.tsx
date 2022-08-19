import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function ListProcessIds() {
  const { recovery, selectedVault } = useContext(GlobalContext);
  function getIds() {
    const ids = recovery?.getRecoverProcessesIds(selectedVault.current.vaultAddress)
  }
  return <div></div>;
}
