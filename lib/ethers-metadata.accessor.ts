import { Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ListnerType } from "./enums/listener-type.enum";
import { OnBlockMetadata } from "./intefaces/on-block-metadata.interface";
import { OnEventMetadata } from "./intefaces/on-event-metadata.interface";
import {
  ETHERS_LISTENER_TYPE,
  ETHERS_LISTENER_ON_BLOCK_OPTIONS,
  ETHERS_LISTENER_ON_EVENT_OPTIONS,
  ETHERS_ARGS_KEY,
} from "./ethers.constants";

@Injectable()
export class EthersMetadataAccessor {
  constructor(private readonly reflector: Reflector) {}

  getListenerTypeMetadata(target: any): ListnerType | undefined {
    return this.getMetadata<ListnerType>(ETHERS_LISTENER_TYPE, target);
  }

  getListenerOnBlockMetadata(target: any): OnBlockMetadata | undefined {
    const options = this.getMetadata<OnBlockMetadata["options"]>(
      ETHERS_LISTENER_ON_BLOCK_OPTIONS,
      target,
    );
    const args = this.getMetadata<OnBlockMetadata["args"]>(ETHERS_ARGS_KEY, target) || [];
    return { options, args };
  }

  getListenerOnEventMetadata(target: any): OnEventMetadata | undefined {
    const options = this.getMetadata<OnEventMetadata["options"]>(
      ETHERS_LISTENER_ON_EVENT_OPTIONS,
      target,
    );
    const args = this.getMetadata<OnEventMetadata["args"]>(ETHERS_ARGS_KEY, target) || [];
    return { options, args };
  }

  private getMetadata<T>(key: string, target: any): T | undefined {
    const isObject = typeof target === "object" ? target !== null : typeof target === "function";

    return isObject ? this.reflector.get(key, target) : undefined;
  }
}
