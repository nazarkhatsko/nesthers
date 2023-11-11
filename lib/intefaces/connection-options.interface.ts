import { ethers } from "ethers";
import { AbstractConnection } from "../common/connection";

export interface ConnectionOptions {
  // name?: string;
  instance: AbstractConnection;
}

export interface AnkrConnectionOptions {
  network?: ethers.Networkish;
  apiKey?: null | string;
}

export interface AlchemyConnectionOptions {
  network?: ethers.Networkish;
  apiKey?: null | string;
}

export interface BrowserConnectionOptions {
  ethereum: ethers.Eip1193Provider;
  network?: ethers.Networkish;
}

export interface PocketConnectionOptions {
  network?: ethers.Networkish;
  applicationId?: null | string;
  applicationSecret?: null | string;
}

export interface InfuraConnectionOptions {
  network?: ethers.Networkish;
  projectId?: null | string;
  projectSecret?: null | string;
}

export interface SocketConnectionOptions {
  network?: ethers.Networkish;
}

export interface JsonRpcConnectionOptions {
  url?: string | ethers.FetchRequest;
  network?: ethers.Networkish;
  options?: ethers.JsonRpcApiProviderOptions;
}
