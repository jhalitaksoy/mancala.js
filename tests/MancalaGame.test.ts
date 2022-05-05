import { GRClearBoardAtEnd } from '../src/common/game_rules/GRClearBoardAtEnd';
import { GRLastStoneInBank } from '../src/common/game_rules/GRLastStoneInBank';
import { GRLastStoneInEmptyPit } from '../src/common/game_rules/GRLastStoneInEmptyPit';
import { Board } from '../src/core/Board';
import { MoveHistoryItem } from '../src/core/HistoryItem';
import { MancalaGame } from '../src/core/MancalaGame';

function createGame(): MancalaGame {
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
      new GRLastStoneInBank(),
      new GRClearBoardAtEnd()
    ],
    []
  );
  return game;
}

describe('Game Test', () => {
  test('test getPlayerIdByIndex', () => {
    const game = createGame();
    const player1Id = '0';
    const player2Id = '1';
    expect(game.getPlayerIdByIndex(0)).toStrictEqual(player1Id);
    expect(game.getPlayerIdByIndex(1)).toStrictEqual(player1Id);
    expect(game.getPlayerIdByIndex(2)).toStrictEqual(player1Id);
    expect(game.getPlayerIdByIndex(3)).toStrictEqual(player1Id);
    expect(game.getPlayerIdByIndex(4)).toStrictEqual(player1Id);
    expect(game.getPlayerIdByIndex(5)).toStrictEqual(player1Id);
    expect(game.getPlayerIdByIndex(6)).toStrictEqual(player1Id);
    expect(game.getPlayerIdByIndex(7)).toStrictEqual(player2Id);
    expect(game.getPlayerIdByIndex(8)).toStrictEqual(player2Id);
    expect(game.getPlayerIdByIndex(9)).toStrictEqual(player2Id);
    expect(game.getPlayerIdByIndex(10)).toStrictEqual(player2Id);
    expect(game.getPlayerIdByIndex(11)).toStrictEqual(player2Id);
    expect(game.getPlayerIdByIndex(12)).toStrictEqual(player2Id);
    expect(game.getPlayerIdByIndex(13)).toStrictEqual(player2Id);
  });
  test('test canPlayerMove', () => {
    const game = createGame();
    const player1Id = '0';
    const player2Id = '1';
    expect(game.canPlayerMove(player1Id, 0)).toBe(true);
    expect(game.canPlayerMove(player1Id, 1)).toBe(true);
    expect(game.canPlayerMove(player1Id, 2)).toBe(true);
    expect(game.canPlayerMove(player1Id, 3)).toBe(true);
    expect(game.canPlayerMove(player1Id, 4)).toBe(true);
    expect(game.canPlayerMove(player1Id, 5)).toBe(true);
    expect(game.canPlayerMove(player1Id, 6)).toBe(false);
    expect(game.canPlayerMove(player2Id, 0)).toBe(false);
  });

  test('test moveByPlayerPit', () => {
    const game = createGame();
    const player1Id = '0';
    const player2Id = '1';
    expect(game.state).toBe('initial');
    expect(game.turnPlayerId).toBe(player1Id);

    game.moveByPlayerPit(player1Id, 0);
    expect(game.state).toBe('playing');
    expect(game.turnPlayerId).toBe(player2Id);

    game.moveByPlayerPit(player2Id, 0);
    expect(game.state).toBe('playing');
    expect(game.turnPlayerId).toBe(player1Id);
  });

  test('test game end test', () => {
    const game = createGame();
    const player1Id = '0';
    const player2Id = '1';
    expect(game.state).toBe('initial');
    game.board.pits[0].stoneCount = 0;
    game.board.pits[1].stoneCount = 0;
    game.board.pits[2].stoneCount = 0;
    game.board.pits[3].stoneCount = 0;
    game.board.pits[4].stoneCount = 0;
    game.board.pits[5].stoneCount = 1;
    game.moveByPlayerPit(player1Id, 5);
    expect(game.state).toBe('ended');
  });

  test('test last stone in bank', () => {
    const game = createGame();
    const player1Id = '0';
    const player2Id = '1';
    expect(game.state).toBe('initial');
    expect(game.turnPlayerId).toBe(player1Id);

    game.moveByPlayerPit(player1Id, 3);
    expect(game.state).toBe('playing');
    expect(game.turnPlayerId).toBe(player1Id);
  });

  test('test empty pit 1', () => {
    const game = createGame();
    const player1Id = '0';
    const player2Id = '1';
    expect(game.state).toBe('initial');
    game.board.pits[0].stoneCount = 1;
    game.board.pits[1].stoneCount = 0;
    game.moveByPlayerPit(player1Id, 0);
    expect(game.state).toBe('playing');
    expect(game.turnPlayerId).toBe(player2Id);
    expect(game.board.getStoneArray()).toStrictEqual([
      0, 0, 4, 4, 4, 4, 5, 4, 4, 4, 4, 0, 4, 0
    ]);
  });

  test('test game history', () => {
    const game = createGame();
    const player1Id = '0';
    const player2Id = '1';
    game.moveByPlayerPit(player1Id, 0);
    game.moveByPlayerPit(player2Id, 0);
    game.moveByPlayerPit(player1Id, 1);
    game.moveByPlayerPit(player2Id, 1);
    expect(game.history).toStrictEqual([
      new MoveHistoryItem(
        player1Id,
        0,
        [1, 5, 5, 5, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]
      ),
      new MoveHistoryItem(
        player2Id,
        7,
        [1, 5, 5, 5, 4, 4, 0, 1, 5, 5, 5, 4, 4, 0]
      ),
      new MoveHistoryItem(
        player1Id,
        1,
        [1, 1, 6, 6, 5, 5, 0, 1, 5, 5, 5, 4, 4, 0]
      ),
      new MoveHistoryItem(
        player2Id,
        8,
        [1, 1, 6, 6, 5, 5, 0, 1, 1, 6, 6, 5, 5, 0]
      )
    ]);
  });
});
