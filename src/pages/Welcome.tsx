import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext, INITIAL_VAULT_STATE } from '../context/GlobalState';

export default function Welcome() {
  const { setCurrentStep, setCurrentVaultEdits } = useContext(GlobalContext);

  const resetDefaults =  () =>{
    setCurrentStep(0)
    setCurrentVaultEdits(INITIAL_VAULT_STATE)
  }

  return (
    <div className="flex m-auto h-full justify-center items-center px-4 w-full md:w-3/4 lg:w-2/3 ">
      <div>
        <div className="my-10">
          <h2 className="text-3xl font-bold">Welcome to Guardians</h2>
          <h3 className="text-xl font-light">
            <span>Guardians is your tool to safely manage your digital assets</span>
            <br />
            <span>by leveraging ERC725 smart contracts.</span>{' '}
          </h3>
        </div>
        <div className="welcomeCard">
          <div className='shadow-lg'>
            <h3>Create a new vault</h3>
            <p>Create a new vault that is controlled by one or multiple owners.</p>
            <p>You will be required to pay a network fee for creating your new vault.</p>
            <Link onClick={resetDefaults} to="/app/create">
              Create new Vault
            </Link>
          </div>{' '}
          <div className='shadow-lg'>
            <h3>Load an existing vault</h3>
            <p>
              Already have a Vault or want to access it form a different device? Easily load your Vault using your Vault
              address.
            </p>
            <Link to="/app/load" onClick={resetDefaults}>
              Load Vault
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}
