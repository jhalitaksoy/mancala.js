export class Pit {
  index: number;
  stoneCount: number;

  constructor(index: number, stoneCount = 0) {
    this.index = index;
    this.stoneCount = stoneCount;
  }

  get isBank(): boolean {
    return false;
  }

  public increaseStone(count = 1) {
    this.stoneCount += count;
  }

  public decreaseStone(count = 1) {
    this.stoneCount -= count;
  }
}

export class Bank extends Pit {
  constructor(index: number, stoneCount = 0) {
    super(index, stoneCount);
  }

  override get isBank(): boolean {
    return true;
  }
}
