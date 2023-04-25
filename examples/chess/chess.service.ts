import { Injectable } from "@nestjs/common";
import { InjectWallet, InjectContract, BindEvent, ParamEvent } from "src";
import { WhiteWallet } from "./wallets/white.wallet";
import { BlackWallet } from "./wallets/black.wallet";
import { ChessContract } from "./contracts/chess.contract";

@Injectable()
export class ChessService {
  constructor(
    @InjectWallet(WhiteWallet) private readonly whiteWallet: WhiteWallet,
    @InjectWallet(BlackWallet) private readonly blackWallet: BlackWallet,
    @InjectContract(ChessContract) private readonly chessContract: ChessContract,
  ) {}

  @BindEvent(ChessContract, "GameStarted")
  gameStarted(
    @ParamEvent("player") player: string,
  ) {
    console.log("Game started", player);
  }

  @BindEvent(ChessContract, "GamePaused")
  gamePaused(
    @ParamEvent("player") player: string,
  ) {
    console.log("Game paused", player);
  }

  @BindEvent(ChessContract, "GameFinished")
  gameFinished(
    @ParamEvent("player") player: string,
  ) {
    console.log("Game finished", player);
  }

  @BindEvent(ChessContract, "PieceMoved")
  pieceMoved(
    @ParamEvent("player1") player1: string,
    @ParamEvent("player2") player2: string,
  ) {
    console.log("Game started", player1, player2);
  }
}
