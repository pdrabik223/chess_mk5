import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VByteCalculator from './pages/vByteCalculator';
import BoardWidget from './widgets/board/BoardWidget';
import { Row } from './components/Row';
import { TicTacToeGame } from './game_controllers/TicTacToeGame';
import settingsIcon from "./assets/gear.png";

class BoardConnection {
  boardUrl?: String;

  constructor(url: String) {
    this.boardUrl = url;

  }
  sentGetRequest(endpoint: String, data: Map<String, any>): Map<String, any> | null {
    if (this.boardUrl === undefined) return null;
    return null

  }

}
const LandingPage: React.FC<{}> = () => {
  return <>

    <div className="app-panel">
      <section className="board-wrapper">
        <BoardWidget
          board={new TicTacToeGame().toBoard()}
        />
      </section>
    </div>
  </>
}


const SettingsDrawer  : React.FC<{}> = () => {

  return <div
    style={{ position: "absolute", height: "100%", width: "100%", display: "hidden" }}>
    <h1>Settings</h1>

  </div>
}

const AppBar: React.FC<{}> = () => {

  // let image = require();

  return <div style={{ height: "80px" }}>
    <Row
      expanded={true}
      style={{
        position: "absolute", left: "0px", top: "0px", right: "0px", height: "80px",
        backgroundColor: 'red'
      }}>

      <h1>Logo</ h1>
      <img style={{ marginLeft: "auto", height: "80%", top: "10%" }} src={settingsIcon} alt="image not found" />
    </Row>
    <SettingsDrawer />

  </div>
}



function App() {


  return <>
    <div className="app-container">
      <AppBar />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/v_byte_calculator" element={<VByteCalculator />} />
        </Routes>
      </BrowserRouter>
    </div >

  </>

}

export default App
