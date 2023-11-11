import { applyDecorators, SetMetadata } from "@nestjs/common";
import { ListnerType } from "../enums/listener-type.enum";
import { OnBlockOptions } from "../intefaces/on-block-options.interface";
import { Functional, getFunctionalParams } from "../utils/functional.util";
import { ETHERS_LISTENER_TYPE, ETHERS_LISTENER_ON_BLOCK_OPTIONS } from "../ethers.constants";

export function OnBlock(options: Functional<OnBlockOptions>): MethodDecorator {
  return applyDecorators(
    SetMetadata(ETHERS_LISTENER_TYPE, ListnerType.BLOCK),
    SetMetadata(ETHERS_LISTENER_ON_BLOCK_OPTIONS, getFunctionalParams(options)),
  );
}
