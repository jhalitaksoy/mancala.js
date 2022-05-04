import { Board } from '../src/core/Board';

describe('Board Test', () => {
  test('test getPitTypeByIndex', () => {
    const board = new Board(6, 4);
    expect(board.getPitTypeByIndex(0)).toBe('player1Pit');
    expect(board.getPitTypeByIndex(1)).toBe('player1Pit');
    expect(board.getPitTypeByIndex(2)).toBe('player1Pit');
    expect(board.getPitTypeByIndex(3)).toBe('player1Pit');
    expect(board.getPitTypeByIndex(4)).toBe('player1Pit');
    expect(board.getPitTypeByIndex(5)).toBe('player1Pit');
    expect(board.getPitTypeByIndex(6)).toBe('player1Bank');
    expect(board.getPitTypeByIndex(7)).toBe('player2Pit');
    expect(board.getPitTypeByIndex(8)).toBe('player2Pit');
    expect(board.getPitTypeByIndex(9)).toBe('player2Pit');
    expect(board.getPitTypeByIndex(10)).toBe('player2Pit');
    expect(board.getPitTypeByIndex(11)).toBe('player2Pit');
    expect(board.getPitTypeByIndex(12)).toBe('player2Pit');
    expect(board.getPitTypeByIndex(13)).toBe('player2Bank');
    expect(() => board.getPitTypeByIndex(-1)).toThrowError();
    expect(() => board.getPitTypeByIndex(14)).toThrowError();
  });
  test('test checkIndex', () => {
    const board = new Board(6, 4);
    expect(board.checkIndex(0)).toBe(true);
    expect(board.checkIndex(1)).toBe(true);
    expect(board.checkIndex(2)).toBe(true);
    expect(board.checkIndex(4)).toBe(true);
    expect(board.checkIndex(5)).toBe(true);
    expect(board.checkIndex(6)).toBe(true);
    expect(board.checkIndex(7)).toBe(true);
    expect(board.checkIndex(8)).toBe(true);
    expect(board.checkIndex(9)).toBe(true);
    expect(board.checkIndex(10)).toBe(true);
    expect(board.checkIndex(11)).toBe(true);
    expect(board.checkIndex(12)).toBe(true);
    expect(board.checkIndex(13)).toBe(true);
    expect(board.checkIndex(14)).toBe(false);
    expect(board.checkIndex(-1)).toBe(false);
  });
  test('test getPitIndexCircularly', () => {
    const board = new Board(6, 4);
    expect(board.getPitIndexCircularly(0)).toBe(0);
    expect(board.getPitIndexCircularly(1)).toBe(1);
    expect(board.getPitIndexCircularly(2)).toBe(2);
    expect(board.getPitIndexCircularly(3)).toBe(3);
    expect(board.getPitIndexCircularly(4)).toBe(4);
    expect(board.getPitIndexCircularly(5)).toBe(5);
    expect(board.getPitIndexCircularly(6)).toBe(6);
    expect(board.getPitIndexCircularly(7)).toBe(7);
    expect(board.getPitIndexCircularly(8)).toBe(8);
    expect(board.getPitIndexCircularly(9)).toBe(9);
    expect(board.getPitIndexCircularly(10)).toBe(10);
    expect(board.getPitIndexCircularly(11)).toBe(11);
    expect(board.getPitIndexCircularly(12)).toBe(12);
    expect(board.getPitIndexCircularly(13)).toBe(13);
    expect(board.getPitIndexCircularly(14)).toBe(0);
    expect(board.getPitIndexCircularly(15)).toBe(1);
    expect(board.getPitIndexCircularly(16)).toBe(2);
  });
  test('test move', () => {
    const board = new Board(6, 4);
    const initialBoard = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
    expect(board.getStoneArray()).toStrictEqual(initialBoard);
    board.move(0);
    expect(board.getStoneArray()).toStrictEqual([
      1, 5, 5, 5, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0
    ]);
    board.move(0);
    expect(board.getStoneArray()).toStrictEqual([
      0, 6, 5, 5, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0
    ]);
    board.move(1);
    expect(board.getStoneArray()).toStrictEqual([
      0, 1, 6, 6, 5, 5, 1, 4, 4, 4, 4, 4, 4, 0
    ]);
    board.move(5);
    expect(board.getStoneArray()).toStrictEqual([
      0, 1, 6, 6, 5, 1, 2, 5, 5, 5, 4, 4, 4, 0
    ]);
  });
  test('test move 2', () => {
    const board = new Board(6, 4);
    board.pits[5].stoneCount = 15;
    const initialBoard = [4, 4, 4, 4, 4, 15, 0, 4, 4, 4, 4, 4, 4, 0];
    expect(board.getStoneArray()).toStrictEqual(initialBoard);
    board.move(5);
    expect(board.getStoneArray()).toStrictEqual([
      5, 5, 5, 5, 5, 2, 1, 5, 5, 5, 5, 5, 5, 1
    ]);
  });

  test('test getOppositePitIndex', () => {
    const board = new Board(6, 4);
    expect(board.getOppositePitIndex(0)).toBe(12);
    expect(board.getOppositePitIndex(1)).toBe(11);
    expect(board.getOppositePitIndex(2)).toBe(10);
    expect(board.getOppositePitIndex(3)).toBe(9);
    expect(board.getOppositePitIndex(4)).toBe(8);
    expect(board.getOppositePitIndex(5)).toBe(7);
    expect(board.getOppositePitIndex(7)).toBe(5);
    expect(board.getOppositePitIndex(8)).toBe(4);
    expect(board.getOppositePitIndex(9)).toBe(3);
    expect(board.getOppositePitIndex(10)).toBe(2);
    expect(board.getOppositePitIndex(11)).toBe(1);
    expect(board.getOppositePitIndex(12)).toBe(0);
  });
});
