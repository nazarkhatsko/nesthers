import { ethers } from "ethers";

export interface BlockOptions {
  block: ethers.BlockParams;
  provider: ethers.Provider;
}
