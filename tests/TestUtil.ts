import { GRClearBoardAtEnd } from '../src/common/game_rules/GRClearBoardAtEnd';
import { GRLastStoneInBank } from '../src/common/game_rules/GRLastStoneInBank';
import { GRLastStoneInEmptyPit } from '../src/common/game_rules/GRLastStoneInEmptyPit';
import { GRDoubleStoneInPit } from '../src/common/game_rules/GRDoubleStoneInPit';
import { Board } from '../src/core/Board';
import { MancalaGame } from '../src/core/MancalaGame';

export function createGame(): MancalaGame {
  const board = new Board(6, 4);
  const player1Id = '0';
  const player2Id = '1';
  const game = new MancalaGame(
    '0',
    board,
    player1Id,
    player2Id,
    player1Id,
    [
      new GRLastStoneInEmptyPit(),
      new GRDoubleStoneInPit(),
      new GRLastStoneInBank(),
      new GRClearBoardAtEnd()
    ],
    []
  );
  return game;
}
