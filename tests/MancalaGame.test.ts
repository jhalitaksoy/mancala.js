import { GRLastStoneInBank } from '../src/common/game_rules/GRLastStoneInBank';
import { GRLastStoneInEmptyPit } from '../src/common/game_rules/GRLastStoneInEmptyPit';
import { Board } from '../src/core/Board';
import { MancalaGame } from '../src/core/MancalaGame';
import { Player } from '../src/core/Player';

function createGame(): MancalaGame {
  const board = new Board(6, 4);
  const player1 = new Player('0', 'player1');
  const player2 = new Player('1', 'player2');
  const game = new MancalaGame(board, player1, player2, player1.id, [
    new GRLastStoneInEmptyPit(),
    new GRLastStoneInBank()
  ]);
  return game;
}

describe('Game Test', () => {
  test('test getPlayerByIndex', () => {
    const game = createGame();
    const player1 = new Player('0', 'player1');
    const player2 = new Player('1', 'player2');
    expect(game.getPlayerByIndex(0)).toStrictEqual(player1);
    expect(game.getPlayerByIndex(1)).toStrictEqual(player1);
    expect(game.getPlayerByIndex(2)).toStrictEqual(player1);
    expect(game.getPlayerByIndex(3)).toStrictEqual(player1);
    expect(game.getPlayerByIndex(4)).toStrictEqual(player1);
    expect(game.getPlayerByIndex(5)).toStrictEqual(player1);
    expect(game.getPlayerByIndex(6)).toStrictEqual(player1);
    expect(game.getPlayerByIndex(7)).toStrictEqual(player2);
    expect(game.getPlayerByIndex(8)).toStrictEqual(player2);
    expect(game.getPlayerByIndex(9)).toStrictEqual(player2);
    expect(game.getPlayerByIndex(10)).toStrictEqual(player2);
    expect(game.getPlayerByIndex(11)).toStrictEqual(player2);
    expect(game.getPlayerByIndex(12)).toStrictEqual(player2);
    expect(game.getPlayerByIndex(13)).toStrictEqual(player2);
  });
  test('test canPlayerMove', () => {
    const game = createGame();
    const player1 = new Player('0', 'player1');
    const player2 = new Player('1', 'player2');
    expect(game.canPlayerMove(player1, 0)).toBe(true);
    expect(game.canPlayerMove(player1, 1)).toBe(true);
    expect(game.canPlayerMove(player1, 2)).toBe(true);
    expect(game.canPlayerMove(player1, 3)).toBe(true);
    expect(game.canPlayerMove(player1, 4)).toBe(true);
    expect(game.canPlayerMove(player1, 5)).toBe(true);
    expect(game.canPlayerMove(player1, 6)).toBe(false);
    expect(game.canPlayerMove(player2, 0)).toBe(false);
  });

  test('test moveByPlayerPit', () => {
    const game = createGame();
    const player1 = new Player('0', 'player1');
    const player2 = new Player('1', 'player2');
    expect(game.state).toBe('initial');
    expect(game.turnPlayerId).toBe(player1.id);

    game.moveByPlayerPit(player1, 0);
    expect(game.state).toBe('playing');
    expect(game.turnPlayerId).toBe(player2.id);

    game.moveByPlayerPit(player2, 0);
    expect(game.state).toBe('playing');
    expect(game.turnPlayerId).toBe(player1.id);
  });

  test('test game end test', () => {
    const game = createGame();
    const player1 = new Player('0', 'player1');
    const player2 = new Player('1', 'player2');
    expect(game.state).toBe('initial');
    game.board.pits[0].stoneCount = 0;
    game.board.pits[1].stoneCount = 0;
    game.board.pits[2].stoneCount = 0;
    game.board.pits[3].stoneCount = 0;
    game.board.pits[4].stoneCount = 0;
    game.board.pits[5].stoneCount = 1;
    game.moveByPlayerPit(player1, 5);
    expect(game.state).toBe('ended');
  });

  test('test last stone in bank', () => {
    const game = createGame();
    const player1 = new Player('0', 'player1');
    const player2 = new Player('1', 'player2');
    expect(game.state).toBe('initial');
    expect(game.turnPlayerId).toBe(player1.id);

    game.moveByPlayerPit(player1, 3);
    expect(game.state).toBe('playing');
    expect(game.turnPlayerId).toBe(player1.id);
  });

  test('test empty pit 1', () => {
    const game = createGame();
    const player1 = new Player('0', 'player1');
    const player2 = new Player('1', 'player2');
    expect(game.state).toBe('initial');
    game.board.pits[0].stoneCount = 1;
    game.board.pits[1].stoneCount = 0;
    game.moveByPlayerPit(player1, 0);
    expect(game.state).toBe('playing');
    expect(game.turnPlayerId).toBe(player2.id);
    expect(game.board.getStoneArray()).toStrictEqual([
      0, 0, 4, 4, 4, 4, 5, 4, 0, 4, 4, 4, 4, 0
    ]);
  });
});
