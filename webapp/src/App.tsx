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

      positions.push(bufferCopy.indexOf('1'))

      bufferCopy = bufferCopy.substring(byteLength)

    }
    return positions;
  }

  fromPositions(data: number[]) {
    this.buffer = ""

    if (data.length == 0) return

    for (let d = 0; d < data.length || d >= this.minByteLength; d++) {
      let byteLength = this.maxByteLength - d
      this.buffer += "0".repeat(data[d]) + '1' + "0".repeat(byteLength - data[d] - 1)
    }

  }
  decodeString(): string {
    if (this.buffer.length == 0)
      return ""

    let bufferCopy = this.buffer;
    let stringBuffer = ""

    for (let vByte = 0; vByte < this.maxByteLength - this.minByteLength; vByte++) {
      let byteLength = this.maxByteLength - vByte  // first bit is reserved for empty indicator  

      if (bufferCopy.length == 0) break;

      let byteData: string = bufferCopy.substring(1, byteLength)
      bufferCopy = bufferCopy.substring(byteLength)

      stringBuffer += byteData

    }

    let text = ""
    while (stringBuffer.length != 0) {
      let char = stringBuffer.indexOf('1')
      if (char == -1) break;
      stringBuffer = stringBuffer.substring(supportedCharacters.length)
      text += supportedCharacters[char]

    }
    return text;

  }

  encodeString(base64String: String): string {
    this.buffer = ""

    if (base64String.length == 0)
      return this.buffer

    let tempBuffer: string = ""

    for (let i = 0; i < base64String.length; i++) {
      for (let j = 0; j < supportedCharacters.length; j++) {
        if (supportedCharacters.indexOf(base64String[i]) == j)
          tempBuffer += '1'
        else
          tempBuffer += '0'
      }
    }

    this.buffer = ""

    for (let vByte = 0; vByte < this.maxByteLength - this.minByteLength; vByte++) {
      let byteLength = this.maxByteLength - vByte - 1 // first bit is reserved for empty indicator  
      if (tempBuffer.length == 0) return this.buffer

      if (tempBuffer.length < byteLength)
        if (tempBuffer.indexOf('1') != -1)
          tempBuffer += "0".repeat(byteLength - tempBuffer.length);
        else return this.buffer

      let byteData: string = tempBuffer.substring(0, byteLength)
      tempBuffer = tempBuffer.substring(byteLength)
      let leading = byteData.indexOf('1') == -1 ? '1' : "0"
      this.buffer += leading + byteData

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
    <p>Raw text (len: {text.length}): {text}</p>

    <p>As board bits (len: {board1.buffer.length}) {board1.show()}</p>
    <p>As text {board1.decodeString()}</p>
    <p>As board positions {board1.toPositions().join(" ")}</p>
    <p>from positions (len: {board2.buffer.length}) {board2.show()}</p>

    <p>Back to string {board2.decodeString()}</p>
    <BoardWidget
      cellIcons={cellIcons} board={new Board()}></BoardWidget>
  </div>


}

export default App
