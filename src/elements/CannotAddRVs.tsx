import useCanAddVault from '../hooks/useCanAddVault';

export default function CannotAddRvs({ render }: { render: boolean }) {
  return render ? (
    <></>
  ) : (
    <div className="border font-light border-red-400 py-2 px-4 max-w-xs text-sm flex flex-col justify-center rounded-sm">
      <p>
        The connected wallet cannot add Recovery Vaults to this Universal Profile. Please switch to a controller
        account.
      </p>
    </div>
  );
}
