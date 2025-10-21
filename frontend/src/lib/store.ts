import { create } from "zustand";

interface AuthState {
  accessToken?: string;
  isAuthenticated: boolean;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  accessToken: undefined,
  isAuthenticated: false,
  setAccessToken: (token) => set({ accessToken: token, isAuthenticated: true }),
  logout: () => {
    sessionStorage.clear();
    set({ accessToken: undefined, isAuthenticated: false });
  },
}));
