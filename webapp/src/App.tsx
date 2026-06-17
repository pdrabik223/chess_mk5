import type { FunctionComponent, JSX } from 'react';
import './App.css'
import { useSearchParams } from "react-router";

class Color {
  r: number = 0
  g: number = 0
  b: number = 0
  constructor(r: number, g: number, b: number) {
    r = r;
    g = g;
    b = b;
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
    for (let _ of new Array(Board.Width * Board.Height)) {
      this.color.push(new Color(255, 255, 255));
      this.isOccupied.push(false);
    }
  }
  getData(): [Color, boolean][] {
    let data: [Color, boolean][] = []


    for (let x of new Array(Board.Width * Board.Height)) {
      data.push([this.color[x], this.isOccupied[x]]);
    }

    return data;
  }
}

interface CellInterface {
  color: Color
  isOccupied: boolean
}

const CellWidget: FunctionComponent<CellInterface> = (props): JSX.Element => {
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
  return <>
    {

      props.board.getData().map((item, index) => {
        <CellWidget color={item[0]} isOccupied={item[1]}></CellWidget>


      })}
  </>
}

function App() {

  let [searchParams] = useSearchParams();

  // const [serverUrl, setServerUrl] = useState<String | null>("null")

  return <>
    <BoardWidget board={new Board()}></BoardWidget>
    <p>
      You searched for <i>{searchParams.get("q")}</i>
    </p>
  </>

}

export default App
