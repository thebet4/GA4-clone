/**
 * Generate a UUID v4
 * @returns A valid UUID string
 */
export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Get or create a client ID (persistent across sessions)
 * Stored in localStorage
 * @returns Client ID
 */
export function getOrCreateClientId(): string {
  const STORAGE_KEY = "ga4_client_id";

  try {
    let clientId = localStorage.getItem(STORAGE_KEY);

    if (!clientId) {
      clientId = generateUUID();
      localStorage.setItem(STORAGE_KEY, clientId);
    }

    return clientId;
  } catch (error) {
    // Fallback if localStorage is not available
    return generateUUID();
  }
}

/**
 * Get or create a session ID (persists only for current session)
 * Stored in sessionStorage
 * @returns Session ID
 */
export function getOrCreateSessionId(): string {
  const STORAGE_KEY = "ga4_session_id";

  try {
    let sessionId = sessionStorage.getItem(STORAGE_KEY);

    if (!sessionId) {
      sessionId = generateUUID();
      sessionStorage.setItem(STORAGE_KEY, sessionId);
    }

    return sessionId;
  } catch (error) {
    // Fallback if sessionStorage is not available
    return generateUUID();
  }
}

/**
 * Extract path from URL
 * @param url - Full URL string
 * @returns Path portion of URL
 */
export function extractPath(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname + urlObj.search + urlObj.hash;
  } catch (error) {
    return url;
  }
}
