import { GameStep } from '../../src/core/HistoryItem';
import { GAME_STEP_GAME_MOVE } from '../../src/core/MancalaGame';
import { createGame } from '../TestUtil';
import { GAME_STEP_DOUBLE_STONE_IN_PIT } from '../../src/common/game_rules/GRDoubleStoneInPit';

describe('GRDoubleStoneInPit Test', () => {
  test('test GRDoubleStoneInPit 1', () => {
    const game = createGame();
    const board = game.board;
    const initialBoard = [3, 4, 4, 4, 4, 3, 0, 3, 4, 4, 4, 4, 3, 0];
    game.board.pits[5].stoneCount = 3;
    game.board.pits[7].stoneCount = 3;
    game.board.pits[12].stoneCount = 3;
    game.board.pits[0].stoneCount = 3;
    expect(board.getStoneArray()).toStrictEqual(initialBoard);
    game.moveByPlayerPit('0', 5);
    expect(board.getStoneArray()).toStrictEqual([
      3, 4, 4, 4, 4, 1, 5, 0, 4, 4, 4, 4, 3, 0
    ]);
    expect(game.history[0].gameSteps).toStrictEqual([
      new GameStep(5, GAME_STEP_GAME_MOVE),
      new GameStep(6, GAME_STEP_GAME_MOVE),
      new GameStep(7, GAME_STEP_GAME_MOVE),
      new GameStep(7, GAME_STEP_DOUBLE_STONE_IN_PIT, {
        pitIndex: 7,
        bankIndex: 6
      })
    ]);
    game.moveByPlayerPit('1', 5);
    expect(board.getStoneArray()).toStrictEqual([
      0, 4, 4, 4, 4, 1, 5, 0, 4, 4, 4, 4, 1, 5
    ]);
    expect(game.history[game.history.length - 1].gameSteps).toStrictEqual([
      new GameStep(12, GAME_STEP_GAME_MOVE),
      new GameStep(13, GAME_STEP_GAME_MOVE),
      new GameStep(14, GAME_STEP_GAME_MOVE),
      new GameStep(0, GAME_STEP_DOUBLE_STONE_IN_PIT, {
        pitIndex: 0,
        bankIndex: 13
      })
    ]);
  });
});
