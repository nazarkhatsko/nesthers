import { ethers } from "ethers";
import { Listener } from "../common/listener";
import { AbstractConnection } from "../common/connection";

export interface EventListenerOptions {
  connection: AbstractConnection;
  filter: ethers.EventFilter;
  callback: ethers.Listener;
}

export class EventListener extends Listener<EventListenerOptions> {
  start() {
    super.start();
    this.options.connection.on(this.options.filter, this.options.callback);
  }

  stop() {
    super.stop();
    this.options.connection.removeListener(this.options.filter, this.options.callback);
  }
}
