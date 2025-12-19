export async function fetchGithubStats(username, token = null) {
  const headers = token
    ? {
        Authorization: `token ${token}`,
      }
    : {};

  // fetch user repositories
  let repos = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`,
      { headers }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch repositories`);
    }
    const data = await response.json();
    repos = repos.concat(data);
    hasMore = data.length === 100;
    page++;
  }

  const totalCommits = await getTotalCommits(repos, headers, username);

  // fetch languages for each repository
  const languageTotals = {};
  for (const repo of repos) {
    const langRes = await fetch(repo.languages_url, { headers });
    if (!langRes.ok) continue;
    const langData = await langRes.json();
    for (const [language, bytes] of Object.entries(langData)) {
      languageTotals[language] = (languageTotals[language] || 0) + bytes;
    }
  }

  const totalRepos = repos.length;
  const totalRepoSize = repos.reduce((sum, repo) => sum + repo.size, 0); // size in KB
  const recentActivity = repos
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, 5)
    .map((repo) => ({
      name: repo.name,
      pushed_at: repo.pushed_at,
    }));

  return {languageTotals, totalRepos, totalRepoSize, recentActivity, totalCommits};
}

async function getTotalCommits(repos, headers, username) {
  let totalCommits = 0;
  for (const repo of repos) {
    // Only count commits for my own repos (not forks)
    if (repo.fork) continue;
    const res = await fetch(
      `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`,
      { headers }
    );
    if (!res.ok) continue;
    const link = res.headers.get('Link');
    if (link) {
      // Extract the last page number from the Link header
      const match = link.match(/&page=(\d+)>; rel="last"/);
      if (match) {
        totalCommits += parseInt(match[1], 10);
      } else {
        totalCommits += 1; // Only one page, so one commit
      }
    } else {
      // No Link header, only one commit
      totalCommits += 1;
    }
  }
  return totalCommits;
}