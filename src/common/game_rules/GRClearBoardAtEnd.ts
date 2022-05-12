import { Board } from '../../core/Board';
import { GameRule } from '../../core/GameRule';
import { GameStep } from '../../core/HistoryItem';
import { MancalaGame } from '../../core/MancalaGame';

export const GAME_STEP_BOARD_CLEARED = 'GAME_STEP_BOARD_CLEARED';

export type ClearBoardAtEndData = { pitIndexesThatHasStone: number[] };

export class GRClearBoardAtEnd implements GameRule {
  onGameMoveStart(game: MancalaGame, index: number): void {}
  onGameMove(game: MancalaGame, index: number): void {}
  onGameMoveEnd(game: MancalaGame, index: number): void {
    if (game.getPlayer1StoneCountInPits() === 0) {
      const clearBoardAtEndData = {
        pitIndexesThatHasStone: this.getPitIndexesThatHasStone(game.board)
      };
      game.board.player1Bank.stoneCount += game.getPlayer2StoneCountInPits();
      game.board.clearPlayer2Pits();
      this.addGameStep(game, index, clearBoardAtEndData);
    } else if (game.getPlayer2StoneCountInPits() === 0) {
      const clearBoardAtEndData = {
        pitIndexesThatHasStone: this.getPitIndexesThatHasStone(game.board)
      };
      game.board.player2Bank.stoneCount += game.getPlayer1StoneCountInPits();
      game.board.clearPlayer1Pits();
      this.addGameStep(game, index, clearBoardAtEndData);
    }
  }

  private getPitIndexesThatHasStone(board: Board): number[] {
    let index = 0;
    const indexList = [];
    for (const stoneCount of board.getStoneArray()) {
      if (stoneCount > 0 && board.checkPitTypeIsNormalPitByIndex(index)) {
        indexList.push(index);
      }
      index++;
    }
    return indexList;
  }

  private addGameStep(
    game: MancalaGame,
    index: number,
    clearBoardAtEndData: ClearBoardAtEndData
  ) {
    game.addGameStep(
      new GameStep(index, GAME_STEP_BOARD_CLEARED, clearBoardAtEndData)
    );
  }
}
