import { useState, type FunctionComponent, type JSX } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { Row } from './components/Row';



class Color {
  r: number = 0
  g: number = 0
  b: number = 0

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  static fromHex(hex: String): Color {
    hex = hex.replace("#", "");
    if (hex.length !== 6) return new Color(255, 0, 0);
    const num = parseInt(hex.toString(), 16);

    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;

    return new Color(r, g, b);
  }

  toRGB() {
    return "rgb(" + this.r.toString() + ", " + this.g.toString() + ", " + this.b.toString() + " " + ")"
  }
  toHexString() {
    return this.r.toString(16).padStart(2, '0') + this.g.toString(16).padStart(2, '0') + this.b.toString(16).padStart(2, '0')
  }
}

class Board {
  static Width: number = 8;
  static Height: number = 8;
  color: Color[] = [];
  isOccupied: boolean[] = [];

  constructor(color?: Color[],
    isOccupied?: boolean[]
  ) {
    if (color !== null && color?.length == Board.Width * Board.Height) {
      this.color = color
    }
    else
      for (let x = 0; x < Board.Width * Board.Height; x++) {
        this.color.push(new Color(255, 0, 0));
      }
    if (isOccupied !== null && isOccupied?.length == Board.Width * Board.Height) {
      this.isOccupied = isOccupied
    } else
      for (let x = 0; x < Board.Width * Board.Height; x++) {
        this.isOccupied.push(false);
      }
  }

  fromJson(data: Map<String, any>): Board {

    let colors: String[] = data.get('c') as String[];
    let state: String[] = data.get('s') as String[];

    let parsedColors: Color[] = [];
    let parsedState: boolean[] = [];


    for (let i = 0; i < colors.length; i++) {
      parsedColors.push(Color.fromHex(colors[i]));
      parsedState.push(state[i] == '1')
    }

    return new Board(parsedColors, parsedState)
  }

  getData(): [Color, boolean][] {
    let data: [Color, boolean][] = []


    for (let x = 0; x < Board.Width * Board.Height; x++) {
      data.push([this.color[x], this.isOccupied[x]]);
    }

    return data;
  }

  toJson() {
    let colors: String[] = []
    let state: String[] = []

    for (let x of this.getData()) {
      colors.push(x[0].toHexString());
      state.push(x[1] ? "1" : "0");
    }
    return { "c": colors, 's': state }
  }

}

interface CellInterface {
  color: Color
  isOccupied: boolean
  key: string

}

const CellWidget: FunctionComponent<CellInterface> = (props): JSX.Element => {
  // console.log(props.color)

  let x = props.isOccupied ? "X" : "";
  return <div style={{
    height: '100%',
    width: '100%',
    padding: '5%',

  }} >
    <div style={{
      height: '50px',
      width: '50px',
      background: props.color.toRGB()
    }}>

      {x}
    </div>
  </div >
}


interface BoardWidgetInterface {
  board: Board
}

const BoardWidget: FunctionComponent<BoardWidgetInterface> = (props): JSX.Element => {

  let cells: JSX.Element[] = [];
  let boardData = props.board.getData();
  for (let x = 0; x < Board.Width; x++) {
    let rowData: JSX.Element[] = [];
    for (let y = 0; y < Board.Height; y++) {
      rowData.push(<CellWidget color={boardData[x * Board.Width + y][0]} isOccupied={boardData[x * Board.Width + y][1]} key={uuidv4()} />);
    }
    cells.push(<Row key={uuidv4()} children={rowData} />);
  }

  console.log(props.board.toJson())
  return <>
    {
      cells
    }
  </>
}

function App() {

  async function searchForServer(): Promise<String | null> {
    let localNetworkHeader = "http://192.168.1."


    for (let x = 0; x < 255; x++) {
      console.log(localNetworkHeader + x.toString() + "/v1/status")
      try {

        let resp = await fetch(localNetworkHeader + x.toString() + "/v1/status", { signal: AbortSignal.timeout(1000) })
        if (resp.ok) {
          console.log("HERE!")
          return localNetworkHeader + x.toString();

        }
      } catch (error: unknown) {
        console.log(error)
      }
    }

    return null;
  }
  let [boardServerIP, setBoardServerIP] = useState<Promise<String | null>>(() => { return searchForServer() });

  // let [searchParams] = useSearchParams();

  // const [serverUrl, setServerUrl] = useState<String | null>("null")

  return <div style={{ width: "500px", height: "500px" }}>

    <BoardWidget board={new Board()}></BoardWidget>
  </div>


}

export default App
