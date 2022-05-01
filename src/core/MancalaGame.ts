import { Board, PitType } from './Board';
import { GameRule } from './GameRule';
import { Player } from './Player';

export type GameState = 'initial' | 'playing' | 'ended';

export class MancalaGame {
  board: Board;
  player1: Player;
  player2: Player;
  turnPlayerId: string;
  state: GameState;
  gameRules: GameRule[];

  constructor(
    board: Board,
    player1: Player,
    player2: Player,
    turnPlayerId: string,
    gameRules: GameRule[]
  ) {
    this.board = board;
    this.player1 = player1;
    this.player2 = player2;
    this.turnPlayerId = turnPlayerId;
    this.state = 'initial';
    this.gameRules = gameRules;
    this.listenBoardMoveEvents();
  }

  listenBoardMoveEvents() {
    this.board.onGameMoveStart = (index: number) => {
      this.gameRules.forEach((gameRule) => {
        gameRule.onGameMoveStart(this, index);
      });
    };
    this.board.onGameMove = (index: number) => {
      this.gameRules.forEach((gameRule) => {
        gameRule.onGameMove(this, index);
      });
    };
    this.board.onGameMoveEnd = (index: number) => {
      this.gameRules.forEach((gameRule) => {
        gameRule.onGameMoveEnd(this, index);
      });
    };
  }

  changePlayerTurn() {
    if (this.turnPlayerId === this.player1.id) {
      this.turnPlayerId = this.player2.id;
    } else {
      this.turnPlayerId = this.player1.id;
    }
  }

  isTurnPlayer1() {
    return this.player1.id === this.turnPlayerId;
  }

  isTurnPlayer2() {
    return this.player2.id === this.turnPlayerId;
  }

  getPlayerByPitType(pitType: PitType): Player {
    if (pitType === 'player1Pit' || pitType === 'player1Bank') {
      return this.player1;
    } else if (pitType === 'player2Pit' || pitType === 'player2Bank') {
      return this.player2;
    } else {
      throw new Error('Unknown pit type : ' + pitType);
    }
  }

  getPlayerByIndex(index: number): Player {
    const pitType = this.board.getPitTypeByIndex(index);
    return this.getPlayerByPitType(pitType);
  }

  checkIsPlayerTurnByIndex(index: number): boolean {
    const player = this.getPlayerByIndex(index);
    return this.checkIsPlayerTurn(player);
  }

  getBoardIndexByPlayer(player: Player, pitIndex: number) {
    if (this.player1.id === player.id) {
      return this.board.player1PitStartIndex() + pitIndex;
    } else if (this.player2.id === player.id) {
      return this.board.player2PitStartIndex() + pitIndex;
    } else {
      return -1; // throwing an error might be better
    }
  }

  public checkIsPlayerTurn(player: Player) {
    return player.id === this.turnPlayerId;
  }

  public checkPitIndexForPlayer(player: Player, pitIndex: number) {
    const foundPlayer = this.getPlayerByIndex(
      this.getBoardIndexByPlayer(player, pitIndex)
    );
    return player.id === foundPlayer.id;
  }

  public checkIsPitIndexBank(player: Player, pitIndex: number) {
    const pitType = this.board.getPitTypeByIndex(
      this.getBoardIndexByPlayer(player, pitIndex)
    );
    return pitType === 'player1Bank' || pitType === 'player2Bank';
  }

  public canPlayerMove(player: Player, pitIndex: number) {
    const isPitIndexCorrect = this.checkPitIndexForPlayer(player, pitIndex);
    const isPitIndexBank = this.checkIsPitIndexBank(player, pitIndex);
    const isPlayerTurn = this.checkIsPlayerTurn(player);
    return isPitIndexCorrect && !isPitIndexBank && isPlayerTurn;
  }

  public moveByPlayerPit(player: Player, pitIndex: number) {
    if (this.state === 'ended') return;
    if (this.state === 'initial') {
      this.state = 'playing';
    }
    if (this.canPlayerMove(player, pitIndex)) {
      this.board.move(this.getBoardIndexByPlayer(player, pitIndex));
      if (this.checkGameIsEnded()) {
        this.state = 'ended';
      }
    } else {
      const isPitIndexCorrect = this.checkPitIndexForPlayer(player, pitIndex);
      const isPlayerTurn = this.checkIsPlayerTurn(player);
      throw new Error(
        `Player cannot move reason : isPitIndexCorrect = ${isPitIndexCorrect} isPlayerTurn = ${isPlayerTurn}`
      );
    }
  }

  getPlayer1StoneCountInPits(): number {
    return this.getPlayerStoneCountInPits(
      this.board.player1PitStartIndex(),
      this.board.player1BankIndex()
    );
  }

  getPlayer2StoneCountInPits(): number {
    return this.getPlayerStoneCountInPits(
      this.board.player2PitStartIndex(),
      this.board.player2BankIndex()
    );
  }

  getPlayerStoneCountInPits(
    playerPitStartIndex: number,
    playerBankIndex: number
  ): number {
    const player2Pits = this.board.pits.slice(
      playerPitStartIndex,
      playerBankIndex
    );
    return player2Pits
      .map((pit) => pit.stoneCount)
      .reduce(
        (previousStoneCount, stoneCount) => previousStoneCount + stoneCount
      );
  }

  checkGameIsEnded(): boolean {
    if (
      this.getPlayer1StoneCountInPits() === 0 ||
      this.getPlayer2StoneCountInPits() === 0
    ) {
      return true;
    }
    return false;
  }
}
