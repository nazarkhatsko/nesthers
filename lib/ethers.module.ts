import { Module, DynamicModule } from "@nestjs/common";
import { DiscoveryModule } from "@nestjs/core";
import {
  EthersModuleOptions,
  EthersModuleAsyncOptions,
} from "./intefaces/ethers-options.interface";
import { EthersExplorer } from "./ethers.explorer";
import { EthersOrchestrator } from "./ethers.orchestrator";
import { EthersRegistry } from "./ethers.registry";
import { EthersMetadataAccessor } from "./ethers-metadata.accessor";
import { getConnectionToken } from "./utils/token.util";
import { getConnectionProvider } from "./providers/connection.provider";
import { getWalletProviders } from "./providers/wallet.provider";
import { getContractProviders } from "./providers/contract.provider";

@Module({
  imports: [DiscoveryModule],
  providers: [EthersMetadataAccessor, EthersOrchestrator],
})
export class EthersModule {
  static forRoot(options: EthersModuleOptions): DynamicModule {
    const connection = getConnectionProvider(options.connection);
    const wallets = getWalletProviders(options.wallets || [], getConnectionToken(options.connection.name));
    const contracts = getContractProviders(options.contracts || [], getConnectionToken(options.connection.name));

    return {
      global: true,
      module: EthersModule,
      providers: [connection, ...wallets, ...contracts, EthersExplorer, EthersRegistry],
      exports: [connection, ...wallets, ...contracts, EthersRegistry],
    };
  }

  // static forRootAsync(options: EthersModuleAsyncOptions): DynamicModule {
  //   return {
  //     global: true,
  //     module: EthersModule,
  //     imports: [...(options.imports || [])],
  //     providers: [
  //       {
  //         provide: EthersModule.name,
  //         inject: options.inject || [],
  //         useFactory: options.useFactory,
  //       },
  //     ],
  //     exports: [],
  //   };
  // }

  static forFuture(options: Omit<EthersModuleOptions, "connection">): DynamicModule {
    const wallets = getWalletProviders(options.wallets || [], getConnectionToken()); // options.connectionName
    const contracts = getContractProviders(options.contracts || [], getConnectionToken()); // options.connectionName

    return {
      module: EthersModule,
      providers: [...wallets, ...contracts, EthersExplorer, EthersRegistry],
      exports: [...wallets, ...contracts, EthersRegistry],
    };
  }
}
