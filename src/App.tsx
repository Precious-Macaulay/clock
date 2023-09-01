import "./App.css"
import { BreakControl } from "./features/break/BreakControl"
import { SessionControl } from "./features/session/SessionControl"
import { Timer } from "./features/timer/Timer"

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <header className="main-title">25 + 5 Clock</header>
        <BreakControl />
        <SessionControl />
        <Timer />
        <footer className="author">
          Coded by <br />
          <a href="/" target="_blank" rel="noreferrer">
            Macaulay Precious
          </a>
        </footer>
      </div>
    </div>
  )
}

export default App
