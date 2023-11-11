import { ethers } from "ethers";
import { ContractOptions } from "../intefaces/contract-options.interface";
import { AbstractConnection } from "./connection";

export class Contract extends ethers.Contract {
  constructor(options: ContractOptions, connection?: AbstractConnection) {
    super(options.address, options.abi, connection);
  }
}
