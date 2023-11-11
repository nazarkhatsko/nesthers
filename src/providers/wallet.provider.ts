import { Provider } from "@nestjs/common";
import { AbstractConnection } from "../common/connection";
import { getWalletToken } from "../utils/token.util";
import { getMetadata } from "../utils/metadata.util";
import { WalletBuilderOptions } from "../intefaces/wallet-builder-options.interface";
import { ETHERS_WALLET_BUILDER_OPTIONS } from "../ethers.constants";

export function getWalletProvider(wallet: any, connection?: any): Provider {
  const metadata = getMetadata<WalletBuilderOptions>(ETHERS_WALLET_BUILDER_OPTIONS, wallet);

  return {
    provide: getWalletToken(metadata.name ?? wallet.name),
    inject: [connection],
    useFactory: (connection?: AbstractConnection) => {
      return new wallet(metadata, connection);
    },
  };
}

export function getWalletProviders(wallets: any[], connection?: any): Provider[] {
  return wallets.map(wallet => getWalletProvider(wallet, connection));
}
