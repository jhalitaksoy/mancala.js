import { GameRule } from '../../core/GameRule';
import { MancalaGame } from '../../core/MancalaGame';

export class GRLastStoneInBank implements GameRule {
  onGameMoveStart(game: MancalaGame, index: number): void {}
  onGameMove(game: MancalaGame, index: number): void {}
  onGameMoveEnd(game: MancalaGame, index: number): void {
    const pitType = game.board.getPitTypeByIndex(index);
    if (
      (pitType === 'player1Bank' && game.isTurnPlayer1()) ||
      (pitType === 'player2Bank' && game.isTurnPlayer2())
    ) {
    } else {
      game.changePlayerTurn();
    }
  }
}
