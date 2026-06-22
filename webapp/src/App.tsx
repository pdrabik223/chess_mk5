import { useState, type ChangeEvent, type FunctionComponent, type JSX } from 'react';
import { Board } from './board/Board';
import BoardWidget from './widgets/board/BoardWIdget';

const supportedCharacters: String =
  "0123456789" +
  "abcdefghijklmnopqrstuvwxyz" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  "_" +
  " ";


class BoardBits {
  data: string = ""
  static noPieces = 32
  static no64byteChunks = 24
  constructor() {

    // for (let x = 0; x < BoardBits.noPieces; x++) {
    //   for (let y = x; y < 64; y++) {
    //     this.data += "0"

    //   }
    // }
  }

  toPositions(): number[] {
    let index = 0;
    let positions: number[] = []

    if (this.data.length == 0) return positions;

    let data_copy = this.data

    while (1 < 2) {
      console.log(data_copy.length)
      if (data_copy.length == 0) { 
        return positions };

      if (data_copy.length < 64 - index)
        data_copy.padEnd((64 - index) - data_copy.length, "0")

      let number = data_copy.substring(0, 64 - index)
      let pos = number.indexOf('1');
      if (pos == -1)
        // return positions;
        positions.push(0)
      else
        positions.push(pos + 1)
      data_copy = data_copy.substring(64 - index)
      index += 1

    }
    return positions;

  }

  fromPositions(data: number[]) {
    if (data.length == 0) this.data = ""
    let index = 0;
    while (1 < 2) {
      if (data.length == index) return
      for (let i = 0; i < 64 - index; i++) {
        if (data[index] == i + 1)
          this.data += '1'
        else
          this.data += '0'
      }
      index += 1
    }

  }
  decodeString(): string {
    if (this.data.length == 0)
      return ""
    let dataCopy = this.data;
    let text = ""

    for (let i = 0; i < BoardBits.no64byteChunks; i++) {

      let char = dataCopy.indexOf('1')
      if (char == -1) return text;
      text += supportedCharacters[char]
      dataCopy = dataCopy.substring(64)



    }
    return text;

  }
  encodeString(data: String): string {
    this.data = ""

    if (data.length == 0)
      return this.data

    if (data.length >= BoardBits.no64byteChunks) {
      console.log("data is longer than available space, skipping overflow")
      data = data.substring(0, BoardBits.no64byteChunks)
    }

    for (let i = 0; i < data.length; i++) {

      for (let j = 0; j < 64; j++) {
        if (supportedCharacters.indexOf(data[i]) == j)
          this.data += '1'
        else
          this.data += '0'
      }
    }

    return this.data
  }
}

class NumberBase3 {
  valBase10: number = 0
  constructor(val: number) {
    this.valBase10 = val
  }

  static fromString(val: string): NumberBase3 {
    return new NumberBase3(parseInt(val, 10))
  }

  toBase10() {
    return this.valBase10
  }

  toBase3(): String {

    let temp = this.valBase10;
    let number: string = ""
    if (temp == 0) number = "0";
    else
      while (temp > 0) {
        number = (temp % 3).toString() + number;
        temp = Math.floor(temp / 3);

      }
    return number;
  };


  toString() {
    return `${this.toBase10()}(10) ${this.toBase3()}(3)`;
  }

}

function App() {
  const [text, setText] = useState<String>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setText(newValue);
  }

  let board1 = new BoardBits()
  board1.encodeString(text)


  let board2 = new BoardBits()
  board2.fromPositions(board1.toPositions())

  return <div style={{ backgroundColor: 'grey' }}>
    <input onChange={onChange} />
    <p>Raw text (len: {text.length}): {text}</p>


    <p>As board bits (len: {board1.data.length}) {board1.data}</p>
    <p>As board positions {board1.toPositions().join(" ")}</p>
    <p>from positons (len: {board2.data.length}) {board2.data}</p>

    <p>Back to string {board2.decodeString()}</p>
    {/* <p>Text to Board Placements {decodeToBoardPlacements("Test")}</p>
    <p>Decoded from board placements: {decodeFromBoardPlacements([1, 2]).join(" ")}</p> */}


    {/* <p>Total sum (base 10) : {totalSum(encodeFromPasswordStringToSum(text))}</p>
    <p>Total sum (base 3) : {toBase3([totalSum(encodeFromPasswordStringToSum(text))])}</p>
    <p>Total sum back as base 10 (from base 3) : {toBase10fromBase3(toBase3([totalSum(encodeFromPasswordStringToSum(text))]))}</p>
    <p>Back to Encoded as number (base10): {base10toEncodedAs10(toBase10fromBase3(toBase3([totalSum(encodeFromPasswordStringToSum(text))])))} </p> */}
    {/* <BoardWidget board={new Board()}></BoardWidget> */}
  </div>


}

export default App
