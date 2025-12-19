import { useEffect, useState } from "react";
import { fetchGithubStats } from "../../utils/fetchGithubStats.js";
import {
  saveStatsToCache,
  getStatsFromCache,
  isStatsCacheStale,
} from "../../utils/githubStatsCache.js";

const GITHUB_USERNAME = "Jesse-D-Miller";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

function GithubStatsView() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function loadStats() {
      if (isStatsCacheStale()) {
        const data = await fetchGithubStats(GITHUB_USERNAME, GITHUB_TOKEN);
        saveStatsToCache(data);
        setStats({
          publicRepos: data.totalRepos,
          totalCommits: data.totalCommits,
          recentActivity: data.recentActivity,
          totalSize: data.totalRepoSize,
        });
      } else {
        const cached = getStatsFromCache();
        if (cached && cached.data) {
          setStats({
            publicRepos: cached.data.totalRepos,
            totalCommits: cached.data.totalCommits,
            recentActivity: cached.data.recentActivity,
            totalSize: cached.data.totalRepoSize,
          });
        }
      }
    }
    loadStats();
  }, []);

  if (!stats) {
    return <div>Loading GitHub stats...</div>;
  }

  return (
    <div className="github-stats-view">
      <h3>GITHUB STATS</h3>
      <div>Total Public Repos: {stats.publicRepos}</div>
      <div>Total Commits: {stats.totalCommits}</div>
      <div>
        Recent Activity:
        <ul>
          {stats.recentActivity.map((repo) => (
            <li key={repo.name}>
              {repo.name}: {new Date(repo.pushed_at).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
      <div>Total Repo Size: {(stats.totalSize / 1024).toFixed(2)} MB</div>
    </div>
  );
}

export default GithubStatsView;
