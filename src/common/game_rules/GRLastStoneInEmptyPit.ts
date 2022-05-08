import { GameRule } from '../../core/GameRule';
import { GameStep } from '../../core/HistoryItem';
import { MancalaGame } from '../../core/MancalaGame';

export const GAME_STEP_LAST_STONE_IN_EMPTY_PIT =
  'GAME_STEP_LAST_STONE_IN_EMPTY_PIT';

export type LastStoneInEmptyPitData = { oppositeIndex: number };

export class GRLastStoneInEmptyPit implements GameRule {
  onGameMoveStart(game: MancalaGame, index: number): void {}
  onGameMove(game: MancalaGame, index: number): void {}
  onGameMoveEnd(game: MancalaGame, index: number): void {
    index = game.board.getPitIndexCircularly(index);
    const pit = game.board.pits[index];
    const pitType = game.board.getPitTypeByIndex(index);
    if (pit.stoneCount === 1) {
      if (pitType === 'player1Pit' && game.isTurnPlayer1()) {
        const oppositeIndex = game.board.getOppositePitIndex(index);
        const oppositePit = game.board.pits[oppositeIndex];
        if (oppositePit.stoneCount > 0) {
          const player1BankIndex =
            game.board.pits[game.board.player1BankIndex()];
          player1BankIndex.stoneCount += 1 + oppositePit.stoneCount;
          oppositePit.stoneCount = 0;
          pit.stoneCount = 0;
          this.addGameStep(game, index, { oppositeIndex });
        }
      } else if (pitType === 'player2Pit' && game.isTurnPlayer2()) {
        const oppositeIndex = game.board.getOppositePitIndex(index);
        const oppositePit = game.board.pits[oppositeIndex];
        if (oppositePit.stoneCount > 0) {
          const player2BankIndex =
            game.board.pits[game.board.player2BankIndex()];
          player2BankIndex.stoneCount += 1 + oppositePit.stoneCount;
          oppositePit.stoneCount = 0;
          pit.stoneCount = 0;
          this.addGameStep(game, index, { oppositeIndex });
        }
      }
    }
  }

  private addGameStep(
    game: MancalaGame,
    index: number,
    data: LastStoneInEmptyPitData
  ) {
    game.addGameStep(
      new GameStep(index, GAME_STEP_LAST_STONE_IN_EMPTY_PIT, data)
    );
  }
}
