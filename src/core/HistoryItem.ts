export class HistoryItem {
  boardSnapshot: number[];
  gameSteps: GameStep[];
  constructor(boardSnapshot: number[], gameSteps: GameStep[]) {
    this.boardSnapshot = boardSnapshot;
    this.gameSteps = gameSteps;
  }
}

export class MoveHistoryItem extends HistoryItem {
  playerId: string;
  moveIndex: number;
  constructor(
    playerId: string,
    moveIndex: number,
    boardSnapshot: number[],
    gameSteps: GameStep[]
  ) {
    super(boardSnapshot, gameSteps);
    this.playerId = playerId;
    this.moveIndex = moveIndex;
  }
}

export class GameStep {
  index: number;
  type: string;
  data: any | null;
  constructor(index: number, type: string, data: any = null) {
    this.index = index;
    this.type = type;
    this.data = data;
  }
}
