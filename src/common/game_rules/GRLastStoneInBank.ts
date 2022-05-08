import { GameRule } from '../../core/GameRule';
import { GameStep } from '../../core/HistoryItem';
import { MancalaGame } from '../../core/MancalaGame';

export const GAME_STEP_LAST_STONE_IN_BANK = 'GAME_STEP_LAST_STONE_IN_BANK';

export class GRLastStoneInBank implements GameRule {
  onGameMoveStart(game: MancalaGame, index: number): void {}
  onGameMove(game: MancalaGame, index: number): void {}
  onGameMoveEnd(game: MancalaGame, index: number): void {
    index = game.board.getPitIndexCircularly(index);
    const pitType = game.board.getPitTypeByIndex(index);
    if (
      (pitType === 'player1Bank' && game.isTurnPlayer1()) ||
      (pitType === 'player2Bank' && game.isTurnPlayer2())
    ) {
      game.addGameStep(new GameStep(index, GAME_STEP_LAST_STONE_IN_BANK));
    } else {
      game.changePlayerTurn();
    }
  }
}
