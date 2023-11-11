import { applyDecorators, SetMetadata } from "@nestjs/common";
import { ListnerType } from "../enums/listener-type.enum";
import { OnEventOptions } from "../intefaces/on-event-options.interface";
import { Functional, getFunctionalParams } from "../utils/functional.util";
import { ETHERS_LISTENER_TYPE, ETHERS_LISTENER_ON_EVENT_OPTIONS } from "../ethers.constants";

export function OnEvent(options: Functional<OnEventOptions>): MethodDecorator {
  return applyDecorators(
    SetMetadata(ETHERS_LISTENER_TYPE, ListnerType.EVENT),
    SetMetadata(ETHERS_LISTENER_ON_EVENT_OPTIONS, getFunctionalParams(options)),
  );
}
