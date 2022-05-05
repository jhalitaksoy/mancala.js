import { MancalaGame } from '../core/MancalaGame';
import { CommonBoard } from './CommonBoard';
import { GRClearBoardAtEnd } from './game_rules/GRClearBoardAtEnd';
import { GRLastStoneInBank } from './game_rules/GRLastStoneInBank';
import { GRLastStoneInEmptyPit } from './game_rules/GRLastStoneInEmptyPit';

export class CommonMancalaGame extends MancalaGame {
  constructor(id: string, player1Id: string, player2Id: string) {
    super(id, new CommonBoard(), player1Id, player2Id, player1Id, [
      new GRLastStoneInEmptyPit(),
      new GRLastStoneInBank(),
      new GRClearBoardAtEnd()
    ]);
  }
}
