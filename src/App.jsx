import { useState } from "react"
import Intro from "./components/Intro"


function App() {
const [close,setClose]=useState(false)
  return (
    <>
      <Intro close={close} setClose={setClose} />
      <div className="min-h-[2000px] bg-[url('/main.webp')] bg-center bg-cover bg-fixed relative">
        <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[1.5px] w-full h-full"></div>
      </div>
    </>
  );
}

export default App
