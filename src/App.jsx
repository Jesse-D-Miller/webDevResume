import { useState } from "react";
import "./App.css";
import { resumeData } from "./data/resume.js";
import Sheet from "./components/Sheet.jsx";

function App() {
  const [summaryOff, setSummaryOff] = useState(false);

  return (
    <div className="App">
      <Sheet
        resumeData={resumeData}
        summaryOff={summaryOff}
        setSummaryOff={setSummaryOff}
      />
    </div>
  );
}

export default App;
