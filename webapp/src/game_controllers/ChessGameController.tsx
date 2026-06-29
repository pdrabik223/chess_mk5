import { Board } from '../board/Board';
import { Color } from '../board/Color';

const chessPieces: String = "epnbqk"; // empty, pawn, knight, bishop, queen, knight


class ChessGameController {

  state: String = "64e";

  constructor(initialState?: String) {
    if (initialState != undefined)
      this.state = initialState;
  }

  toBoard() {
    let flip = false;
    let colors = [];
    for (let x = 0; x < Board.Width * Board.Height; x++) {
      colors.push(flip ? new Color(44, 44, 44) : new Color(144, 144, 144));
      if (x % 8 != 7) flip = !flip;
    }
    return new Board(colors);
  }

}
