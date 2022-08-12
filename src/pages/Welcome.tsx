import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

export default function Welcome() {
  const {setCurrentStep} = useContext(GlobalContext)

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
            Alread have a Vault or want to access it form a differenc device? Easily load your Vault using your Vault
            address.
          </p>
          <Link to="/app/edit">Load Vault</Link>
        </div>
      </div>
    </div>
  );
}
