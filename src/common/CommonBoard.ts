import { Board } from '../core/Board';

const pitCountByUser = 6;
const initialStoneCountInPit = 4;

export class CommonBoard extends Board {
  constructor() {
    super(pitCountByUser, initialStoneCountInPit);
  }
}
