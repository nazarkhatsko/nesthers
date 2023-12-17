import { Module, DynamicModule, Provider } from "@nestjs/common";
import { DiscoveryModule } from "@nestjs/core";
import { EthersModuleOptions } from "./intefaces/ethers-options.interface";
import { EthersExplorer } from "./ethers.explorer";
import { EthersOrchestrator } from "./ethers.orchestrator";
import { EthersRegistry } from "./ethers.registry";
import { EthersMetadataAccessor } from "./ethers-metadata.accessor";
import { getConnectionToken } from "./utils/token.util";
import { getConnectionProvider } from "./providers/connection.provider";
import { getWalletProviders } from "./providers/wallet.provider";
import { getContractProviders } from "./providers/contract.provider";
import { AbstractConnection } from "./common/connection";
import { ETHERS_CONNECTION } from "./ethers.constants";

@Module({
  imports: [DiscoveryModule],
  providers: [EthersMetadataAccessor, EthersOrchestrator],
})
export class EthersModule {
  static forRoot(options: EthersModuleOptions): DynamicModule {
    const connection = getConnectionProvider(options.connection);
    const wallets = getWalletProviders(
      options.wallets || [],
      getConnectionToken(options.connection.name),
    );
    const contracts = getContractProviders(
      options.contracts || [],
      getConnectionToken(options.connection.name),
    );

    const innerConnection: Provider = {
      provide: ETHERS_CONNECTION,
      useValue: options.connection.instance,
    };

    return {
      global: true,
      module: EthersModule,
      providers: [
        connection,
        ...wallets,
        ...contracts,
        innerConnection,
        EthersExplorer,
        EthersRegistry,
      ],
      exports: [connection, ...wallets, ...contracts, EthersRegistry],
    };
  }

  static forFuture(
    options: Omit<EthersModuleOptions, "connection"> & { connectionName?: string },
  ): DynamicModule {
    const connection = {
      provide: ETHERS_CONNECTION,
      inject: [getConnectionToken(options.connectionName)],
      useFactory: (connection?: AbstractConnection) => {
        return connection;
      },
    };

    const wallets = getWalletProviders(
      options.wallets || [],
      getConnectionToken(options.connectionName),
    );
    const contracts = getContractProviders(
      options.contracts || [],
      getConnectionToken(options.connectionName),
    );

    return {
      module: EthersModule,
      providers: [connection, ...wallets, ...contracts, EthersExplorer, EthersRegistry],
      exports: [connection, ...wallets, ...contracts, EthersRegistry],
    };
  }
}
