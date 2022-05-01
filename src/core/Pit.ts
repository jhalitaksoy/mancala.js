export class Pit {
  stoneCount: number;

  constructor(stoneCount = 0) {
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
  constructor(stoneCount = 0) {
    super(stoneCount);
  }

  override get isBank(): boolean {
    return true;
  }
}
