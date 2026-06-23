import { Color } from './Color';

export class Board {
  static Width: number = 8;
  static Height: number = 8;
  color: Color[] = [];
  isOccupied: boolean[] = [];

  constructor(color?: Color[],
    isOccupied?: boolean[]
  ) {
    if (color !== null && color?.length == Board.Width * Board.Height) {
      this.color = color;
    }

    else {
      let flip = false;
      for (let x = 0; x < Board.Width * Board.Height; x++) {
        this.color.push(flip ? new Color(44, 44, 44) : new Color(144, 144, 144));
        if (x % 8 != 7) flip = !flip
      }
    }
    if (isOccupied !== null && isOccupied?.length == Board.Width * Board.Height) {
      this.isOccupied = isOccupied;
    }
    else
      for (let x = 0; x < Board.Width * Board.Height; x++) {
        this.isOccupied.push(false);
      }
  }


  static fromJson(data: Map<String, any>): Board {

    let colors: String[] = data.get('c') as String[];
    let state: String[] = data.get('s') as String[];

    let parsedColors: Color[] = [];
    let parsedState: boolean[] = [];


    for (let i = 0; i < colors.length; i++) {
      parsedColors.push(Color.fromHex(colors[i]));
      parsedState.push(state[i] == '1');
    }

    return new Board(parsedColors, parsedState);
  }

  getData(): [Color, boolean][] {
    let data: [Color, boolean][] = [];


    for (let x = 0; x < Board.Width * Board.Height; x++) {
      data.push([this.color[x], this.isOccupied[x]]);
    }

    return data;
  }

  toJson() {
    let colors: String[] = [];
    let state: String[] = [];

    for (let x of this.getData()) {
      colors.push(x[0].toHexString());
      state.push(x[1] ? "1" : "0");
    }
    return { "c": colors, 's': state };
  }
}
