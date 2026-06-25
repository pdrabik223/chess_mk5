import { useState, type ChangeEvent, type JSX } from 'react';
import { Board } from './board/Board';
import BoardWidget from './widgets/board/BoardWIdget';
import { VBytes } from './board/VBytes';
import './App.css';

export const defaultSupportedCharacters: String =
  "0123456789" +
  "abcdefghijklmnopqrstuvwxyz" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  "_" + "$" + "@" + "!";


function App() {

  const [text, setText] = useState<String>("");
  const [supportedCharacters, setSupportedCharacters] = useState<String>(defaultSupportedCharacters);
  const [noPieces, setNOPieces] = useState<number>(32);

  let board1 = new VBytes(text, 64 - noPieces, supportedCharacters)

  let board2 = new VBytes("", 64 - noPieces, supportedCharacters)
  board2.fromPositions(board1.toPositions())

  let cellIcons = new Map<number, JSX.Element>()

  for (let pos = 0; pos < board1.toPositions().length; pos++)
    cellIcons.set(board1.toPositions()[pos], <h2 style={{ color: "yellow" }}>{pos + 1}</h2>);

  let posUnique = true
  for (let x = 0; x < board1.toPositions().length; x++) {
    if (board1.toPositions().indexOf(board1.toPositions()[x]) != board1.toPositions().lastIndexOf(board1.toPositions()[x]))
      posUnique = false
  }


  return (
    <div className="app-container">
      <div className="app-panel">
        <section className="info-card">
          <h1 className="section-heading">V-Byte encoding</h1>
          <p className="section-description">
            Variable length byte memory representation. Each encoded byte has a different
            length: the first byte is 64 bits, the next is 63 bits, and so on, down to a
            minimum length of 64 minus the configured number of pieces.
          </p>
          <p className="section-description">
            The leading bit of each byte is reserved to represent the zero value, for example
            0 is encoded as "1000". Remaining values use a one-hot bit pattern, such as
            1 = "0100", 2 = "0010", 3 = "0001".
          </p>
          <p className="section-description">
            The total number of encodable symbols depends on the board size and the selected
            character set. Because byte lengths vary, some symbols may require different
            numbers of bytes to encode.
          </p>
        </section>

        <section className="info-card">
          <h1 className="section-heading">Configuration</h1>
          <div className="form-grid">
            <div className="field-group">
              <label className="field-label" htmlFor="supportedCharacters">Supported characters</label>
              <input
                id="supportedCharacters"
                className="text-input wide-input"
                defaultValue={defaultSupportedCharacters as string}
                onChange={(e) => setSupportedCharacters(e.target.value)}
              />
              <p className="note">Supported character count: {supportedCharacters.length}</p>
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="pieceCount">Number of pieces</label>
              <input
                id="pieceCount"
                className="text-input"
                type="number"
                defaultValue={noPieces}
                onChange={(e) => setNOPieces(parseInt(e.target.value))}
              />
            </div>
          </div>
        </section>

        <section className="info-card">
          <h1 className="section-heading">Input</h1>
            <div className="field-group">
              <label className="field-label" htmlFor="rawText">Raw text input</label>
              <input
                id="rawText"
                className="text-input wide-input"
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          <p className="note">Raw text length: {text.length}</p>
          <p className="note">Characters outside of the supported set are ignored.</p>
          <p className="note">Board positions (displayed below): <span className="mono">{board1.toPositions().join(' ')}</span></p>
        </section>

        <section className="board-wrapper">
          <BoardWidget
            cellIcons={cellIcons}
            board={new Board()}
          />
        </section>

        <section className="output-card">
          <h1 className="section-heading">Output</h1>
          <div className="status-row">
            <div className="status-card">
              <p className="status-label">Decoded output</p>
              <p className="status-value mono">'{board2.decodeString()}'</p>
            </div>
            <div className="status-card">
              <p className="status-label">Strings match</p>
              <p className={`status-value ${board2.decodeString() === board1.decodeString() ? 'status-value--true' : 'status-value--false'}`}>
                {board2.decodeString() === board1.decodeString() ? 'True' : 'False'}
              </p>
            </div>
            <div className="status-card">
              <p className="status-label">Positions unique</p>
              <p className={`status-value ${posUnique ? 'status-value--true' : 'status-value--false'}`}>
                {posUnique ? 'True' : 'False'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );


}

export default App
