export default function Welcome() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="my-10">
        <h2 className="text-3xl">Welcome to XXXXX XXXXX</h2>
        <h3 className="text-xl">
          <span>XXXXX XXXXX is your tool to safely manage your digital assets</span>
          <br/>
          <span>by leveraging universal account technology.</span>{' '}
        </h3>
      </div>
      <div className="welcomeCard">
        <div>
          <h3>Create a new vault</h3>
          <p>Create a new vault that is controlled by one or multiple owners.</p>
          <p>You will be required to pay a network fee for creating your new vault.</p>
          <button>Create new Vault</button>
        </div>{' '}
        <div>
          <h3>Load an existing vault</h3>
          <p>
            Alread have a Vault or want to access it form a differenc device? Easily load your Vault using your Vault
            address.
          </p>
          <button>Load Vault</button>
        </div>
      </div>
    </div>
  );
}
