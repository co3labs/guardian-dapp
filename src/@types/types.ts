import React from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

export type supportedChains = '137';

export interface IGuardianInfo {
  name: string;
  address: string;
}

export interface IGuardianList {
  [id: number]: IGuardianInfo;
}
export interface IVaultInfo {
  vaultName: string
  guardianList: IGuardianList
  threshold: number
  guardianCount: number
  address: string
}


export interface globalStates {
  handleConnect: Function;
  accountId?: string;
  chainId?: supportedChains;
  provider?: Web3Modal;
  web3?: Web3;
  unsupportedNet: boolean;
  cookiesAllowed: boolean | null;
  setCookiesAllowed: React.Dispatch<React.SetStateAction<boolean | null>>;
  currentVaultEdits: IVaultInfo;
  setCurrentVaultEdits: React.Dispatch<React.SetStateAction<IVaultInfo>>;
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}
