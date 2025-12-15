import { useState } from "react";
import "./App.css";
import { resumeData } from "./data/resume.js";
import Sheet from "./components/Sheet.jsx";

function App() {
  const [theme, setTheme] = useState("dark"); //toggle state beteween dark and cyber themes

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "cyber" : "dark"));
  };

  return (
    <div className={`App theme-${theme}`}>
      <button className="toggle-theme-button" onClick={toggleTheme}>
        Switch to {theme === "dark" ? "cyber" : "dark"} Mode
      </button>
      <Sheet
        theme={theme}
        resumeData={resumeData}
      />
    </div>
  );
}

export default App;
