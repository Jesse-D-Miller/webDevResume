import { useState } from "react";
import "./App.css";
import { resumeData } from "./data/resume.js";
import Sheet from "./components/Sheet.jsx";
import BatteryToggle from "./components/common/BatteryToggle.jsx";

function App() {
  const [theme, setTheme] = useState("dark"); //toggle state beteween dark and cyber themes

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "cyber" : "dark"));
  };

  return (
    <div className={`App theme-${theme}`}>
      <BatteryToggle onClick={toggleTheme} theme={theme} />
      <Sheet
        theme={theme}
        resumeData={resumeData}
      />
    </div>
  );
}

export default App;
