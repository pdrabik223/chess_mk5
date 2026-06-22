import { useState, type ChangeEvent } from 'react';
import { Board } from './board/Board';
import BoardWidget from './widgets/board/BoardWIdget';


const supportedCharacters: String =
  "0123456789" +
  "abcdefghijklmnopqrstuvwxyz" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  "_" + ".";


class BoardBits {
  base64string: string = ""
  static noPieces = 32
  static no64byteChunks = 24


  constructor(base64String?: string) {
    if (base64String == null) return;
    else this.base64string = new BoardBits().encodeString(base64String)

  }

  toPositions(): number[] {
    let index = 0;
    let positions: number[] = []

    let data_copy = this.base64string

    while (index < 32) {
      if (data_copy.length == 0) {
        return positions
      };

      if (data_copy.length < 64 - index) {
        console.log(data_copy.length)
        console.log("padding by", (64 - index) - data_copy.length)
        data_copy.padEnd((64 - index) - data_copy.length, "0")
      }

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
    if (data.length == 0) this.base64string = ""
    let index = 0;
    while (1 < 2) {
      if (data.length == index) return
      for (let i = 0; i < 64 - index; i++) {
        if (data[index] == i + 1)
          this.base64string += '1'
        else
          this.base64string += '0'
      }
      index += 1
    }

  }
  decodeString(): string {
    if (this.base64string.length == 0)
      return ""


    let dataCopy = this.base64string;
    let text = ""

    while (dataCopy.length != 0) {

      let char = dataCopy.indexOf('1')
      if (char == -1) return text;
      text += supportedCharacters[char]
      dataCopy = dataCopy.substring(64)

    }
    return text;

  }
  encodeString(base64String: String): string {
    this.base64string = ""

    if (base64String.length == 0)
      return this.base64string

    // if (base64String.length >= BoardBits.no64byteChunks) {
    //   console.log("data is longer than available space, skipping overflow")
    //   base64String = base64String.substring(0, BoardBits.no64byteChunks)
    // }

    for (let i = 0; i < base64String.length; i++) {

      for (let j = 0; j < 64; j++) {
        if (supportedCharacters.indexOf(base64String[i]) == j)
          this.base64string += '1'
        else
          this.base64string += '0'
      }
    }
    return this.base64string
  }
}

function App() {
  const [text, setText] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = ""
    for (let char of e.target.value) {
      if (supportedCharacters.indexOf(char) == -1) continue;
      newValue += char;

    }

    setText(newValue);
  }

  let board1 = new BoardBits(text)


  let board2 = new BoardBits()
  board2.fromPositions(board1.toPositions())

  return <div style={{ backgroundColor: 'grey' }}>
    <input onChange={onChange} />
    <p>no supported characters: {supportedCharacters.length}</p>
    <p>Raw text (len: {text.length}): {text}</p>

    <p>As board bits (len: {board1.base64string.length}) {board1.base64string}</p>
    <p>As board positions {board1.toPositions().join(" ")}</p>
    <p>from positons (len: {board2.base64string.length}) {board2.base64string}</p>

    <p>Back to string {board2.decodeString()}</p>
    <BoardWidget board={new Board()}></BoardWidget>
  </div>


}

export default App
