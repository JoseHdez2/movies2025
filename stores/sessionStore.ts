import type { Models } from 'react-native-appwrite';
import { create } from 'zustand';

interface SessionState {
  sessionId: string | null;
  setSessionId: (id: string | null) => void;
  session: Models.Session | null;
  setSession: (session: Models.Session | null) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  sessionId: null,
  setSessionId: (id: string | null) => set({ sessionId: id }),
  session: null,
  setSession: (session: Models.Session | null) => set({ session }),
}));