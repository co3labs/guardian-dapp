import vaults from '../sample-data.json';
import { BsPen } from 'react-icons/bs';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Link } from 'react-router-dom';
import { IVaultInfo } from '../@types/types';

const { setCurrentVaultEdits } = useContext(GlobalContext);


export default function VaultList() {
  return (
    <>
      <h4>Your Recovery Vaults</h4>
      <table className="w-full">
        <thead>
          <tr>
            <th>Vault Name</th>
            <th>Gaurdians</th>
            <th>Threshold</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(vaults).map(([vault, info]) => (
            <tr className="p-4 rounded-sm border border-400 relative">
              <td className="font-bold">{vault}</td>
              <td>{info.guardianCount}</td>
              <td>{info.threshold}</td>
              <td>{info.address}</td>
              <Link
                onClick={() => setCurrentVaultEdits({ ...info, vaultName: vault } as IVaultInfo)}
                to="/app/edit"
                className="absolute -right-0 translate-x-[200%]"
              >
                <BsPen />
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
