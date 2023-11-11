import { applyDecorators, SetMetadata } from "@nestjs/common";
import { ContractBuilderOptions } from "../intefaces/contract-builder-options.interface";
import { Functional, getFunctionalParams } from "../utils/functional.util";
import { ETHERS_CONTRACT_BUILDER_OPTIONS } from "../ethers.constants";

export function ContractBuilder(options: Functional<ContractBuilderOptions>) {
  return applyDecorators(
    SetMetadata(ETHERS_CONTRACT_BUILDER_OPTIONS, getFunctionalParams(options)),
  );
}
