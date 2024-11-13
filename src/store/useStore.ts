import { create } from 'zustand';
import { User } from 'firebase/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  setCurrentUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<AuthState>()((set) => ({
  user: null,
  loading: true,
  setCurrentUser: (user) => set({ user, loading: false }),
  setLoading: (loading) => set({ loading })
}));