export const TIPS = [
  "Keep your eyes on the code, not the keyboard. Trust your muscle memory.",
  "Right pinky owns ; : { } [ ] — train it hardest.",
  "Speed before accuracy is a dead end. Hit 97%+ accuracy before pushing WPM.",
  "Opposite-hand Shift rule: right-side key = left Shift. Always.",
  "Return fingers to home row (ASDF JKL;) after every keystroke.",
  "After typing {, your next keys are Enter+Tab. Build that as one reflex.",
  "Relax your forearms. Tension = slower reaction time.",
  "Train bracket pairs daily: () {} [] — 50 times without looking.",
  "The backtick ` is left pinky, top corner. Critical for JS template literals.",
  "15 minutes daily beats 2 hours on weekends.",
  "Underscore _ = Shift+- with right pinky. Python and JS use it constantly.",
  "Don't bottom out every keystroke. Lighter touch = faster movement.",
  "Warm up for 3 minutes before timing yourself.",
  "Code typing is 40% special characters. Drill them.",
  "Every time you look down at the keyboard, you lose 200-400ms per character.",
];

export const ACHIEVEMENTS = [
  { id: 'first_test', icon: '🚀', name: 'First Test', desc: 'Complete your first typing test', condition: (s: any) => s.tests >= 1 },
  { id: 'streak_5', icon: '⚡', name: 'Streak x5', desc: '5 tests in a row', condition: (s: any) => s.tests >= 5 },
  { id: 'streak_10', icon: '🔥', name: 'On Fire', desc: '10 tests in a session', condition: (s: any) => s.tests >= 10 },
  { id: 'perfect', icon: '🎯', name: 'Perfect', desc: '100% accuracy on any test', condition: () => false },
  { id: 'wpm_40', icon: '🌱', name: '40 WPM', desc: 'Reach 40 WPM', condition: (s: any) => s.bestWPM >= 40 },
  { id: 'wpm_60', icon: '🔥', name: '60 WPM', desc: 'Reach 60 WPM', condition: (s: any) => s.bestWPM >= 60 },
  { id: 'wpm_80', icon: '💪', name: '80 WPM', desc: 'Reach 80 WPM', condition: (s: any) => s.bestWPM >= 80 },
  { id: 'wpm_100', icon: '🏆', name: '100 WPM', desc: 'Reach 100 WPM', condition: (s: any) => s.bestWPM >= 100 },
  { id: 'wpm_120', icon: '👑', name: '120 WPM', desc: 'Reach 120 WPM', condition: (s: any) => s.bestWPM >= 120 },
  { id: 'bracket_king', icon: '{ }', name: 'Bracket King', desc: '0 bracket errors in a test', condition: () => false },
  { id: 'polyglot', icon: '🌐', name: 'Polyglot', desc: 'Practice 5 different languages', condition: (s: any) => Object.keys(s.langStats || {}).length >= 5 },
  { id: 'strict', icon: '🔒', name: 'Strict Mode', desc: 'Complete a test in Strict mode', condition: () => false },
  { id: 'speed_demon', icon: '😈', name: 'Speed Demon', desc: 'Complete 15s test at 80+ WPM', condition: () => false },
  { id: 'marathon', icon: '🏃', name: 'Marathon', desc: 'Complete a 2-minute test', condition: () => false },
  { id: 'night_owl', icon: '🦉', name: 'Night Owl', desc: 'Practice after midnight', condition: () => new Date().getHours() >= 0 && new Date().getHours() < 5 },
  { id: 'early_bird', icon: '🐦', name: 'Early Bird', desc: 'Practice before 7 AM', condition: () => new Date().getHours() < 7 },
];

export const CHALLENGES = [
  { id: 'js_async', icon: '⚡', title: 'Speed Demon: JS Async', desc: 'Type a full async/await function.', tags: ['JavaScript', 'async'], diff: 'intermediate' as const, targetWpm: 70, time: '60s', reward: '⭐ Speed Badge', lang: 'js' as const },
  { id: 'rust_match', icon: '🦀', title: 'Rusty Fingers', desc: 'Rust match with all arms.', tags: ['Rust', 'match'], diff: 'advanced' as const, targetWpm: 60, time: '90s', reward: '🦀 Rustacean', lang: 'rust' as const },
  { id: 'py_class', icon: '🐍', title: 'Pythonic', desc: 'Python class with type hints.', tags: ['Python', 'class'], diff: 'intermediate' as const, targetWpm: 65, time: '75s', reward: '🐍 Pythonista', lang: 'py' as const },
  { id: 'sql_window', icon: '🗄️', title: 'SQL Window Wizard', desc: 'Complex SQL with CTEs.', tags: ['SQL', 'CTE'], diff: 'advanced' as const, targetWpm: 55, time: '2min', reward: '📊 Data Badge', lang: 'sql' as const },
  { id: 'ts_generics', icon: '🔷', title: 'TypeScript Generics', desc: 'Generic functions and types.', tags: ['TypeScript', '<T>'], diff: 'expert' as const, targetWpm: 75, time: '90s', reward: '🔷 Type Wizard', lang: 'ts' as const },
  { id: 'go_concurrent', icon: '⚙️', title: 'Go Concurrent', desc: 'Goroutines and channels.', tags: ['Go', 'goroutine'], diff: 'expert' as const, targetWpm: 65, time: '2min', reward: '⚙️ Gopher', lang: 'go' as const },
  { id: 'bracket_blitz', icon: '{ }', title: 'Bracket Blitz', desc: 'All brackets at max speed.', tags: ['Brackets', 'Speed'], diff: 'intermediate' as const, targetWpm: 50, time: '30s', reward: '🔗 Bracket Pro', lang: 'js' as const },
  { id: 'symbol_storm', icon: '⚡', title: 'Symbol Storm', desc: 'Every symbol at 60+ WPM.', tags: ['Symbols', 'All'], diff: 'advanced' as const, targetWpm: 60, time: '60s', reward: '⌨️ Symbol Master', lang: 'js' as const },
];

export const LEADERBOARD_DATA = [
  { rank: 1, name: 'CodeNinja42', wpm: 142, color: 'rgba(0,212,255,0.15)', textColor: 'var(--accent)' },
  { rank: 2, name: 'RustMaster', wpm: 138, color: 'rgba(0,232,122,0.1)', textColor: 'var(--green)' },
  { rank: 3, name: 'PyWizard', wpm: 131, color: 'rgba(168,85,247,0.1)', textColor: 'var(--purple)' },
  { rank: 4, name: 'TSExpert', wpm: 124, color: 'rgba(255,179,0,0.08)', textColor: 'var(--amber)' },
  { rank: 5, name: 'GoRoutine', wpm: 119, color: 'var(--surface2)', textColor: 'var(--text2)' },
  { rank: 6, name: 'SQLHero', wpm: 115, color: 'var(--surface2)', textColor: 'var(--text2)' },
  { rank: 7, name: 'DevTypist', wpm: 110, color: 'var(--surface2)', textColor: 'var(--text2)' },
  { rank: 8, name: 'ByteCraft', wpm: 107, color: 'var(--surface2)', textColor: 'var(--text2)' },
];
