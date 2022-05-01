import { MancalaGame } from './MancalaGame';

export interface GameRule {
  onGameMoveStart(game: MancalaGame, index: number): void;
  onGameMove(game: MancalaGame, index: number): void;
  onGameMoveEnd(game: MancalaGame, index: number): void;
}
