import { Injectable } from "@nestjs/common";
import { IListener } from "./intefaces/ilistener.interface";

@Injectable()
export class EthersRegistry {
  private readonly listeners = new Map<string, IListener>();

  hasListener(name: string): boolean {
    return this.listeners.has(name);
  }

  getListenerNames(): string[] {
    return [...this.listeners.keys()];
  }

  getListener<T extends IListener>(name: string): T {
    const ref = this.listeners.get(name);
    if (!ref) {
      throw new Error("Listner with this name desn't exist");
    }
    return ref as T;
  }

  addListener<T extends IListener>(name: string, listener: T) {
    const ref = this.listeners.get(name);
    if (ref) {
      throw new Error("Listner with this name already exists");
    }
    if (!listener.isListening()) {
      listener.start();
    }
    this.listeners.set(name, listener);
  }

  deleteListener(name: string) {
    const ref = this.listeners.get(name);
    if (!ref) {
      throw new Error("Listner with this name desn't exist");
    }
    if (ref.isListening()) {
      ref.stop();
    }
    this.listeners.delete(name);
  }
}
