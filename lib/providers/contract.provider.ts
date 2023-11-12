import { Provider } from "@nestjs/common";
import { AbstractConnection } from "../common/connection";
import { getContractToken } from "../utils/token.util";
import { getMetadata } from "../utils/metadata.util";
import { EthersModuleOptionsContract } from "../intefaces/ethers-options.interface";
import { ContractBuilderMetadata } from "../intefaces/contract-builder-metadata.interface";
import { ETHERS_CONTRACT_BUILDER_OPTIONS } from "../ethers.constants";

export function getContractProvider(contract: EthersModuleOptionsContract, connection?: any): Provider {
  const metadata = getMetadata<ContractBuilderMetadata>(ETHERS_CONTRACT_BUILDER_OPTIONS, contract);

  return {
    provide: getContractToken(contract.name),
    inject: [connection],
    useFactory: (connection?: AbstractConnection) => {
      return new contract.contract(metadata, connection);
    },
  };
}

export function getContractProviders(contracts: EthersModuleOptionsContract[], connection?: any): Provider[] {
  return contracts.map(contract => getContractProvider(contract, connection));
}
