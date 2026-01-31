import { expect } from "chai";
import {
  saveLanguageStatsToCache,
  getLanguageStatsFromCache,
  isCacheStale,
} from "../../src/utils/githubLanguageCache.js";

function createLocalStorageMock() {
  const store = new Map();
  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, value),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
  };
}

describe("githubLanguageCache", () => {
  const originalLocalStorage = globalThis.localStorage;
  const originalNow = Date.now;

  beforeEach(() => {
    globalThis.localStorage = createLocalStorageMock();
  });

  afterEach(() => {
    globalThis.localStorage = originalLocalStorage;
    Date.now = originalNow;
  });

  it("saves and retrieves cached language stats", () => {
    const data = { JavaScript: 12345 };
    saveLanguageStatsToCache(data);

    const cached = getLanguageStatsFromCache();
    expect(cached).to.have.property("data");
    expect(cached.data).to.deep.equal(data);
    expect(cached).to.have.property("timestamp");
  });

  it("reports cache as fresh within TTL", () => {
    Date.now = () => 1_000_000;
    saveLanguageStatsToCache({ JS: 1 });

    Date.now = () => 1_000_000 + 1000;
    expect(isCacheStale()).to.equal(false);
  });

  it("reports cache as stale after TTL", () => {
    Date.now = () => 1_000_000;
    saveLanguageStatsToCache({ JS: 1 });

    Date.now = () => 1_000_000 + 2 * 24 * 60 * 60 * 1000;
    expect(isCacheStale()).to.equal(true);
  });

  it("returns null when cache is missing", () => {
    const cached = getLanguageStatsFromCache();
    expect(cached).to.equal(null);
  });

  it("returns null when cache JSON is malformed", () => {
    globalThis.localStorage.setItem("githubLanguageCache", "not-json");
    const cached = getLanguageStatsFromCache();
    expect(cached).to.equal(null);
  });
});
