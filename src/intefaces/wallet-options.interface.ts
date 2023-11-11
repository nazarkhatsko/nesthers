export interface WalletOptions {
  name?: string;
  random?: boolean;
  privateKey?: string;
  mnemonic?: {
    phrase: string[];
    derivePath?: string;
  };
}
