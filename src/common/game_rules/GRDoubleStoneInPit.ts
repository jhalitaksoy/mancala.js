import { GameRule } from '../../core/GameRule';
import { GameStep } from '../../core/HistoryItem';
import { MancalaGame } from '../../core/MancalaGame';

export const GAME_STEP_DOUBLE_STONE_IN_PIT = 'GAME_STEP_DOUBLE_STONE_IN_PIT';

export type DoubleStoneInPitData = { pitIndex: number; bankIndex: number };

export class GRDoubleStoneInPit implements GameRule {
  onGameMoveStart(game: MancalaGame, index: number): void {}
  onGameMove(game: MancalaGame, index: number): void {}
  onGameMoveEnd(game: MancalaGame, index: number): void {
    index = game.board.getPitIndexCircularly(index);
    const pit = game.board.pits[index];
    const pitType = game.board.getPitTypeByIndex(index);
    if (pit.stoneCount % 2 === 0) {
      if (pitType === 'player1Pit' && game.isTurnPlayer2()) {
        const pitIndex = index;
        const bankIndex = game.board.player2BankIndex();
        game.board.player2Bank.stoneCount +=
          game.board.getPitCircularly(pitIndex).stoneCount;
        game.board.getPitCircularly(pitIndex).stoneCount = 0;
        this.addGameStep(game, index, { pitIndex, bankIndex });
      } else if (pitType === 'player2Pit' && game.isTurnPlayer1()) {
        const pitIndex = index;
        const bankIndex = game.board.player1BankIndex();
        game.board.player1Bank.stoneCount +=
          game.board.getPitCircularly(pitIndex).stoneCount;
        game.board.getPitCircularly(pitIndex).stoneCount = 0;
        this.addGameStep(game, index, { pitIndex, bankIndex });
      }
    }
  }

  private addGameStep(
    game: MancalaGame,
    index: number,
    doubleStoneInPitData: DoubleStoneInPitData
  ) {
    game.addGameStep(
      new GameStep(index, GAME_STEP_DOUBLE_STONE_IN_PIT, doubleStoneInPitData)
    );
  }
}
