import { MancalaGame } from '../core/MancalaGame';
import { Player } from '../core/Player';
import { CommonBoard } from './CommonBoard';
import { GRLastStoneInBank } from './game_rules/GRLastStoneInBank';
import { GRLastStoneInEmptyPit } from './game_rules/GRLastStoneInEmptyPit';

export class CommonMancalaGame extends MancalaGame {
  constructor(player1: Player, player2: Player) {
    super(new CommonBoard(), player1, player2, player1.id, [
      new GRLastStoneInEmptyPit(),
      new GRLastStoneInBank()
    ]);
  }
}
