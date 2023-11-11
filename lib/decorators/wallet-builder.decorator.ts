import { applyDecorators, SetMetadata } from "@nestjs/common";
import { WalletBuilderOptions } from "../intefaces/wallet-builder-options.interface";
import { Functional, getFunctionalParams } from "../utils/functional.util";
import { ETHERS_WALLET_BUILDER_OPTIONS } from "../ethers.constants";

export function WalletBuilder(options: Functional<WalletBuilderOptions>) {
  return applyDecorators(SetMetadata(ETHERS_WALLET_BUILDER_OPTIONS, getFunctionalParams(options)));
}
