import { Injectable, Inject, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { EthersRegistry } from "./ethers.registry";
import { AbstractConnection } from "./common/connection";
import { OnBlockMetadata } from "./intefaces/on-block-metadata.interface";
import { OnEventMetadata } from "./intefaces/on-event-metadata.interface";
import { getConnectionToken } from "./utils/token.util";
import { BlockListener } from "./listeners/block.listener";
import { EventListener } from "./listeners/event.listener";

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
    @Inject(getConnectionToken()) private readonly connection: AbstractConnection,
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
    const keys = Object.keys(this.onBlocks);
    for (const key of keys) {
      const options = this.onBlocks[key];
      options.ref = new BlockListener({
        connection: this.connection,
        callback: options.target,
        args: options.args,
        filter: options.options,
      });
      options.ref.start();
      this.ethersRegistry.addBlockListener(key, options.ref);
    }
  }

  private subscribeOnEvents() {
    const keys = Object.keys(this.onEvents);
    for (const key of keys) {
      const options = this.onEvents[key];
      options.ref = new EventListener({
        connection: this.connection,
        callback: options.target,
        args: options.args,
        filter: options.options,
      });
      this.ethersRegistry.addEventListener(key, options.ref);
    }
  }

  private unsubscribeOnBlocks() {
    this.ethersRegistry
      .getBlockListenerNames()
      .forEach(name => this.ethersRegistry.deleteBlockListener(name));
  }

  private unsubscribeOnEvents() {
    this.ethersRegistry
      .getEventListenerNames()
      .forEach(name => this.ethersRegistry.deleteEventListener(name));
  }

  addOnBlock(methodRef: Function, options: OnBlockMetadata, name: string = uuidv4()) {
    this.onBlocks[name] = {
      target: methodRef,
      ...options,
    };
  }

  addOnEvent(methodRef: Function, options: OnEventMetadata, name: string = uuidv4()) {
    this.onEvents[name] = {
      target: methodRef,
      ...options,
    };
  }
}
