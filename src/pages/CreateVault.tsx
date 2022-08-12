import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { BsChevronDown, BsTrash } from 'react-icons/bs';
import OutsideClickHandler from 'react-outside-click-handler';
import { IGuardianInfo, IVaultInfo } from '../@types/types';
import GuardianForm from '../elements/GuardianForm';
import ManageVaultConstructor from '../elements/ManageVaultConstructor';
import ConnectWallet from '../elements/ConnectWallet';
import NameVault from '../elements/NameVault';
import ReviewChanges from '../elements/ReviewChanges';

export default function CreateVault() {
  return (
    <ManageVaultConstructor
      steps={[
        ['Connect Wallet', <ConnectWallet />],
        ['Name', <NameVault />],
        ['Guardians', <GuardianForm />],
        ['Review', <ReviewChanges />],
      ]}
      title="Create a New Recovery Vault"
    />
  );
}
