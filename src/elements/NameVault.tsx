export default function NameVault() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label htmlFor="recovery_vault_name">Recovery Vault Name</label>
      <input className="border rounded-sm" type="text" id="recovery_vault_name" />
    </form>
  );
}
