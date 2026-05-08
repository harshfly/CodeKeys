import { create } from 'zustand';
import type { Theme } from '@/lib/constants';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const stored = typeof window !== 'undefined' ? localStorage.getItem('codekeys-theme') as Theme : null;

export const useThemeStore = create<ThemeState>((set) => ({
  theme: stored || 'midnight',
  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('codekeys-theme', theme);
    set({ theme });
  },
}));
