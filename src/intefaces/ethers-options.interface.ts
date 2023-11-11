import { ModuleMetadata } from "@nestjs/common";
import { ConnectionOptions } from "./connection-options.interface";

export interface EthersModuleOptions {
  connection: ConnectionOptions;
  wallets?: any[];
  contracts?: any[];
}

export interface EthersModuleAsyncOptions extends Pick<ModuleMetadata, "imports"> {
  inject?: any[];
  useFactory?: (...args: any[]) => EthersModuleOptions | Promise<EthersModuleOptions>;
}
