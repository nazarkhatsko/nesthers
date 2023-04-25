import { Wallet } from "src";

@Wallet({
  name: "Black",
  secretKey: () => process.env.BLACK_SECRET_KEY,
})
export class BlackWallet {}
