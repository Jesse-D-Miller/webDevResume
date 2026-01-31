import { describe, it, expect, vi, afterEach } from "vitest";
import { render, cleanup, waitFor } from "@testing-library/react";
import GithubStatsView from "../../src/components/resume/GithubStatsView.jsx";
import { fetchGithubStats } from "../../src/utils/fetchGithubStats.js";
import {
  saveStatsToCache,
  getStatsFromCache,
  isStatsCacheStale,
} from "../../src/utils/githubStatsCache.js";

vi.mock("../../src/utils/fetchGithubStats.js", () => ({
  fetchGithubStats: vi.fn(),
}));

vi.mock("../../src/utils/githubStatsCache.js", () => ({
  saveStatsToCache: vi.fn(),
  getStatsFromCache: vi.fn(),
  isStatsCacheStale: vi.fn(),
}));

describe("GithubStatsView", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("shows loading state initially", () => {
    vi.mocked(isStatsCacheStale).mockReturnValue(true);
    vi.mocked(fetchGithubStats).mockReturnValue(new Promise(() => {}));

    const { getByText } = render(<GithubStatsView />);
    expect(getByText("Loading GitHub stats...")).toBeTruthy();
  });

  it("uses cached data when cache is fresh", async () => {
    vi.mocked(isStatsCacheStale).mockReturnValue(false);
    vi.mocked(getStatsFromCache).mockReturnValue({
      data: {
        totalRepos: 2,
        totalCommits: 10,
        recentActivity: [],
        totalRepoSize: 2048,
      },
    });

    const { getByText } = render(<GithubStatsView />);

    await waitFor(() => {
      expect(getByText("Public Repositories:")).toBeTruthy();
    });

    expect(getByText("2")).toBeTruthy();
    expect(fetchGithubStats).not.toHaveBeenCalled();
  });

  it("fetches and caches when cache is stale", async () => {
    vi.mocked(isStatsCacheStale).mockReturnValue(true);
    vi.mocked(fetchGithubStats).mockResolvedValue({
      totalRepos: 3,
      totalCommits: 15,
      recentActivity: [],
      totalRepoSize: 4096,
    });

    const { getByText } = render(<GithubStatsView />);

    await waitFor(() => {
      expect(getByText("Public Repositories:")).toBeTruthy();
    });

    expect(saveStatsToCache).toHaveBeenCalled();
    expect(getByText("3")).toBeTruthy();
  });

  it("falls back to cache on fetch failure", async () => {
    vi.mocked(isStatsCacheStale).mockReturnValue(true);
    vi.mocked(fetchGithubStats).mockRejectedValue(new Error("network"));
    vi.mocked(getStatsFromCache).mockReturnValue({
      data: {
        totalRepos: 1,
        totalCommits: 5,
        recentActivity: [],
        totalRepoSize: 1024,
      },
    });

    const { getByText, queryByText } = render(<GithubStatsView />);

    await waitFor(() => {
      expect(getByText("Public Repositories:")).toBeTruthy();
    });

    expect(queryByText("Failed to load GitHub stats")).toBeNull();
  });

  it("shows error when fetch fails and no cache", async () => {
    vi.mocked(isStatsCacheStale).mockReturnValue(true);
    vi.mocked(fetchGithubStats).mockRejectedValue(new Error("network"));
    vi.mocked(getStatsFromCache).mockReturnValue(null);

    const { getByText } = render(<GithubStatsView />);

    await waitFor(() => {
      expect(getByText("Failed to load GitHub stats")).toBeTruthy();
    });
  });

  it("renders recent activity list", async () => {
    vi.mocked(isStatsCacheStale).mockReturnValue(false);
    vi.mocked(getStatsFromCache).mockReturnValue({
      data: {
        totalRepos: 1,
        totalCommits: 2,
        totalRepoSize: 1000,
        recentActivity: [
          { name: "repo-one", pushed_at: "2025-01-01T00:00:00Z" },
        ],
      },
    });

    const { getByText } = render(<GithubStatsView />);

    await waitFor(() => {
      expect(getByText(/repo-one/)).toBeTruthy();
    });
  });
});
