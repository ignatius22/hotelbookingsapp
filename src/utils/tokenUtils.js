export const TOKEN_KEY = "token";
export const USER_KEY = "user";

/**
 * Save the token and user data to localStorage.
 * @param {string} token - The JWT token.
 * @param {object} user - The user object.
 */
export function saveSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * Retrieve the token from localStorage.
 * @returns {string|null} The JWT token or null if not found.
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Retrieve the user data from localStorage.
 * @returns {object|null} The user object or null if not found.
 */
export function getUser() {
  const user = localStorage.getItem(USER_KEY);
  try {
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Failed to parse user data from localStorage:", error);
    return null;
  }
}

/**
 * Clear the token and user data from localStorage.
 */
export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}