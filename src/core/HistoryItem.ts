export class HistoryItem {
  boardSnapshot: number[];
  constructor(boardSnapshot: number[]) {
    this.boardSnapshot = boardSnapshot;
  }
}

export class MoveHistoryItem extends HistoryItem {
  playerId: string;
  moveIndex: number;
  constructor(playerId: string, moveIndex: number, boardSnapshot: number[]) {
    super(boardSnapshot);
    this.playerId = playerId;
    this.moveIndex = moveIndex;
  }
}
