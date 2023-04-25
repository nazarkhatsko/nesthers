export interface WalletOptions {
  name: string;
  secretKey: string | (() => string);
}

export function Wallet(options: WalletOptions) {
  return (constructor: Function) => {
    // will be implemented ...
  };
}
