import { GAME_STEP_GAME_MOVE } from '../../src/core/MancalaGame';
import { GameStep } from '../../src/core/HistoryItem';
import { createGame } from '../TestUtil';
import { GAME_STEP_LAST_STONE_IN_EMPTY_PIT } from '../../src/common/game_rules/GRLastStoneInEmptyPit';

describe('GRClearBoardAtEnd Test', () => {
  test('test GRClearBoardAtEnd 1', () => {
    const game = createGame();
    const board = game.board;
    const initialBoard = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
    expect(board.getStoneArray()).toStrictEqual(initialBoard);
    game.board.player1Pits[0].stoneCount = 1;
    game.board.player1Pits[1].stoneCount = 0;
    expect(board.getStoneArray()).toStrictEqual([
      1, 0, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0
    ]);
    game.moveByPlayerPit('0', 0);
    expect(board.getStoneArray()).toStrictEqual([
      0, 0, 4, 4, 4, 4, 5, 4, 4, 4, 4, 0, 4, 0
    ]);

    expect(game.history[0].gameSteps).toStrictEqual([
      new GameStep(1, GAME_STEP_GAME_MOVE),
      new GameStep(1, GAME_STEP_LAST_STONE_IN_EMPTY_PIT, { oppositeIndex: 11 })
    ]);
  });
});
