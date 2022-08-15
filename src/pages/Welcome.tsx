import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext, INITIAL_VAULT_STATE } from '../context/GlobalState';
import logo from "../assets/grayscale.png"
export default function Welcome() {
  const { setCurrentStep, setCurrentVaultEdits } = useContext(GlobalContext);

  const resetDefaults = () => {
    setCurrentStep(0);
    setCurrentVaultEdits(INITIAL_VAULT_STATE);
  };

  return (
    <div className="flex m-auto h-full justify-center items-center px-4 w-full md:w-3/4 lg:w-2/3 relative z-0">
      {/* <img src={logo} className="absolute z-0 -translate-x-2/3 translate-y-1/2 opacity-20 select-none pointer-events-none" style={{filter:"contrast(0%) drop-shadow(30px 30px 10px #545454)"}}/> */}
      <div className='border rounded-sm px-12 pb-12 shadow-lg bg-gray-50 relative z-10'>
        <div className="my-10">
          <h2 className="text-3xl font-bold">Be Safe, Use Guardians</h2>
          <h3 className="text-xl font-light">
            <span>Guardians enable you to safely manage your digital assets</span>
            <br />
            <span>by using <span className='text-blue-800 font-semibold'>Recovery Vaults .</span> </span>{' '}
          </h3>
        </div>
        <div className="welcomeCard">
          <div className="shadow-lg">
            <h3>Create A New Vault</h3>
            <p>Create a new vault that is controlled by one or multiple owners.</p>
            <p>You will be required to pay a network fee for creating your new vault.</p>
            <Link className="btnSmall btnPrimary w-fit my-6" onClick={resetDefaults} to="/app/create">
              Create Vault
            </Link>
          </div>{' '}
          <div className="shadow-lg">
            <h3>Load An Existing Vault</h3>
            <p>
              Already have a Vault or want to access it from a different device? Easily load your Vault using your Vault
              address.
            </p>
            <Link  className="btnSmall btnSecondary w-fit my-6" to="/app/load" onClick={resetDefaults}>
              Load Vault
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
