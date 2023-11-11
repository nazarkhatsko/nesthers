import { ethers } from "ethers";
import { Listener } from "../common/listener";
import { AbstractConnection } from "../common/connection";

export interface BlockListenerOptions {
  connection: AbstractConnection;
  callback: ethers.Listener;
  args: any[];
  filter: BlockListenerOptionsFilter;
}

export interface BlockListenerOptionsFilter {
  fromBlock?: ethers.BlockTag;
  toBlock?: ethers.BlockTag;
}

export class BlockListener extends Listener<BlockListenerOptions> {
  private _funcWrap: ethers.Listener;

  start() {
    super.start();
    this._funcWrap = async blockNumber => {
      const params = [];
      const data = await this.options.connection.getBlock(blockNumber);
      const args = this.options.args.sort((a, b) => {
        if (a.index < b.index) return -1;
        if (a.index > b.index) return 1;
        return 0;
      });
      for (const { key } of args) {
        if (key) {
          params.push(data[key]);
        } else {
          params.push(data);
        }
      }
      this.options.callback(...params);
    };

    this.options.connection.on("block", this._funcWrap);
  }

  stop() {
    super.stop();
    this.options.connection.removeListener("block", this._funcWrap);
  }
}
