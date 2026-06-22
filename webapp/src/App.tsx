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
      if (data_copy.length == 0) return positions;

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


// function encodeBase3(text: String): NumberBase3[] {
//   // Supported characters by encoder 26 (a-z) + 26 (A-Z) + 10 (0-9) + "_" + " " = 64

//   let encodedNumbers: NumberBase3[] = []
//   for (let character of text) {
//     if (!supportedCharacters.includes(character)) {
//       console.log(`character ${character} is not supported, skipping`)
//       continue;
//     }
//     encodedNumbers.push(new NumberBase3(supportedCharacters.indexOf(character)));
//   }

//   return encodedNumbers;
// }

// function encodeBase64(text: String): NumberBase3[] {
//   // Supported characters by encoder 26 (a-z) + 26 (A-Z) + 10 (0-9) + "_" + " " = 64

//   let encodedNumbers: NumberBase3[] = []
//   for (let character of text) {
//     if (!supportedCharacters.includes(character)) {
//       console.log(`character ${character} is not supported, skipping`)
//       continue;
//     }
//     encodedNumbers.push(new NumberBase3(supportedCharacters.indexOf(character)));
//   }

//   return encodedNumbers;
// }

// function decodeFromBoardPlacements(data: number[]): string[] {


//   if (data.length == 0) return [];

//   let bits: string[] = Array(32)

//   for (let x = 0; x < data.length; x++) {
//     bits[x] = data[x].toString(2)
//   }

//   return bits;

// }

// function decodeToBoardPlacements(data: string) {

//   if (data.length == 0) return [];


//   let x = new BoardBits();
//   console.log(x)

//   // console.log(bits)
//   // return bits;

// }

// function totalSum(values: number[]): number {
//   let sum = 0

//   for (let i = 0; i < values.length; i++) {
//     sum += (values[i]) * (i * 64)
//   }
//   return sum
// }

// function toBase3(values: number[]): string[] {
//   let result: string[] = []
//   for (let val of values) {
//     let temp = val;
//     let number: string = ""
//     if (temp == 0) number = "0";
//     else
//       while (temp > 0) {
//         number = (temp % 3).toString() + number;
//         temp = Math.floor(temp / 3);

//       }
//     result.push(number)
//   }
//   return result;
// }

// function base3ToBase10(base3Str: string): number {
//   let decimalVal: number = 0;
//   const length: number = base3Str.length;

//   for (let i = 0; i < length; i++) {
//     const digit: number = parseInt(base3Str[i], 10);

//     const power: number = length - 1 - i;

//     decimalVal += digit * Math.pow(3, power);
//   }

//   return decimalVal;
// }

// function toBase10fromBase3(values: string[]): number[] {
//   let result: number[] = []

//   for (let val of values) {
//     let temp = Number(val);
//     let number: number;
//     if (temp == 0) number = 0;
//     else
//       number = base3ToBase10(val)
//     result.push(Number(number))
//   }
//   return result;
// }

// function base10toEncodedAs10(values: number[]): number[] {


//   let result: number[] = []

//   for (let val of values) {
//     let temp = val;
//     let number: string = ""
//     if (temp == 0) number = "0";
//     else
//       while (temp > 0) {
//         number = (temp % 64).toString() + number;
//         temp = Math.floor(temp / 64);

//       }
//     result.push(Number(number))
//   }
//   return result;
// }


function App() {
  const [text, setText] = useState<String>("");

  // async function searchForServer(): Promise<String | null> {
  //   let localNetworkHeader = "http://192.168.1."


  //   for (let x = 0; x < 255; x++) {
  //     console.log(localNetworkHeader + x.toString() + "/v1/status")
  //     try {

  //       let resp = await fetch(localNetworkHeader + x.toString() + "/v1/status", { signal: AbortSignal.timeout(1000) })
  //       if (resp.ok) {
  //         console.log("HERE!")
  //         return localNetworkHeader + x.toString();

  //       }
  //     } catch (error: unknown) {
  //       console.log(error)
  //     }
  //   }

  //   return null;
  // }
  // let [boardServerIP, setBoardServerIP] = useState<Promise<String | null>>(() => { return searchForServer() });

  // let [searchParams] = useSearchParams();

  // const [serverUrl, setServerUrl] = useState<String | null>("null")

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setText(newValue);
  }
  let positons = new BoardBits()
  positons.encodeString(text)

  let board2 = new BoardBits()
  board2.fromPositions(positons.toPositions())

  return <div style={{ backgroundColor: 'grey' }}>
    <input onChange={onChange} />
    <p>Raw text (len: {text.length}): {text}</p>
    {/* <p>Encoded as numbers (base 10) and (base 3): {encodeBase3(text).join(" ")}</p>
    //  */}
    <p>As board bits {(new BoardBits()).encodeString(text)}</p>
    <p>As board positions {positons.toPositions().join(" ")}</p>
    <p>from positons {board2.data}</p>

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
