import { Bank, Pit } from './Pit';

const bankCount = 2;

export type PitType =
  | 'player1Pit'
  | 'player1Bank'
  | 'player2Pit'
  | 'player2Bank';

export class Board {
  pits: Pit[];
  playerPitCount: number;
  initialStoneCountInPits: number;

  onGameMoveStart: (index: number) => void = () => {};
  onGameMove: (index: number) => void = () => {};
  onGameMoveEnd: (index: number) => void = () => {};

  constructor(playerPitCount: number, initialStoneCountInPits: number) {
    this.playerPitCount = playerPitCount;
    this.initialStoneCountInPits = initialStoneCountInPits;
    this.pits = this.createPits(playerPitCount, initialStoneCountInPits);
  }

  createPits(playerPitCount: number, initialStoneCountInPits: number): Pit[] {
    const totalPitCount = playerPitCount + playerPitCount + bankCount;
    const pitArray = new Array<Pit>(totalPitCount);
    for (let index = 0; index < this.totalPitCount(); index++) {
      const pitType = this.getPitTypeByIndex(index);
      if (pitType === 'player1Pit' || pitType === 'player2Pit') {
        pitArray[index] = new Pit(initialStoneCountInPits);
      } else if (pitType === 'player1Bank' || pitType === 'player2Bank') {
        pitArray[index] = new Bank(0);
      }
    }
    return pitArray;
  }

  public player1PitStartIndex = () => 0;
  public player1PitStopIndex = () =>
    this.player1PitStartIndex() + this.playerPitCount - 1;
  public player1BankIndex = () => this.player1PitStopIndex() + 1;
  public player2PitStartIndex = () => this.player1BankIndex() + 1;
  public player2PitStopIndex = () =>
    this.player2PitStartIndex() + this.playerPitCount - 1;
  public player2BankIndex = () => this.player2PitStopIndex() + 1;
  public totalPitCount = () => this.player2BankIndex() + 1;

  public checkIndex(index: number): boolean {
    return (
      index >= this.player1PitStartIndex() && index <= this.player2BankIndex()
    );
  }

  checkIndeAndMaybeThrowError(index: number): void {
    if (!this.checkIndex(index)) {
      throw new Error(
        `IndexOutOfRange => index : ${index} [start, stop] = [${this.player1PitStartIndex()}, ${this.player2BankIndex()}]`
      );
    }
  }

  public getPitTypeByIndex(index: number): PitType {
    this.checkIndeAndMaybeThrowError(index);
    if (
      index >= this.player1PitStartIndex() &&
      index <= this.player1PitStopIndex()
    ) {
      return 'player1Pit';
    } else if (index === this.player1BankIndex()) {
      return 'player1Bank';
    } else if (index <= this.player2PitStopIndex()) {
      return 'player2Pit';
    } else {
      return 'player2Bank';
    }
  }

  public move(index: number) {
    this.checkIndeAndMaybeThrowError(index);
    const pitType = this.getPitTypeByIndex(index);
    if (pitType === 'player1Bank' || pitType === 'player2Bank') {
      throw new Error(`InCorrectPit => index : ${index} pitType = ${pitType}`);
    }
    const pit = this.pits[index];
    if (pit.stoneCount <= 0) {
      throw new Error(
        `StoneNotFound => index : ${index} stoneCount = ${pit.stoneCount}`
      );
    }
    const stepCount = pit.stoneCount;
    this.pits[index].stoneCount = 0;
    this.fireOnGameMoveStart(index);
    if (stepCount === 1) {
      this.fireOnGameMove(index);
      this.getNextPitCircularly(index).increaseStone();
      const nextPitIndex = this.getNextPitIndexCircularly(index);
      this.fireOnGameMove(nextPitIndex);
      this.fireOnGameMoveEnd(nextPitIndex);
    } else {
      for (let i = 0; i < stepCount; i++) {
        const pit = this.getPitCircularly(index + i);
        pit.increaseStone();
        this.fireOnGameMove(index + i);
      }
      this.fireOnGameMoveEnd(index + stepCount - 1);
    }
  }

  public getNextPitCircularly(currentPitIndex: number) {
    return this.pits[this.getNextPitIndexCircularly(currentPitIndex)];
  }

  public getNextPitIndexCircularly(currentPitIndex: number) {
    this.checkIndeAndMaybeThrowError(currentPitIndex);
    return this.getPitIndexCircularly(currentPitIndex + 1);
  }

  public getPitCircularly(currentPitIndex: number) {
    return this.pits[this.getPitIndexCircularly(currentPitIndex)];
  }

  public getPitIndexCircularly(currentPitIndex: number) {
    return currentPitIndex % this.totalPitCount();
  }

  fireOnGameMoveStart(index: number): void {
    this.onGameMoveStart(index);
  }

  fireOnGameMove(index: number): void {
    this.onGameMove(index);
  }

  fireOnGameMoveEnd(index: number): void {
    this.onGameMoveEnd(index);
  }

  public getStoneArray(): number[] {
    return [...this.pits.map((pit) => pit.stoneCount)];
  }
}
