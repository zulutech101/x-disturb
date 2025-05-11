// types/session.ts
export interface SessionData {
  userId?: string;
  token?: string;
  isAuthenticated: boolean;
  accessToken?: string;
  // Add any other properties you want to store
}

// Type for the session storage methods
export interface SessionStorageTyped {
  getItem: <K extends keyof SessionData>(key: K) => SessionData[K] | null;
  setItem: <K extends keyof SessionData>(key: K, value: SessionData[K]) => void;
  removeItem: <K extends keyof SessionData>(key: K) => void;
  clear: () => void;
}
