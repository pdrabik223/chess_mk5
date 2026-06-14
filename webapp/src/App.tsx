import { useState } from 'react'
import './App.css'
import { useSearchParams } from "react-router";

function App() {

  let [searchParams] = useSearchParams();

  // const [serverUrl, setServerUrl] = useState<String | null>("null")

  return <>
    <p>
      You searched for <i>{searchParams.get("q")}</i>
    </p>
  </>

}

export default App
