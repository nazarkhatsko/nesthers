import { Provider } from "@nestjs/common";
import { AbstractConnection } from "../common/connection";
import { getContractToken } from "../utils/token.util";
import { getMetadata } from "../utils/metadata.util";
import { ContractBuilderMetadata } from "../intefaces/contract-builder-metadata.interface";
import { ETHERS_CONTRACT_BUILDER_OPTIONS } from "../ethers.constants";

export function getContractProvider(contract: any, connection?: any): Provider {
  const metadata = getMetadata<ContractBuilderMetadata>(ETHERS_CONTRACT_BUILDER_OPTIONS, contract);

  return {
    provide: getContractToken(metadata.name ?? contract.name),
    inject: [connection],
    useFactory: (connection?: AbstractConnection) => {
      return new contract(metadata, connection);
    },
  };
}

export function getContractProviders(contracts: any[], connection?: any): Provider[] {
  return contracts.map(contract => getContractProvider(contract, connection));
}
