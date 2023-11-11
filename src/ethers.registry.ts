import { Injectable, Logger } from "@nestjs/common";
import { BlockListener } from "./listeners/block.listener";
import { EventListener } from "./listeners/event.listener";

@Injectable()
export class EthersRegistry {
  // private readonly logger = new Logger(EthersRegistry.name);

  private readonly blockListeners = new Map<string, BlockListener>();
  private readonly eventListeners = new Map<string, EventListener>();

  hasBlockListener(name: string): boolean {
    return this.blockListeners.has(name);
  }

  hasEventListener(name: string): boolean {
    return this.blockListeners.has(name);
  }

  getBlockListeners(): string[] {
    return [...this.blockListeners.keys()];
  }

  getEventListeners(): string[] {
    return [...this.blockListeners.keys()];
  }

  getBlockListener(name: string): BlockListener {
    const ref = this.blockListeners.get(name);
    if (!ref) {
      throw new Error("");
    }
    return ref;
  }

  getEventListener(name: string): EventListener {
    const ref = this.eventListeners.get(name);
    if (!ref) {
      throw new Error("");
    }
    return ref;
  }

  addBlockListener(name: string, listener: BlockListener): void {
    const ref = this.blockListeners.get(name);
    if (ref) {
      throw new Error("");
    }
    if (!listener.isListening()) {
      listener.start();
    }
    this.blockListeners.set(name, listener);
  }

  addEventListener(name: string, listener: EventListener): void {
    const ref = this.eventListeners.get(name);
    if (ref) {
      throw new Error("");
    }
    if (!listener.isListening()) {
      listener.start();
    }
    this.eventListeners.set(name, listener);
  }

  deleteBlockListener(name: string): void {
    const ref = this.blockListeners.get(name);
    if (!ref) {
      throw new Error("");
    }
    if (ref.isListening()) {
      ref.stop();
    }
    this.blockListeners.delete(name);
  }

  deleteEventListener(name: string): void {
    const ref = this.eventListeners.get(name);
    if (!ref) {
      throw new Error("");
    }
    if (ref.isListening()) {
      ref.stop();
    }
    this.eventListeners.delete(name);
  }
}
