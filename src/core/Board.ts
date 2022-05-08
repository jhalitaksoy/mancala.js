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

  constructor(
    playerPitCount: number,
    initialStoneCountInPits: number,
    pits: Pit[] | null = null
  ) {
    this.playerPitCount = playerPitCount;
    this.initialStoneCountInPits = initialStoneCountInPits;
    this.pits = pits
      ? pits
      : this.createPits(playerPitCount, initialStoneCountInPits);
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

  public checkPitTypeIsNormalPitByIndex(index: number): boolean {
    this.checkIndeAndMaybeThrowError(index);
    const pitType = this.getPitTypeByIndex(index);
    return pitType === 'player1Pit' || pitType === 'player2Pit';
  }

  public checkPitTypeIsBankByIndex(index: number): boolean {
    this.checkIndeAndMaybeThrowError(index);
    const pitType = this.getPitTypeByIndex(index);
    return pitType === 'player1Bank' || pitType === 'player2Bank';
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
    const startIndex = stepCount === 1 ? index + 1 : index;
    this.moveInternal(startIndex, stepCount);
  }

  private moveInternal(startIndex: number, stepCount: number) {
    this.fireOnGameMoveStart(startIndex);
    for (let i = startIndex; i < startIndex + stepCount; i++) {
      this.onGameMoveStep(i);
    }
    const stopIndex = startIndex + stepCount - 1;
    this.fireOnGameMoveEnd(stopIndex);
  }

  public onGameMoveStep(index: number) {
    const pit = this.pits[this.getPitIndexCircularly(index)];
    pit.increaseStone();
    this.fireOnGameMove(index);
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

  public get player1Pits(): Pit[] {
    return this.pits.slice(
      this.player1PitStartIndex(),
      this.player1BankIndex()
    );
  }

  get player2Pits(): Pit[] {
    return this.pits.slice(
      this.player2PitStartIndex(),
      this.player2BankIndex()
    );
  }

  get player1Bank(): Bank {
    return this.pits[this.player1BankIndex()];
  }

  get player2Bank(): Bank {
    return this.pits[this.player2BankIndex()];
  }

  public getOppositePitIndex(index: number) {
    if (index > this.player1BankIndex()) {
      return this.player2PitStopIndex() - index;
    } else {
      return this.player1BankIndex() + this.playerPitCount - index;
    }
  }

  public clear() {
    this.player1Bank.stoneCount = 0;
    this.player2Bank.stoneCount = 0;
    this.clearPlayer1Pits();
    this.clearPlayer2Pits();
  }

  public clearPlayer1Pits() {
    this.fillPlayer1Pits(0);
  }

  public clearPlayer2Pits() {
    this.fillPlayer2Pits(0);
  }

  public fillPlayer1Pits(stoneCount: number) {
    this.player1Pits.forEach((pit) => (pit.stoneCount = stoneCount));
  }

  public fillPlayer2Pits(stoneCount: number) {
    this.player2Pits.forEach((pit) => (pit.stoneCount = stoneCount));
  }
}
