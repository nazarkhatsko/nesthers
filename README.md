# NestJS Web3 Module
NestJS module for working with web3 applications (EVM)

```ts
import { Web3Module } from "nestjs-web3";

@Module({
  imports: [
    Web3Module.forRoot({
      provider: "http://localhost:8545",
      wallets: [],
      contracts: [],
    })
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
```

##### Injecting provider in service

```ts
import { Provider, InjectProvider } from "nestjs-web3";

export class AppService {
  constructor(
    @InjectProvider() readonly private provider: Provider,
  ) {}
}
```

##### Binding event for method

```solidity
event Minted(uint256 tokenId, uint256 amount);
```

```ts
@BindEvent(TokenContract, "Minted")
minted(
  @ParamEvent("tokenId") tokenId: number,
  @ParamEvent("amount") amount: number,
) {
  console.log("Token minted", tokenId, amount);
}
```

##### Binding transaction for method

```solidity
function mint(uint256 tokenId, uint256 amount) external;
```

```ts
@BindTransaction(TokenContract, "mint")
mint(
  @ParamEvent("tokenId") tokenId: number,
  @ParamEvent("amount") amount: number,
) {
  console.log("Token minting", tokenId, amount);
}
```
