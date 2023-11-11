import { Inject } from "@nestjs/common";
import { getWalletToken } from "../utils/token.util";

export function InjectWallet(name: string) {
  return Inject(getWalletToken(name));
}
