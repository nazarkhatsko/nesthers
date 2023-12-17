import { Injectable, Inject, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { EthersRegistry } from "./ethers.registry";
import { AbstractConnection } from "./common/connection";
import { OnBlockMetadata } from "./intefaces/on-block-metadata.interface";
import { OnEventMetadata } from "./intefaces/on-event-metadata.interface";
import { BlockListener } from "./listeners/block.listener";
import { EventListener } from "./listeners/event.listener";
import { wrapFuncFilterArgs } from "./utils/tools.util";
import { ETHERS_CONNECTION } from "./ethers.constants";

type TargetHost = { target: any };
type RefHost<T> = { ref?: T };

type OnBlock = OnBlockMetadata & TargetHost & RefHost<BlockListener>;
type OnEvent = OnEventMetadata & TargetHost & RefHost<EventListener>;

@Injectable()
export class EthersOrchestrator implements OnApplicationBootstrap, OnApplicationShutdown {
  private readonly onBlocks: Record<string, OnBlock> = {};
  private readonly onEvents: Record<string, OnEvent> = {};

  constructor(
    private readonly ethersRegistry: EthersRegistry,
    @Inject(ETHERS_CONNECTION) private readonly connection: AbstractConnection,
  ) {}

  onApplicationBootstrap() {
    this.subscribeOnBlocks();
    this.subscribeOnEvents();
  }

  onApplicationShutdown() {
    this.unsubscribeOnBlocks();
    this.unsubscribeOnEvents();
  }

  private subscribeOnBlocks() {
    for (const key in this.onBlocks) {
      const options = this.onBlocks[key];
      options.ref = new BlockListener({
        connection: this.connection,
        callback: (data) => wrapFuncFilterArgs(data, options.target, options.args),
      });
      this.ethersRegistry.addListener(key, options.ref);
    }
  }

  private subscribeOnEvents() {
    for (const key in this.onEvents) {
      const options = this.onEvents[key];
      options.ref = new EventListener({
        connection: this.connection,
        filter: options.options,
        callback: (data) => wrapFuncFilterArgs(data, options.target, options.args),
      });
      this.ethersRegistry.addListener(key, options.ref);
    }
  }

  private unsubscribeOnBlocks() {
    for (const key in this.onBlocks) {
      this.ethersRegistry.deleteListener(key);
    }
  }

  private unsubscribeOnEvents() {
    for (const key in this.onEvents) {
      this.ethersRegistry.deleteListener(key);
    }
  }

  addOnBlock(methodRef: any, options: OnBlockMetadata, name: string = uuidv4()) {
    this.onBlocks[name] = {
      target: methodRef,
      ...options,
    };
  }

  addOnEvent(methodRef: any, options: OnEventMetadata, name: string = uuidv4()) {
    this.onEvents[name] = {
      target: methodRef,
      ...options,
    };
  }
}
