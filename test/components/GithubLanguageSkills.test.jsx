import { describe, it, expect, vi, afterEach } from "vitest";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";
import GithubLanguageSkills from "../../src/components/resume/GithubLanguageSkills.jsx";
import { XPContext } from "../../src/context/XPContext.js";
import { fetchGithubStats } from "../../src/utils/fetchGithubStats.js";
import {
  saveLanguageStatsToCache,
  getLanguageStatsFromCache,
  isCacheStale,
} from "../../src/utils/githubLanguageCache.js";

vi.mock("../../src/utils/fetchGithubStats.js", () => ({
  fetchGithubStats: vi.fn(),
}));

vi.mock("../../src/utils/githubLanguageCache.js", () => ({
  saveLanguageStatsToCache: vi.fn(),
  getLanguageStatsFromCache: vi.fn(),
  isCacheStale: vi.fn(),
}));

function renderWithXP(value) {
  return render(
    <XPContext.Provider value={value}>
      <GithubLanguageSkills />
    </XPContext.Provider>
  );
}

describe("GithubLanguageSkills", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    vi.mocked(isCacheStale).mockReturnValue(true);
    vi.mocked(fetchGithubStats).mockReturnValue(new Promise(() => {}));

    const { getByText } = renderWithXP({
      grantXp: vi.fn(),
      hasClicked: () => false,
    });

    expect(getByText("Loading language skills...")).toBeTruthy();
  });

  it("uses cached data when cache is fresh", async () => {
    vi.mocked(isCacheStale).mockReturnValue(false);
    vi.mocked(getLanguageStatsFromCache).mockReturnValue({
      data: { JavaScript: 200, CSS: 100 },
      timestamp: Date.now(),
    });

    const { getByText, queryByText } = renderWithXP({
      grantXp: vi.fn(),
      hasClicked: () => false,
    });

    await waitFor(() => {
      expect(queryByText("Loading language skills...")).toBeNull();
    });

    expect(getByText(/JavaScript/)).toBeTruthy();
    expect(getByText(/CSS/)).toBeTruthy();
    expect(fetchGithubStats).not.toHaveBeenCalled();
  });

  it("fetches stats when cache is stale", async () => {
    vi.mocked(isCacheStale).mockReturnValue(true);
    vi.mocked(fetchGithubStats).mockResolvedValue({
      languageTotals: { JavaScript: 200, CSS: 100 },
    });

    const { getByText } = renderWithXP({
      grantXp: vi.fn(),
      hasClicked: () => false,
    });

    await waitFor(() => {
      expect(getByText(/JavaScript/)).toBeTruthy();
    });

    expect(saveLanguageStatsToCache).toHaveBeenCalledWith({
      JavaScript: 200,
      CSS: 100,
    });
  });

  it("falls back to cached data on fetch failure", async () => {
    vi.mocked(isCacheStale).mockReturnValue(true);
    vi.mocked(fetchGithubStats).mockRejectedValue(new Error("network"));
    vi.mocked(getLanguageStatsFromCache).mockReturnValue({
      data: { JavaScript: 50 },
      timestamp: Date.now(),
    });

    const { getByText, queryByText } = renderWithXP({
      grantXp: vi.fn(),
      hasClicked: () => false,
    });

    await waitFor(() => {
      expect(queryByText("Loading language skills...")).toBeNull();
    });

    expect(getByText(/JavaScript/)).toBeTruthy();
    expect(queryByText("Failed to load GitHub language stats")).toBeNull();
  });

  it("shows error when fetch fails and no cache", async () => {
    vi.mocked(isCacheStale).mockReturnValue(true);
    vi.mocked(fetchGithubStats).mockRejectedValue(new Error("network"));
    vi.mocked(getLanguageStatsFromCache).mockReturnValue(null);

    const { getByText } = renderWithXP({
      grantXp: vi.fn(),
      hasClicked: () => false,
    });

    await waitFor(() => {
      expect(getByText("Failed to load GitHub language stats")).toBeTruthy();
    });
  });

  it("grants XP only once on click", async () => {
    vi.mocked(isCacheStale).mockReturnValue(false);
    vi.mocked(getLanguageStatsFromCache).mockReturnValue({
      data: { JavaScript: 200 },
      timestamp: Date.now(),
    });

    const grantXp = vi.fn();
    const hasClicked = vi.fn()
      .mockImplementationOnce(() => false)
      .mockImplementationOnce(() => true);

    const { container } = renderWithXP({ grantXp, hasClicked });

    await waitFor(() => {
      const list = container.querySelector(".github-languages-section");
      expect(list).not.toBeNull();
    });

    const list = container.querySelector(".github-languages-section");
    fireEvent.click(list);
    fireEvent.click(list);

    expect(grantXp).toHaveBeenCalledTimes(1);
  });
});
