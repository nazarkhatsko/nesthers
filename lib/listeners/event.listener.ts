import { ethers } from "ethers";
import { Listener } from "../common/listener";
import { AbstractConnection } from "../common/connection";

export interface EventListenerOptions {
  connection: AbstractConnection;
  callback: ethers.Listener;
  args: any[];
  filter: EventListenerOptionsFilter;
}

export interface EventListenerOptionsFilter {
  address: ethers.AddressLike;
  topics?: ethers.TopicFilter;
  // fromBlock?: ethers.BlockTag;
  // toBlock?: ethers.BlockTag;
}

export class EventListener extends Listener<EventListenerOptions> {
  start() {
    super.start();
    // this.options.connection.on(this.options.filter, this.options.callback);
  }

  stop() {
    super.stop();
    // this.options.connection.removeListener(this.options.filter, this.options.callback);
  }
}
