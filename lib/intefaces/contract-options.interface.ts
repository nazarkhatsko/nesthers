import { ethers } from "ethers";

export interface ContractOptions {
  address: string;
  abi: ethers.Interface | ethers.InterfaceAbi;
}
