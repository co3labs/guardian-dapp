import { ERC725Utils, Recovery } from 'guardians.js';
import React, { Dispatch, MutableRefObject, SetStateAction } from 'react';
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

export interface IVaultInfo {
  vaultName: string;
  guardianList: IGuardianList;
  threshold: number;
  guardianCount: number;
  ERC725Address: string;
  vaultAddress: string;
  timestampId: number;
  lastUpdated: number;
  vaultOwner: string;
}

export interface IVaultInfoEdits extends IVaultInfo {
  newSecret: string;
  oldSecret: string;
}

export interface IRecoveryProcessInfo {
  recoveryProcessId: string;
  newOwner: string;
}

export interface IUserVaults {
  [timestampId: number]: IVaultInfo;
}

export interface ITxState {
  showModal: boolean;
  "Deploy Vault": boolean;
  "Add Permissions": boolean;
  "Set Secret": boolean;
  "Set Threshold": boolean;
  "Add Guardians": number;
}

export interface IVaultDeployReceipt {
  blockHash: string;
  blockNumber: number;
  contractAddress: string | null;
  cumulativeGasUsed: number;
  effectiveGasPrice: number;
  from: string;
  gasUsed: number;
  logsBloom: string;
  status: true;
  to: string;
  transactionHash: string;
  transactionIndex: number;
  type: string;
  events: {
    [id: string]: {
      address: string;
      blockNumber: number;
      transactionHash: string;
      transactionIndex: number;
      blockHash: string;
      logIndex: number;
      removed: false;
      id: string;
      returnValues: { [id: string]: string };
      signature: null;
      raw: { [id: string]: string };
    };
  };
}

export type ITxProgress = "loading" | "failed" | "success" | ""

export type VoidFunciton = () => void;

export interface globalStates {
  handleConnect: VoidFunciton;
  walletAddress?: string;
  chainId?: supportedChains;
  provider?: Web3Modal;
  web3?: Web3;
  unsupportedNet: boolean;
  cookiesAllowed: boolean | null;
  setCookiesAllowed: Dispatch<SetStateAction<boolean | null>>;
  currentVaultEdits: IVaultInfoEdits;
  setCurrentVaultEdits: Dispatch<SetStateAction<IVaultInfoEdits>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  allVaults: IUserVaults | undefined;
  setAllVaults: Dispatch<SetStateAction<IUserVaults | undefined>>;
  resetVaultAndSteps: (vault?: IVaultInfoEdits) => void;
  globalSnackbarQue: string[];
  setGlobalSnackbarQue: Dispatch<SetStateAction<string[]>>;
  location: Location | null;
  setLocation: Dispatch<SetStateAction<Location | null>>;
  updateAndGoHome: (navigate: NavigateFunction, location: Location) => void;
  switchNetwork: VoidFunciton;
  recovery: Recovery | undefined;
  addToGlobalSnackbarQue: (message: string) => void;
  recoverInfo: IRecoveryProcessInfo;
  setRecoverInfo: Dispatch<SetStateAction<IRecoveryProcessInfo>>;
  currentVault: MutableRefObject<IVaultInfo | undefined>;
  txState: ITxState;
  setTxState: Dispatch<SetStateAction<ITxState>>;
  erc725Utils: ERC725Utils | undefined;
  vaultDeploying: ITxProgress;
  setVaultDeploying: Dispatch<SetStateAction<ITxProgress>>;
  secretUpdating: ITxProgress;
  setSecretUpdating: Dispatch<SetStateAction<ITxProgress>>;
  thresholdUpdating: ITxProgress;
  setThresholdUpdating: Dispatch<SetStateAction<ITxProgress>>;
  permissionsUpdating: ITxProgress;
  setPermissionsUpdating: Dispatch<SetStateAction<ITxProgress>>;
  guardiansLoading: ITxProgress;
  setGuardiangsLoading: Dispatch<SetStateAction<ITxProgress>>;
}
