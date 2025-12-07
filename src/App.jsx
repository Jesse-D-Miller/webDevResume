import { useState } from 'react'
import './App.css'
import {resumeData} from './data/resume.js'

function App() {
  const [count, setCount] = useState(0)

  console.log(resumeData);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Web Dev Resume</h1>
        <p>Your professional portfolio website</p>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
      </header>
    </div>
  )
}

export default App
