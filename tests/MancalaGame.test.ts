import { GameStep, MoveHistoryItem } from '../src/core/HistoryItem';
import { GAME_STEP_GAME_MOVE, MancalaGame } from '../src/core/MancalaGame';
import { createGame } from './TestUtil';

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
    const historyItem1 = new MoveHistoryItem(
      player1Id,
      0,
      [1, 5, 5, 5, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0],
      [
        new GameStep(0, GAME_STEP_GAME_MOVE),
        new GameStep(1, GAME_STEP_GAME_MOVE),
        new GameStep(2, GAME_STEP_GAME_MOVE),
        new GameStep(3, GAME_STEP_GAME_MOVE)
      ]
    );
    const historyItem2 = new MoveHistoryItem(
      player2Id,
      7,
      [1, 5, 5, 5, 4, 4, 0, 1, 5, 5, 5, 4, 4, 0],
      [
        new GameStep(7, GAME_STEP_GAME_MOVE),
        new GameStep(8, GAME_STEP_GAME_MOVE),
        new GameStep(9, GAME_STEP_GAME_MOVE),
        new GameStep(10, GAME_STEP_GAME_MOVE)
      ]
    );
    const historyItem3 = new MoveHistoryItem(
      player1Id,
      1,
      [1, 1, 6, 6, 5, 5, 0, 1, 5, 5, 5, 4, 4, 0],
      [
        new GameStep(1, GAME_STEP_GAME_MOVE),
        new GameStep(2, GAME_STEP_GAME_MOVE),
        new GameStep(3, GAME_STEP_GAME_MOVE),
        new GameStep(4, GAME_STEP_GAME_MOVE),
        new GameStep(5, GAME_STEP_GAME_MOVE)
      ]
    );
    const historyItem4 = new MoveHistoryItem(
      player2Id,
      8,
      [1, 1, 6, 6, 5, 5, 0, 1, 1, 6, 6, 5, 5, 0],
      [
        new GameStep(8, GAME_STEP_GAME_MOVE),
        new GameStep(9, GAME_STEP_GAME_MOVE),
        new GameStep(10, GAME_STEP_GAME_MOVE),
        new GameStep(11, GAME_STEP_GAME_MOVE),
        new GameStep(12, GAME_STEP_GAME_MOVE)
      ]
    );
    expect(game.history[0]).toStrictEqual(historyItem1);
    expect(game.history[1]).toStrictEqual(historyItem2);
    expect(game.history[2]).toStrictEqual(historyItem3);
    expect(game.history[3]).toStrictEqual(historyItem4);
  });
});
