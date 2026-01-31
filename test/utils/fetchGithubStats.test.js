import { expect } from "chai";
import { fetchGithubStats } from "../../src/utils/fetchGithubStats.js";

describe("fetchGithubStats", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("aggregates repos, languages, and commits", async () => {
    const repos = [
      {
        name: "repo-one",
        fork: false,
        size: 10,
        pushed_at: "2025-01-02T00:00:00Z",
        languages_url: "https://api.github.com/repos/user/repo-one/languages",
      },
      {
        name: "repo-two",
        fork: true,
        size: 5,
        pushed_at: "2025-01-01T00:00:00Z",
        languages_url: "https://api.github.com/repos/user/repo-two/languages",
      },
    ];

    const languageData = {
      "https://api.github.com/repos/user/repo-one/languages": {
        JavaScript: 1000,
        CSS: 200,
      },
      "https://api.github.com/repos/user/repo-two/languages": {
        JavaScript: 500,
        HTML: 300,
      },
    };

    const fetchCalls = [];

    globalThis.fetch = async (url) => {
      fetchCalls.push(url);

      if (url.includes("/users/test-user/repos")) {
        return {
          ok: true,
          json: async () => repos,
        };
      }

      if (url.endsWith("/languages")) {
        return {
          ok: true,
          json: async () => languageData[url],
        };
      }

      if (url.includes("/commits")) {
        return {
          ok: true,
          headers: {
            get: (key) =>
              key === "Link"
                ? '<https://api.github.com/repos/test-user/repo-one/commits?per_page=1&page=5>; rel="last"'
                : null,
          },
        };
      }

      return { ok: false, json: async () => ({}) };
    };

    const result = await fetchGithubStats("test-user");

    expect(result.totalRepos).to.equal(2);
    expect(result.totalRepoSize).to.equal(15);
    expect(result.totalCommits).to.equal(5);

    expect(result.languageTotals).to.deep.equal({
      JavaScript: 1500,
      CSS: 200,
      HTML: 300,
    });

    expect(result.recentActivity).to.deep.equal([
      { name: "repo-one", pushed_at: "2025-01-02T00:00:00Z" },
      { name: "repo-two", pushed_at: "2025-01-01T00:00:00Z" },
    ]);

    const commitCalls = fetchCalls.filter((url) => url.includes("/commits"));
    expect(commitCalls).to.have.length(1);
  });
});
