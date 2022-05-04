import { GameRule } from '../../core/GameRule';
import { MancalaGame } from '../../core/MancalaGame';

export class GRClearBoardAtEnd implements GameRule {
  onGameMoveStart(game: MancalaGame, index: number): void {}
  onGameMove(game: MancalaGame, index: number): void {}
  onGameMoveEnd(game: MancalaGame, index: number): void {
    if (game.getPlayer1StoneCountInPits() === 0) {
      game.board.player1Bank.stoneCount += game.getPlayer2StoneCountInPits();
      game.board.clearPlayer2Pits();
    }
    if (game.getPlayer2StoneCountInPits() === 0) {
      game.board.player2Bank.stoneCount += game.getPlayer1StoneCountInPits();
      game.board.clearPlayer1Pits();
    }
  }
}
