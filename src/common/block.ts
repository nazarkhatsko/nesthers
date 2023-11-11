import { ethers } from "ethers";
import { BlockOptions } from "../intefaces/block-options.interface";

export class Block extends ethers.Block {
  constructor(options: BlockOptions) {
    super(options.block, options.provider);
  }
}
