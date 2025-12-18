export async function fetchGithubLanguageStats(username, token = null) {
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
  return languageTotals;
}