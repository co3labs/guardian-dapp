import { Recovery } from 'guardians.js';
import React, { Dispatch, SetStateAction } from 'react';
import { Location, NavigateFunction } from 'react-router-dom';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

export type supportedChains = 2828;

export interface IGuardianInfo {
  name: string;
  address: string;
}

export interface IGuardianList {
  [id: number]: IGuardianInfo;
}

// Local storage should NOT store the vault secret because it will 
// be vulnerable to XSS attacks. It might be possible to store it 
// encrypted with the account signature. Storing raw vault secret 
// development.
export interface IVaultInfo {
  vaultName: string;
  guardianList: IGuardianList;
  threshold: number;
  guardianCount: number;
  ERC725Address: string;
  vaultAddress: string;
  timestampId: number;
  lastUpdated: number;
  ownerSecret: string
}


export interface IUserVaults {
  [timestampId: number]: IVaultInfo;
}

export type VoidFunciton = () => void;

export interface globalStates {
  handleConnect: VoidFunciton;
  accountId?: string;
  chainId?: supportedChains;
  provider?: Web3Modal;
  web3?: Web3;
  unsupportedNet: boolean;
  cookiesAllowed: boolean | null;
  setCookiesAllowed: Dispatch<SetStateAction<boolean | null>>;
  currentVaultEdits: IVaultInfo;
  setCurrentVaultEdits: Dispatch<SetStateAction<IVaultInfo>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  allVaults: IUserVaults | undefined;
  setAllVaults: Dispatch<SetStateAction<IUserVaults | undefined>>;
  resetVaultAndSteps: VoidFunciton;
  globalSnackbarQue: string[];
  setGlobalSnackbarQue: Dispatch<SetStateAction<string[]>>;
  location: Location | null;
  setLocation: Dispatch<SetStateAction<Location | null>>;
  updateAndGoHome: (navigate: NavigateFunction, location: Location) => void;
  switchNetwork: VoidFunciton;
  recovery: Recovery | undefined;
  setRecovery: Dispatch<SetStateAction<Recovery | undefined>>;
  addToGlobalSnackbarQue: (message:string) => void
}
