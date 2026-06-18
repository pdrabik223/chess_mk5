import type { FunctionComponent, JSX, Key } from 'react';
import './App.css'
import { useSearchParams } from "react-router";
import { v4 as uuidv4 } from 'uuid';



class Color {
  r: number = 0
  g: number = 0
  b: number = 0

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  toRGB() {
    return "rgb(" + this.r.toString() + " " + this.g.toString() + " " + this.b.toString() + " " + ")"

  }
}

class Board {
  static Width: number = 8;
  static Height: number = 8;
  color: Color[] = [];
  isOccupied: boolean[] = [];

  constructor() {
    for (let x = 0; x < Board.Width * Board.Height; x++) {
      this.color.push(new Color(255, 0, 0));
      this.isOccupied.push(false);
    }
  }

  getData(): [Color, boolean][] {
    let data: [Color, boolean][] = []


    for (let x = 0; x < Board.Width * Board.Height; x++) {
      data.push([this.color[x], this.isOccupied[x]]);
    }

    return data;
  }
}

interface CellInterface {
  color: Color
  isOccupied: boolean
  key: string

}

const CellWidget: FunctionComponent<CellInterface> = (props): JSX.Element => {
  // console.log(props.color)

  return <div style={{
    height: '12.5%',
    width: '12.5%',
    padding: '5%',

  }} >
    <div style={{ color: props.color.toRGB() }}></div>

  </div>
}


interface BoardWidgetInterface {
  board: Board
}

const BoardWidget: FunctionComponent<BoardWidgetInterface> = (props): JSX.Element => {

  let cells: JSX.Element[] = [];
  cell

  for (let x of props.board.getData()) {

    cells.push(<CellWidget color={item[0]} isOccupied={item[1]} key={uuidv4()}> </CellWidget>);
  }

  console.log(cells)
  return <>
    {
      cells
    }
  </>
}

function App() {

  // let [searchParams] = useSearchParams();

  // const [serverUrl, setServerUrl] = useState<String | null>("null")

  return <>
    <BoardWidget board={new Board()}></BoardWidget>
    {/* <p>
      You searched for <i>{searchParams.get("q")}</i>
    </p> */}
  </>

}

export default App
