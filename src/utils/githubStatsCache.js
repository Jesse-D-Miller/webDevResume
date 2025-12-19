const STATS_CACHE_KEY = 'githubStatsCache';
const STATS_CACHE_TTL = 24 * 60 * 60 * 1000; // 1 day

export function saveStatsToCache(data) {
  localStorage.setItem(STATS_CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
}

export function getStatsFromCache() {
  const raw = localStorage.getItem(STATS_CACHE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isStatsCacheStale() {
  const cached = getStatsFromCache();
  if (!cached) return true;
  return Date.now() - cached.timestamp > STATS_CACHE_TTL;
}