import { create } from 'zustand';
import type { LanguageId, SnippetType } from '@/lib/constants';

export interface SessionStats {
  tests: number;
  totalWPM: number;
  bestWPM: number;
  totalAcc: number;
  totalChars: number;
  wpmHistory: number[];
  errMap: Record<string, number>;
  langStats: Record<string, { tests: number; totalWPM: number }>;
}

interface StatsState {
  session: SessionStats;
  addTestResult: (wpm: number, acc: number, chars: number, lang: LanguageId, errors: Record<string, number>) => void;
  resetSession: () => void;
}

const initial: SessionStats = {
  tests: 0, totalWPM: 0, bestWPM: 0, totalAcc: 0, totalChars: 0,
  wpmHistory: [], errMap: {}, langStats: {},
};

export const useStatsStore = create<StatsState>((set) => ({
  session: { ...initial },
  addTestResult: (wpm, acc, chars, lang, errors) => set((state) => {
    const s = { ...state.session };
    s.tests++;
    s.totalWPM += wpm;
    if (wpm > s.bestWPM) s.bestWPM = wpm;
    s.totalAcc += acc;
    s.totalChars += chars;
    s.wpmHistory = [...s.wpmHistory, wpm].slice(-20);
    const errMap = { ...s.errMap };
    Object.entries(errors).forEach(([k, v]) => { errMap[k] = (errMap[k] || 0) + v; });
    s.errMap = errMap;
    if (!s.langStats[lang]) s.langStats[lang] = { tests: 0, totalWPM: 0 };
    s.langStats[lang].tests++;
    s.langStats[lang].totalWPM += wpm;
    return { session: s };
  }),
  resetSession: () => set({ session: { ...initial } }),
}));
