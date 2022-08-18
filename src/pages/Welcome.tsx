import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext,  } from '../context/GlobalState';
export default function Welcome() {
  const { resetVaultAndSteps } = useContext(GlobalContext);
//style={{filter:"contrast(0%) drop-shadow(30px 30px 10px #545454)"}}
  return (
    <div className="flex m-auto h-full justify-center items-center px-2 md:px-4 w-full my-12 md:w-3/4 lg:w-2/3 relative z-0">
      <main className="border rounded-sm px-4 md:px-12 pb-12 shadow-lg bg-gray-50 relative z-10">
        <section className="my-10">
          <h2 className="text-3xl font-bold">Be Safe, Use Guardians</h2>
          <h3 className="text-xl font-light">
            <span>Guardians enable you to safely manage your digital assets</span>
            <br />
            <span>
              by using <span className="text-blue-800 font-semibold">Recovery Vaults .</span>{' '}
            </span>{' '}
          </h3>
        </section>
        <div className="welcomeCard">
          <section className="shadow-lg">
            <h3>Create A New Vault</h3>
            <p>Create a new vault that is controlled by one or multiple owners.</p>
            <Link className="btnSmall btnPrimary w-fit my-6" onClick={() => resetVaultAndSteps()} to="/app/create">
              Create Vault
            </Link>
          </section>{' '}
          <section className="shadow-lg">
            <h3>Manage Existing Vaults</h3>
            <p>
              Edit or import your existing vaults. 
              Easily manage your vaults, guardians, and thresholds. 
            </p>
            <Link className="btnSmall btnSecondary w-fit my-6" to="/app/manage">
              My Vaults
            </Link>
          </section>
        </div>
      </main>
      {/* <button onClick={()=>{setGlobalSnackbarQue([...globalSnackbarQue, "A new message"])}}>
        pressme
      </button> */}
    </div>
  );
}
