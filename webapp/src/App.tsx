import { useState, type ChangeEvent, type JSX } from 'react';
import { Board } from './board/Board';
import BoardWidget from './widgets/board/BoardWIdget';


const supportedCharacters: String =
  "0123456789" +
  "abcdefghijklmnopqrstuvwxyz" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  "_";


class VBytes {
  // Variable byte length memory structure
  // Every 'byte' encodes with different length
  // first bit of every byte is reserved for encoding '0', meaning 0 = "1000" 
  // bytes are encoded linearly, meaning 0 = "1000", 1 = "0100", 2 = "0100", 3 = "0001"

  buffer: string = ""

  // map: Map<number, string> = new Map<number, string>()

  maxByteLength: number = 64
  minByteLength: number = 32

  constructor(base64String?: string) {
    if (base64String == null) return;
    else this.buffer = new VBytes().encodeString(base64String)
  }


  toPositions(): number[] {

    let positions: number[] = []

    let bufferCopy = this.buffer

    for (let vByte = 0; vByte < this.maxByteLength - this.minByteLength; vByte++) {
      let byteLength = this.maxByteLength - vByte  // first bit is reserved for empty indicator  

      if (bufferCopy.length == 0) break;

      let pos = bufferCopy.indexOf('1')

      let positionsCopy = positions.slice();

      for (let p = 0; p < positionsCopy.length; p++) {
        if (positionsCopy[p] <= pos) {
          positionsCopy.splice(p, 1)
          p = -1
          pos += 1
        }
      }

      if (positions.indexOf(pos) != -1)
        console.error("Duplicated index found at:", pos, "encoded val:", bufferCopy.indexOf('1'))

      positions.push(pos)

      bufferCopy = bufferCopy.substring(byteLength)

    }
    return positions;
  }



  fromPositions(data: number[]) {
    console.log(data)
    this.buffer = ""

    if (data.length == 0) return
    let result = []

    for (let d = 0; d < data.length; d++) {

      let byteLength = this.maxByteLength - d

      let pos = data[d];
      // if (d > 0)
        for (let p = 0; p < d; p++) {
          if (data[p] < data[d]) { pos -= 1; }
        }
        result.push(pos)

      this.buffer += "0".repeat(pos) + '1' + "0".repeat(byteLength - pos - 1)
    }
    console.log(result)

  }
  decodeString(): string {
    if (this.buffer.length == 0)
      return ""

    let bufferCopy = this.buffer;
    let stringBuffer = ""
    let pos = 0
    for (let vByte = 0; vByte < this.maxByteLength - this.minByteLength; vByte++) {
      let byteLength = this.maxByteLength - vByte  // first bit is reserved for empty indicator  

      if (bufferCopy.length == 0) break;

      pos += bufferCopy.indexOf('1')

      if (pos == -1) {
        console.log("Decode sting, empty byte")

      }
      if (pos != 0) {
        stringBuffer += supportedCharacters[pos - 1]
        pos = 0
      } else {
        pos += byteLength - 1
      }
      bufferCopy = bufferCopy.substring(byteLength)

    }

    return stringBuffer;

  }

  encodeString(data: String): string {
    this.buffer = ""

    if (data.length == 0)
      return this.buffer

    this.buffer = ""

    for (let vByte = 0; vByte < this.maxByteLength - this.minByteLength - 1; vByte++) {
      let byteLength = this.maxByteLength - vByte - 1 // first bit is reserved for empty indicator  
      if (data.length == 0) return this.buffer

      let pos = supportedCharacters.indexOf(data[0])

      if (pos == -1) {
        console.log(`String encoding error, unsupported character '${data[0]}', skipping`)
      }
      if (pos < byteLength) {
        this.buffer += '0' + '0'.repeat(pos) + '1' + '0'.repeat(byteLength - pos - 1)
        data = data.substring(1)
      } else if (pos >= byteLength) {
        this.buffer += '1' + '0'.repeat(byteLength)
        data = supportedCharacters[pos - byteLength] + data.substring(1)
      }

    }

    return this.buffer
  }



  show() {
    let formatterString = ""
    let bufferCopy = this.buffer

    for (let vByte = 0; vByte < this.maxByteLength - this.minByteLength; vByte++) {
      let byteLength = this.maxByteLength - vByte
      formatterString += bufferCopy.substring(0, byteLength)
      bufferCopy = bufferCopy.substring(byteLength)
      formatterString += ` (${byteLength})`
      if (bufferCopy.length == 0) return formatterString
      formatterString += ' '
    }
    return formatterString
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

  let board1 = new VBytes(text)

  let board2 = new VBytes()
  board2.fromPositions(board1.toPositions())

  let cellIcons = new Map<number, JSX.Element>()

  for (let pos = 0; pos < board1.toPositions().length; pos++)
    cellIcons.set(board1.toPositions()[pos], <h2 style={{ color: "yellow" }}>{pos + 1}</h2>);


  return <div style={{ backgroundColor: 'grey' }}>
    <input onChange={onChange} />
    <p>no supported characters: {supportedCharacters.length}</p>
    <p>raw text (len: {text.length}): {text}</p>

    <p>text -> board bits (len: {board1.buffer.length}) {board1.show()}</p>
    <p>board bits -> text {board1.decodeString()}</p>
    <p>board bits -> board positions {board1.toPositions().join(" ")}</p>
    <p>board positions -> board positions {board2.toPositions().join(" ")}</p>
    <p>board positions -> board bits (len: {board2.buffer.length}) {board2.show()}</p>

    <p>Back to string {board2.decodeString()}</p>
    <BoardWidget
      cellIcons={cellIcons} board={new Board()}></BoardWidget>
  </div>


}

export default App
