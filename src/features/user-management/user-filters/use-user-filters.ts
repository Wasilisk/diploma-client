import { create } from 'zustand';
import { Role } from 'shared/utils/types';

interface UserFiltersState {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  role: Role | null;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setRole: (value: Role | null) => void;
}

export const useUserFilters = create<UserFiltersState>((set) => ({
  firstName: null,
  lastName: null,
  email: null,
  role: null,
  setFirstName: (value) => set({ firstName: value.trim() === '' ? null : value }),
  setLastName: (value) => set({ lastName: value.trim() === '' ? null : value }),
  setEmail: (value) => set({ email: value.trim() === '' ? null : value }),
  setRole: (value) => set({ role: value }),
}));
