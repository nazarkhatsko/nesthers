import { ethers } from "ethers";
import {
  AnkrConnectionOptions,
  AlchemyConnectionOptions,
  BrowserConnectionOptions,
  PocketConnectionOptions,
  InfuraConnectionOptions,
  SocketConnectionOptions,
  JsonRpcConnectionOptions,
} from "../intefaces/connection-options.interface";

export class AbstractConnection extends ethers.AbstractProvider {}

export class AnkrConnection extends ethers.AnkrProvider {
  constructor(options: AnkrConnectionOptions) {
    super(options.network, options.apiKey);
  }
}

export class AlchemyConnection extends ethers.AlchemyProvider {
  constructor(options: AlchemyConnectionOptions) {
    super(options.network, options.apiKey);
  }
}

export class BrowserConnection extends ethers.BrowserProvider {
  constructor(options: BrowserConnectionOptions) {
    super(options.ethereum, options.network);
  }
}

export class PocketConnection extends ethers.PocketProvider {
  constructor(options: PocketConnectionOptions) {
    super(options.network, options.applicationId, options.applicationSecret);
  }
}

export class InfuraConnection extends ethers.InfuraProvider {
  constructor(options: InfuraConnectionOptions) {
    super(options.network, options.projectId, options.projectSecret);
  }
}

export class SocketConnection extends ethers.SocketProvider {
  constructor(options: SocketConnectionOptions) {
    super(options.network);
  }
}

export class JsonRpcConnection extends ethers.JsonRpcProvider {
  constructor(options: JsonRpcConnectionOptions) {
    super(options.url, options.network, options.options);
  }
}
