import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface AuthState {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
}

type AuthPersist = (
  config: StateCreator<AuthState>,
  options: PersistOptions<AuthState>,
) => StateCreator<AuthState>;

export const useAuth = create<AuthState>(
  (persist as AuthPersist)(
    (set) => ({
      isAuth: false,
      login: () => set({ isAuth: true }),
      logout: () => set({ isAuth: false }),
    }),
    { name: 'auth-store' },
  ),
);
