# Nesthers


## Description

The Nesthers Module is a convenient integration of the [ethers.js](https://github.com/ethers-io/ethers.js) library into NestJS applications. This module aims to simplify the interaction with Ethereum blockchain features such as smart contracts, wallets, events, and more, providing a seamless and developer-friendly experience within the NestJS framework.


## Installation

Install the module via npm:

```sh
npm install nesthers
```

Install the module via yarn:

```sh
yarn add nesthers
```


## Features
- **Connection Configuration:** Configure the Ethereum provider to connect to your preferred network (e.g., mainnet, testnet).
- **Wallet Management:** Manage Ethereum wallets effortlessly for secure transactions.
- **Smart Contract Interaction:** Easily interact with Ethereum smart contracts using the provided service methods.
- **Event Handling:** Streamline the handling of Ethereum events for real-time updates.
- **Block Handling:** Streamline the handling of Ethereum blocks for real-time updates.


## Usage
1. Module initialization
```ts
import { Module } from "@nestjs/common";
import { EthersModule, JsonRpcConnection } from "nesthers";

@Module({
  imports: [
    EthersModule.forRoot({
      connection: {
        name: "Connection", // is option
        instace: new JsonRpcConnection({
          url: "<URL>",
        }),
        wallets: [], // is option
        contracts: [], // is option
      },
    }),
  ],
})
export class AppModule {}
```
2. Inject Connection
```ts
import { Injectable } from "@nestjs/common";
import { InjectConnection, JsonRpcConnection } from "nesthers";

@Injectable()
export class AppService {
  constructor(
    @InjectConnection("Conection") // name is option
    private readonly connection: JsonRpcConnection,
  ) {}
}
```
3. WalletBuilder
```ts
import { WalletBuilder, Wallet } from "nesthers";

@WalletBuilder({
  privateKey: "0x0...",
})
export class AliceWallet extends Wallet {
  // you can add your own functionality here
}
```
4. InjectWallet
```ts
import { Injectable } from "@nestjs/common";
import { InjectWallet } from "nesthers";
import { AliceWallet } from "./wallets/alice.wallet";

@Injectable()
export class AppService {
  constructor(
    @InjectWallet(AliceWallet.name) // name is require
    private readonly alice: AliceWallet,
  ) {}
}
```
5. ContractBuilder
```ts
import { ContractBuilder, Contract } from "nesthers";

@ContractBuilder({
  address: "0x0...",
  abi: [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      ...
    },
    ...
  ],
})
export class TokenContract extends Contract {
  // you can add your own functionality here
}
```
6. InjectContract
```ts
import { Injectable } from "@nestjs/common";
import { InjectContract } from "nesthers";
import { TokenContract } from "./contracts/token.contract";

@Injectable()
export class AppService {
  constructor(
    @InjectContract(TokenContract.name) // name is require
    private readonly token: TokenContract,
  ) {}
}
```
7. OnBlock
```ts
import { Injectable } from "@nestjs/common";
import { OnBlock, Arg } from "nesthers";

@Injectable()
export class AppService {
  @OnBlock({})
  newBlockHandler(@Arg("hash") hash: string) {
    console.log(hash);
  }
}
```
8. OnEvent
```ts
import { Injectable } from "@nestjs/common";
import { OnEvent, Arg } from "nesthers";

@Injectable()
export class AppService {
  @OnEvent({
    address: "0x0...",
    topics: [ /* args */ ],
  })
  newEventHandler(@Arg("hash") hash: string) {
    console.log(hash);
  }
}
```


## License

nesthers is [MIT licensed](LICENSE).
