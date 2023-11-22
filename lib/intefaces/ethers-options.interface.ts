import { ModuleMetadata } from "@nestjs/common";
import { ConnectionOptions } from "./connection-options.interface";
import { Wallet } from "../common/wallet";
import { Contract } from "../common/contract";

export interface EthersModuleOptions {
  connection: ConnectionOptions;
  wallets?: EthersModuleOptionsWallet[];
  contracts?: EthersModuleOptionsContract[];
}

export interface EthersModuleOptionsWallet {
  name: string;
  wallet: typeof Wallet;
}

export interface EthersModuleOptionsContract {
  name: string;
  contract: typeof Contract;
}

// export interface EthersModuleAsyncOptions extends Pick<ModuleMetadata, "imports" | "providers" | "exports"> {
//   inject?: any[];
//   useFactory?: (...args: any[]) => EthersModuleOptions | Promise<EthersModuleOptions>;
// }
