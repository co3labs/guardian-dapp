import { useContext } from 'react';
import { BsPen } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import vaults from '../sample-data.json';

export default function Welcome() {
  const { setCurrentStep, setCurrentVaultEdits } = useContext(GlobalContext);

  return (
    <div className="flex mx-auto justify-center items-center px-4 w-full md:w-3/4 lg:w-2/3 ">
      <div className="mx-auto">
        <div className="my-10">
          <h2 className="text-3xl font-bold">Welcome to Guardian</h2>
          <h3 className="text-xl font-light">
            <span>Guardian is your tool to safely manage your digital assets</span>
            <br />
            <span>by leveraging universal account technology.</span>{' '}
          </h3>
        </div>
        <div className="welcomeCard">
          <div>
            <h3>Create a new vault</h3>
            <p>Create a new vault that is controlled by one or multiple owners.</p>
            <p>You will be required to pay a network fee for creating your new vault.</p>
            <Link onClick={() => setCurrentStep(0)} to="/app/create">
              Create new Vault
            </Link>
          </div>{' '}
          <div>
            <h3>Load an existing vault</h3>
            <p>
              Already have a Vault or want to access it form a different device? Easily load your Vault using your Vault
              address.
            </p>
            <Link to="/app/load">Load Vault</Link>
          </div>
        </div>
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
                  onClick={() => setCurrentVaultEdits({...info, vaultName: vault})}
                  to="/app/edit"
                  className="absolute -right-0 translate-x-[200%]"
                >
                  <BsPen />
                </Link>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
