import { useState } from 'react'
import './App.css'
import {resumeData} from './data/resume.js'
import Sheet from './components/Sheet.jsx'

function App() {
  const [count, setCount] = useState(0)

  console.log(resumeData);

  return (
    <div className="App">
      <h1>Web Dev Resume</h1>
      <Sheet />
    </div>
  )
}

export default App
