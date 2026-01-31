import { expect } from "chai";
import {
  saveStatsToCache,
  getStatsFromCache,
  isStatsCacheStale,
} from "../../src/utils/githubStatsCache.js";

function createLocalStorageMock() {
  const store = new Map();
  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, value),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
  };
}

describe("githubStatsCache", () => {
  const originalLocalStorage = globalThis.localStorage;
  const originalNow = Date.now;

  beforeEach(() => {
    globalThis.localStorage = createLocalStorageMock();
  });

  afterEach(() => {
    globalThis.localStorage = originalLocalStorage;
    Date.now = originalNow;
  });

  it("saves and retrieves cached stats", () => {
    const data = { totalRepos: 3 };
    saveStatsToCache(data);

    const cached = getStatsFromCache();
    expect(cached).to.have.property("data");
    expect(cached.data).to.deep.equal(data);
    expect(cached).to.have.property("timestamp");
  });

  it("reports cache as fresh within TTL", () => {
    Date.now = () => 1_000_000;
    saveStatsToCache({ totalRepos: 1 });

    Date.now = () => 1_000_000 + 1000;
    expect(isStatsCacheStale()).to.equal(false);
  });

  it("reports cache as stale after TTL", () => {
    Date.now = () => 1_000_000;
    saveStatsToCache({ totalRepos: 1 });

    Date.now = () => 1_000_000 + 2 * 24 * 60 * 60 * 1000;
    expect(isStatsCacheStale()).to.equal(true);
  });

  it("returns null when cache is missing", () => {
    const cached = getStatsFromCache();
    expect(cached).to.equal(null);
  });

  it("returns null when cache JSON is malformed", () => {
    globalThis.localStorage.setItem("githubStatsCache", "not-json");
    const cached = getStatsFromCache();
    expect(cached).to.equal(null);
  });
});
