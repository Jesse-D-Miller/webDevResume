import './App.css'
import {resumeData} from './data/resume.js'
import Sheet from './components/Sheet.jsx'

function App() {
  console.log(resumeData);

  return (
    <div className="App">
      <Sheet />
    </div>
  )
}

export default App
