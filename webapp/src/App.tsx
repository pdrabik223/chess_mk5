import type { FunctionComponent, JSX, Key } from 'react';
import './App.css'
import { useSearchParams } from "react-router";
import { v4 as uuidv4 } from 'uuid';
import { Row } from './components/row';



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
    return "rgb(" + this.r.toString() + ", " + this.g.toString() + ", " + this.b.toString() + " " + ")"

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
      // for (let x of props.board.getData()) {
      rowData.push(<CellWidget color={boardData[x * Board.Width + y][0]} isOccupied={boardData[x * Board.Width + y][1]} key={uuidv4()} />);

      // }
    }

    cells.push(<Row key={uuidv4()} children={rowData} />);
  }

  return <>
    {
      cells
    }
  </>
}

function App() {

  // let [searchParams] = useSearchParams();

  // const [serverUrl, setServerUrl] = useState<String | null>("null")

  return <div style={{ width: "500px", height: "500px" }}>

    <BoardWidget board={new Board()}></BoardWidget>
  </div>


}

export default App
