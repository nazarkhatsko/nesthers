import { Wallet } from "src";

@Wallet({
  name: "White",
  secretKey: () => process.env.WHITE_SECRET_KEY,
})
export class WhiteWallet {}
