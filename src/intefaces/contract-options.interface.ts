import { ethers } from "ethers";

export interface ContractOptions {
  name?: string;
  address: string;
  abi: ethers.Interface | ethers.InterfaceAbi;
  // signer?: any;
}
