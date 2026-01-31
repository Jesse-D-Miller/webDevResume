import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";
import { XPProvider } from "./context/XPProvider.jsx";
import { SoftSkillsProvider } from "./context/SoftSkillsProvider.jsx";
import { HoveredNodesProvider } from "./context/HoveredNodesProvider.jsx";
import "./App.css";
import { resumeData } from "./data/resume.js";
import Sheet from "./components/Sheet.jsx";
import BatteryToggle from "./components/common/BatteryToggle.jsx";
import { fetchGithubStats } from "./utils/fetchGithubStats.js";
import {
  saveLanguageStatsToCache,
  isCacheStale,
} from "./utils/githubLanguageCache.js";
import {
  saveStatsToCache,
  isStatsCacheStale,
} from "./utils/githubStatsCache.js";

const GITHUB_USERNAME = "Jesse-D-Miller";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

function App() {
  const [theme, setTheme] = useState("dark"); //toggle state between dark and cyber themes

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "cyber" : "dark"));
  };

  useEffect(() => {
    const shouldFetch = isCacheStale() || isStatsCacheStale();
    if (!shouldFetch) return;

    const prefetch = async () => {
      try {
        const data = await fetchGithubStats(GITHUB_USERNAME, GITHUB_TOKEN);
        saveLanguageStatsToCache(data.languageTotals);
        saveStatsToCache(data);
      } catch {
        // Ignore prefetch errors; components will fall back to cached data.
      }
    };

    prefetch();
  }, []);

  return (
    <XPProvider>
      <SoftSkillsProvider>
        <HoveredNodesProvider>
          
          <div className="top-bar" />

          <div className={`App theme-${theme}`}>
            <BatteryToggle onClick={toggleTheme} theme={theme} />
            <Sheet theme={theme} resumeData={resumeData} />
            <Analytics />
          </div>
        </HoveredNodesProvider>
      </SoftSkillsProvider>
    </XPProvider>
  );
}

export default App;
