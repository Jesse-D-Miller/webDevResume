const CACHE_KEY = 'githubLanguageCache';
const CACHE_TTL = 7*24 * 60 * 60 * 1000; // 7 days


// Saves language stats data along with the current timestamp
export function saveLanguageStatsToCache(data) {
  const payload = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
}


// Retrieves language stats data from cache
export function getLanguageStatsFromCache() {
  const raw = localStorage.getItem(CACHE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Checks if the cached data is stale based on TTL
export function isCacheStale() {
  const cached = getLanguageStatsFromCache();
  if (!cached) return true;
  return Date.now() - cached.timestamp > CACHE_TTL;
}