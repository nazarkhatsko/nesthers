// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Chess {
  enum Status {
    Started,
    Paused,
    Finished
  }

  struct Point {
    uint8 x;
    uint8 y;
  }

  Status public status;
  address public player1;
  address public player2;
  mapping(uint256 => Point) public board;
  mapping(uint256 => Status) public pieces;

  event GameStarted(address player1, address player2);
  event GamePaused(address player);
  event GameFinished(address player);
  event PieceMoved(uint256 pieceId, Point to);

  modifier onlyPlayers() {
    require(msg.sender == player1 || msg.sender == player2, "Only players can pause the game");
    _;
  }

  function start(address p1, address p2) external {
    require(status == Status.Finished, "Game is not finished");

    status = Status.Started;
    player1 = p1;
    player2 = p2;

    emit GameStarted(p1, p2);
  }

  function pause() external onlyPlayers {
    require(status == Status.Started, "Game is not started");

    status = Status.Paused;

    emit GamePaused(msg.sender);
  }

  function finish() external onlyPlayers {
    require(status == Status.Started, "Game is not started");

    status = Status.Finished;
    player1 = address(0);
    player2 = address(0);

    emit GameFinished(msg.sender);
  }

  function move(uint256 pieceId, Point memory to) external {
    board[pieceId] = to;

    emit PieceMoved(pieceId, to);
  }
}
