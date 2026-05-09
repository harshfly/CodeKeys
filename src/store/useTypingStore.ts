import { create } from 'zustand';
import type { LanguageId, SnippetType } from '@/lib/constants';

interface TypingState {
  text: string;
  position: number;
  startTime: number | null;
  errors: number;
  totalTyped: number;
  finished: boolean;
  timeLimit: number;
  timeLeft: number;
  strictMode: boolean;
  zenMode: boolean;
  language: LanguageId;
  snippetType: SnippetType;
  errMap: Record<string, number>;
  typedStatuses: string[];
  
  setText: (text: string) => void;
  setLanguage: (lang: LanguageId) => void;
  setSnippetType: (type: SnippetType) => void;
  setTimeLimit: (limit: number) => void;
  setStrictMode: (on: boolean) => void;
  setZenMode: (on: boolean) => void;
  handleCorrectChar: () => void;
  handleWrongChar: (expected: string) => void;
  setStartTime: (time: number) => void;
  setTimeLeft: (time: number) => void;
  setFinished: (finished: boolean) => void;
  reset: () => void;
}

export const useTypingStore = create<TypingState>((set) => ({
  text: '',
  position: 0,
  startTime: null,
  errors: 0,
  totalTyped: 0,
  finished: false,
  timeLimit: 0,
  timeLeft: 0,
  strictMode: false,
  zenMode: false,
  language: 'js',
  snippetType: 'function',
  errMap: {},
  typedStatuses: [],

  setText: (text) => set({ text, position: 0, errors: 0, totalTyped: 0, startTime: null, finished: false, errMap: {}, typedStatuses: new Array(text.length).fill('') }),
  setLanguage: (language) => set({ language }),
  setSnippetType: (snippetType) => set({ snippetType }),
  setTimeLimit: (timeLimit) => set({ timeLimit, timeLeft: timeLimit }),
  setStrictMode: (strictMode) => set({ strictMode }),
  setZenMode: (zenMode) => set({ zenMode }),
  handleCorrectChar: () => set((s) => {
    const newStatuses = [...s.typedStatuses];
    newStatuses[s.position] = 'ok';
    return { position: s.position + 1, totalTyped: s.totalTyped + 1, typedStatuses: newStatuses };
  }),
  handleWrongChar: (expected) => set((s) => {
    const errMap = { ...s.errMap };
    errMap[expected] = (errMap[expected] || 0) + 1;
    if (s.strictMode) return { errors: s.errors + 1, totalTyped: s.totalTyped + 1, errMap };
    
    const newStatuses = [...s.typedStatuses];
    newStatuses[s.position] = 'err';
    return { position: s.position + 1, errors: s.errors + 1, totalTyped: s.totalTyped + 1, errMap, typedStatuses: newStatuses };
  }),
  setStartTime: (startTime) => set({ startTime }),
  setTimeLeft: (timeLeft) => set({ timeLeft }),
  setFinished: (finished) => set({ finished }),
  reset: () => set((s) => ({
    position: 0, errors: 0, totalTyped: 0, startTime: null, finished: false,
    timeLeft: s.timeLimit, errMap: {}, typedStatuses: new Array(s.text.length).fill('')
  })),
}));
