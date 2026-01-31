import { describe, it, expect, vi, afterEach } from "vitest";
import { render, waitFor, cleanup } from "@testing-library/react";
import App from "../../src/App.jsx";
import { fetchGithubStats } from "../../src/utils/fetchGithubStats.js";
import {
  saveLanguageStatsToCache,
  isCacheStale,
} from "../../src/utils/githubLanguageCache.js";
import { saveStatsToCache, isStatsCacheStale } from "../../src/utils/githubStatsCache.js";

vi.mock("@vercel/analytics/react", () => ({
  Analytics: () => null,
}));

vi.mock("../../src/utils/fetchGithubStats.js", () => ({
  fetchGithubStats: vi.fn(),
}));

vi.mock("../../src/utils/githubLanguageCache.js", () => ({
  saveLanguageStatsToCache: vi.fn(),
  isCacheStale: vi.fn(),
}));

vi.mock("../../src/utils/githubStatsCache.js", () => ({
  saveStatsToCache: vi.fn(),
  isStatsCacheStale: vi.fn(),
}));

describe("App prefetch", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("prefetches and caches stats when caches are stale", async () => {
    vi.mocked(isCacheStale).mockReturnValue(true);
    vi.mocked(isStatsCacheStale).mockReturnValue(false);

    vi.mocked(fetchGithubStats).mockResolvedValue({
      languageTotals: { JavaScript: 123 },
      totalRepos: 1,
      totalRepoSize: 10,
      recentActivity: [],
      totalCommits: 5,
    });

    render(<App />);

    await waitFor(() => {
      expect(fetchGithubStats).toHaveBeenCalledTimes(1);
    });

    expect(saveLanguageStatsToCache).toHaveBeenCalledWith({ JavaScript: 123 });
    expect(saveStatsToCache).toHaveBeenCalledWith(
      expect.objectContaining({
        totalRepos: 1,
        totalRepoSize: 10,
        totalCommits: 5,
      })
    );
  });

  it("does not prefetch when caches are fresh", async () => {
    vi.mocked(isCacheStale).mockReturnValue(false);
    vi.mocked(isStatsCacheStale).mockReturnValue(false);

    render(<App />);

    await waitFor(() => {
      expect(fetchGithubStats).not.toHaveBeenCalled();
    });
  });

  it("swallows prefetch errors", async () => {
    vi.mocked(isCacheStale).mockReturnValue(true);
    vi.mocked(isStatsCacheStale).mockReturnValue(true);

    vi.mocked(fetchGithubStats).mockRejectedValue(new Error("network"));

    render(<App />);

    await waitFor(() => {
      expect(fetchGithubStats).toHaveBeenCalledTimes(1);
    });

    expect(saveLanguageStatsToCache).not.toHaveBeenCalled();
    expect(saveStatsToCache).not.toHaveBeenCalled();
  });
});
