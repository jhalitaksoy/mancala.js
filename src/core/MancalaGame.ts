import { Board, PitType } from './Board';
import { GameRule } from './GameRule';

export type GameState = 'initial' | 'playing' | 'ended';

export class MancalaGame {
  board: Board;
  player1Id: string;
  player2Id: string;
  turnPlayerId: string;
  state: GameState;
  gameRules: GameRule[];

  constructor(
    board: Board,
    player1Id: string,
    player2Id: string,
    turnPlayerId: string,
    gameRules: GameRule[],
    state: GameState = 'initial'
  ) {
    this.board = board;
    this.player1Id = player1Id;
    this.player2Id = player2Id;
    this.turnPlayerId = turnPlayerId;
    this.state = state;
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
    if (this.turnPlayerId === this.player1Id) {
      this.turnPlayerId = this.player2Id;
    } else {
      this.turnPlayerId = this.player1Id;
    }
  }

  isTurnPlayer1() {
    return this.player1Id === this.turnPlayerId;
  }

  isTurnPlayer2() {
    return this.player2Id === this.turnPlayerId;
  }

  getPlayerIdByPitType(pitType: PitType): string {
    if (pitType === 'player1Pit' || pitType === 'player1Bank') {
      return this.player1Id;
    } else if (pitType === 'player2Pit' || pitType === 'player2Bank') {
      return this.player2Id;
    } else {
      throw new Error('Unknown pit type : ' + pitType);
    }
  }

  getPlayerIdByIndex(index: number): string {
    const pitType = this.board.getPitTypeByIndex(index);
    return this.getPlayerIdByPitType(pitType);
  }

  checkIsPlayerTurnByIndex(index: number): boolean {
    const playerId = this.getPlayerIdByIndex(index);
    return this.checkIsPlayerTurn(playerId);
  }

  getBoardIndexByPlayerId(playerId: string, pitIndex: number) {
    if (this.player1Id === playerId) {
      return this.board.player1PitStartIndex() + pitIndex;
    } else if (this.player2Id === playerId) {
      return this.board.player2PitStartIndex() + pitIndex;
    } else {
      return -1; // throwing an error might be better
    }
  }

  public checkIsPlayerTurn(playerId: string) {
    return playerId === this.turnPlayerId;
  }

  public checkPitIndexForPlayerId(playerId: string, pitIndex: number) {
    const foundPlayerId = this.getPlayerIdByIndex(
      this.getBoardIndexByPlayerId(playerId, pitIndex)
    );
    return playerId === foundPlayerId;
  }

  public checkIsPitIndexBank(playerId: string, pitIndex: number) {
    const pitType = this.board.getPitTypeByIndex(
      this.getBoardIndexByPlayerId(playerId, pitIndex)
    );
    return pitType === 'player1Bank' || pitType === 'player2Bank';
  }

  public canPlayerMove(playerId: string, pitIndex: number) {
    const isPitIndexCorrect = this.checkPitIndexForPlayerId(playerId, pitIndex);
    const isPitIndexBank = this.checkIsPitIndexBank(playerId, pitIndex);
    const isPlayerTurn = this.checkIsPlayerTurn(playerId);
    return isPitIndexCorrect && !isPitIndexBank && isPlayerTurn;
  }

  public moveByPlayerPit(playerId: string, pitIndex: number) {
    if (this.state === 'ended') return;
    if (this.state === 'initial') {
      this.state = 'playing';
    }
    if (this.canPlayerMove(playerId, pitIndex)) {
      this.board.move(this.getBoardIndexByPlayerId(playerId, pitIndex));
      if (this.checkGameIsEnded()) {
        this.state = 'ended';
      }
    } else {
      const isPitIndexCorrect = this.checkPitIndexForPlayerId(
        playerId,
        pitIndex
      );
      const isPlayerTurn = this.checkIsPlayerTurn(playerId);
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

  public checkGameIsEnded(): boolean {
    if (
      this.getPlayer1StoneCountInPits() === 0 ||
      this.getPlayer2StoneCountInPits() === 0
    ) {
      return true;
    }
    return false;
  }

  public getWonPlayerId(): string | null {
    if (this.checkGameIsEnded()) {
      if (
        this.board.player1Bank.stoneCount > this.board.player2Bank.stoneCount
      ) {
        return this.player1Id;
      } else {
        return this.player2Id;
      }
    }
    return null;
  }

  public static createFromMancalaGame(mancalaGame: MancalaGame): MancalaGame {
    return new MancalaGame(
      new Board(
        mancalaGame.board.playerPitCount,
        mancalaGame.board.initialStoneCountInPits,
        mancalaGame.board.pits
      ),
      mancalaGame.player1Id,
      mancalaGame.player2Id,
      mancalaGame.turnPlayerId,
      mancalaGame.gameRules,
      mancalaGame.state
    );
  }
}
