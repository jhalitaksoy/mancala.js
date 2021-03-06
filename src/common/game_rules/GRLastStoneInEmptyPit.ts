import { GameRule } from '../../core/GameRule';
import { MancalaGame } from '../../core/MancalaGame';

export class GRLastStoneInEmptyPit implements GameRule {
  onGameMoveStart(game: MancalaGame, index: number): void {}
  onGameMove(game: MancalaGame, index: number): void {}
  onGameMoveEnd(game: MancalaGame, index: number): void {
    index = game.board.getPitIndexCircularly(index);
    const pit = game.board.pits[index];
    const pitType = game.board.getPitTypeByIndex(index);
    if (pit.stoneCount === 1) {
      if (pitType === 'player1Pit' && game.isTurnPlayer1()) {
        const oppositePit =
          game.board.pits[game.board.getOppositePitIndex(index)];
        if (oppositePit.stoneCount > 0) {
          const player1BankIndex =
            game.board.pits[game.board.player1BankIndex()];
          player1BankIndex.stoneCount += 1 + oppositePit.stoneCount;
          oppositePit.stoneCount = 0;
          pit.stoneCount = 0;
        }
      } else if (pitType === 'player2Pit' && game.isTurnPlayer2()) {
        const oppositePit =
          game.board.pits[game.board.getOppositePitIndex(index)];
        if (oppositePit.stoneCount > 0) {
          const player2BankIndex =
            game.board.pits[game.board.player2BankIndex()];
          player2BankIndex.stoneCount += 1 + oppositePit.stoneCount;
          oppositePit.stoneCount = 0;
          pit.stoneCount = 0;
        }
      }
    }
  }
}
