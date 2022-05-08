import {
  GAME_STEP_LAST_STONE_IN_BANK,
  GRLastStoneInBank
} from '../../src/common/game_rules/GRLastStoneInBank';
import {
  GAME_STEP_LAST_STONE_IN_EMPTY_PIT,
  GRLastStoneInEmptyPit
} from '../../src/common/game_rules/GRLastStoneInEmptyPit';
import {
  GAME_STEP_BOARD_CLEARED,
  GRClearBoardAtEnd
} from '../../src/common/game_rules/GRClearBoardAtEnd';
import { Board } from '../../src/core/Board';
import { GAME_STEP_GAME_MOVE, MancalaGame } from '../../src/core/MancalaGame';
import { GameStep } from '../../src/core/HistoryItem';
import { createGame } from '../TestUtil';

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
