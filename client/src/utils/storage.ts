const TOKEN_KEY = 'secure_note_token';
const USER_KEY = 'secure_note_user';

export const storage = {
  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string): void {
    sessionStorage.setItem(TOKEN_KEY, token);
  },

  getUser<T>(): T | null {
    const user = sessionStorage.getItem(USER_KEY);

    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user) as T;
    } catch {
      return null;
    }
  },

  setUser<T>(user: T): void {
    sessionStorage.setItem(
      USER_KEY,
      JSON.stringify(user),
    );
  },

  clear(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  },
};