import { useEffect, useState } from "react";
import { fetchGithubLanguageStats } from "../../utils/fetchGithubLanguageStats.js";
import {
  saveLanguageStatsToCache,
  getLanguageStatsFromCache,
  isCacheStale,
} from "../../utils/githubLanguageCache.js";

const GITHUB_USERNAME = "Jesse-D-Miller";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

function GithubLanguageSkills() {
  const [languageStats, setLanguageStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      setError(null);
      try {
        if (isCacheStale()) {
          const stats = await fetchGithubLanguageStats(
            GITHUB_USERNAME,
            GITHUB_TOKEN
          );
          saveLanguageStatsToCache(stats);
          setLanguageStats(stats);
        } else {
          const cached = getLanguageStatsFromCache();
          setLanguageStats(cached ? cached.data : null);
        }
      } catch (err) {
        setError("Failed to load GitHub language stats");
        const cached = getLanguageStatsFromCache();
        setLanguageStats(cached ? cached.data : null);
      }
      setLoading(false);
    }
    loadStats();
  }, []);

  if (loading) {
    return <div>Loading language skills...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!languageStats) {
    return <div>No language stats available.</div>;
  }

  // sort languages by bytes used
  const sortedLanguages = Object.entries(languageStats).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="github-languages-section">
      <h3>Programming Levels</h3>
      <h4>(based on my github project language stats)</h4>
      <ul>
        {sortedLanguages.map(([language, bytes]) => (
          <li key={language}>
            <p>
              {language}: lvl {Math.floor(bytes / 10000).toFixed(0)}
            </p>
            <div className="levelUpMeter">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="xp-tick"
                  style={{ left: `${(i + 1) * 10}%` }}
                />
              ))}
              <div
                className="xp-fill"
                style={{ width: `${((bytes % 10000) / 10000) * 100}%` }}
              />
              <span className="xp-label">
                {(bytes % 10000).toLocaleString()} / 10,000 XP
              </span>
            </div>
            <p>total XP(bytes): {bytes.toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GithubLanguageSkills;
