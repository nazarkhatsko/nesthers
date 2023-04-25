import { Module } from "@nestjs/common";
import { Web3Module } from "src";
import { ChessService } from "./chess.service";
import { WhiteWallet } from "./wallets/white.wallet";
import { BlackWallet } from "./wallets/black.wallet";
import { ChessContract } from "./contracts/chess.contract";

@Module({
  imports: [
    Web3Module.forRoot({
      provider: "http://localhost:8545",
      wallets: [WhiteWallet, BlackWallet],
      contracts: [ChessContract],
    })
  ],
  providers: [ChessService],
})
export class ChessModule {}
