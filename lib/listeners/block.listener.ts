import { ethers } from "ethers";
import { Listener } from "../common/listener";
import { AbstractConnection } from "../common/connection";

export interface BlockListenerOptions {
  connection: AbstractConnection;
  callback: ethers.Listener;
}

export class BlockListener extends Listener<BlockListenerOptions> {
  start() {
    super.start();
    this.options.connection.on("block", this.options.callback);
  }

  stop() {
    super.stop();
    this.options.connection.removeListener("block", this.options.callback);
  }
}
