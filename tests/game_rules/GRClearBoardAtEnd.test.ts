import { GRLastStoneInBank } from '../../src/common/game_rules/GRLastStoneInBank';
import { GRLastStoneInEmptyPit } from '../../src/common/game_rules/GRLastStoneInEmptyPit';
import { GRClearBoardAtEnd } from '../../src/common/game_rules/GRClearBoardAtEnd';
import { Board } from '../../src/core/Board';
import { MancalaGame } from '../../src/core/MancalaGame';

function createGame(): MancalaGame {
  const board = new Board(6, 4);
  const player1Id = '0';
  const player2Id = '1';
  const game = new MancalaGame('0', board, player1Id, player2Id, player1Id, [
    new GRLastStoneInEmptyPit(),
    new GRLastStoneInBank(),
    new GRClearBoardAtEnd()
  ]);
  return game;
}

describe('GRClearBoardAtEnd Test', () => {
  test('test GRClearBoardAtEnd 1', () => {
    const game = createGame();
    game.board.fillPlayer1Pits(0);
    game.board.fillPlayer2Pits(0);
    game.board.player1Pits[5].stoneCount = 1;
    game.board.player2Pits[5].stoneCount = 1;
    game.moveByPlayerPit('0', 5);
    expect(game.board.player1Bank.stoneCount).toBe(2);
    expect(game.board.player2Bank.stoneCount).toBe(0);
    expect(
      game.board.player1Pits
        .map((pit) => pit.stoneCount)
        .reduce((sum, stoneCount) => sum + stoneCount, 0)
    ).toBe(0);
    expect(
      game.board.player2Pits
        .map((pit) => pit.stoneCount)
        .reduce((sum, stoneCount) => sum + stoneCount, 0)
    ).toBe(0);
  });
});
