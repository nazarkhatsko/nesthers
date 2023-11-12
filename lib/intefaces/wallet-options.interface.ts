export interface WalletOptions {
  random?: boolean;
  privateKey?: string;
  mnemonic?: {
    phrase: string[];
    derivePath?: string;
  };
}
