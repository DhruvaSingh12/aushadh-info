// Utility for caching API responses to reduce Supabase calls

// Cache expiration time (3 hours in milliseconds)
const CACHE_EXPIRATION = 3 * 60 * 60 * 1000;

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

export interface CachedData<T> {
  data: T;
  timestamp: number;
}

// Save data to localStorage with timestamp
export const cacheData = <T>(key: string, data: T): void => {
  if (!isBrowser) return;
  
  try {
    const item: CachedData<T> = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error('Error caching data:', error);
  }
};

// Get cached data if it exists and isn't expired
export const getCachedData = <T>(key: string): T | null => {
  if (!isBrowser) return null;
  
  try {
    const cachedItem = localStorage.getItem(key);
    if (!cachedItem) return null;
    
    const item: CachedData<T> = JSON.parse(cachedItem);
    const now = Date.now();
    
    // Check if the data is expired
    if (now - item.timestamp > CACHE_EXPIRATION) {
      localStorage.removeItem(key);
      return null;
    }
    
    return item.data;
  } catch (error) {
    console.error('Error retrieving cached data:', error);
    return null;
  }
};

// Clear all cached data (for manual refresh)
export const clearCache = (): void => {
  if (!isBrowser) return;
  
  try {
    // Only clear our cache keys, not all localStorage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('aushadh_cache_')) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}; 