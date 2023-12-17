import { ethers } from "ethers";
import { WalletOptions } from "../intefaces/wallet-options.interface";
import { AbstractConnection } from "./connection";

export class Wallet extends ethers.Wallet {
  constructor(options: WalletOptions, connection?: AbstractConnection) {
    if (options.random) {
      super(ethers.Wallet.createRandom().privateKey, connection);
    } else if (options.privateKey !== "") {
      super(options.privateKey, connection);
    } else if (options.mnemonic && options.mnemonic.phrase.length > 1) {
      super(ethers.Wallet.fromPhrase(options.mnemonic.phrase.join(" ")).privateKey, connection);
    } else {
      throw new Error("");
    }
  }
}
