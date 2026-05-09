import type { Difficulty, LanguageId } from '@/lib/constants';

export interface Level {
  id: number;
  name: string;
  desc: string;
  tags: string[];
  diff: Difficulty;
  icon: string;
  track: string;
  targetWpm: number;
  minAccuracy: number;
  lang?: LanguageId;
  snippetType?: string;
  level?: number;
}

function genFoundation(): Omit<Level, 'id' | 'track'>[] {
  return [
    { name: 'Home Row: Left Hand', desc: 'Master A S D F.', tags: ['ASDF'], diff: 'beginner', icon: '🏠', targetWpm: 15, minAccuracy: 90 },
    { name: 'Home Row: Right Hand', desc: 'Master J K L ;.', tags: ['JKL;'], diff: 'beginner', icon: '🏠', targetWpm: 15, minAccuracy: 90 },
    { name: 'Home Row: Full', desc: 'All 8 home row keys.', tags: ['Home'], diff: 'beginner', icon: '🏠', targetWpm: 20, minAccuracy: 92 },
    { name: 'Home Row: Speed', desc: 'Home row at 30 WPM.', tags: ['Speed'], diff: 'beginner', icon: '⚡', targetWpm: 30, minAccuracy: 95 },
    { name: 'Top Row: Left', desc: 'Q W E R T.', tags: ['QWERT'], diff: 'beginner', icon: '⬆️', targetWpm: 20, minAccuracy: 90 },
    { name: 'Top Row: Right', desc: 'Y U I O P.', tags: ['YUIOP'], diff: 'beginner', icon: '⬆️', targetWpm: 20, minAccuracy: 90 },
    { name: 'Top Row: Full', desc: 'All top row letters.', tags: ['Top'], diff: 'beginner', icon: '⬆️', targetWpm: 25, minAccuracy: 92 },
    { name: 'Bottom Row: Left', desc: 'Z X C V B.', tags: ['ZXCVB'], diff: 'beginner', icon: '⬇️', targetWpm: 18, minAccuracy: 88 },
    { name: 'Bottom Row: Right', desc: 'N M , . /.', tags: ['NM'], diff: 'beginner', icon: '⬇️', targetWpm: 18, minAccuracy: 88 },
    { name: 'Bottom Row: Full', desc: 'Complete bottom row.', tags: ['Bottom'], diff: 'beginner', icon: '⬇️', targetWpm: 22, minAccuracy: 90 },
    { name: 'All Letters: Slow', desc: 'All 26 letters slowly.', tags: ['All 26'], diff: 'beginner', icon: '🔤', targetWpm: 25, minAccuracy: 92 },
    { name: 'All Letters: Medium', desc: '35 WPM with all letters.', tags: ['Medium'], diff: 'beginner', icon: '🔤', targetWpm: 35, minAccuracy: 93 },
    { name: 'Capitals: Left Shift', desc: 'Left Shift for right-side caps.', tags: ['Shift'], diff: 'beginner', icon: '⇧', targetWpm: 20, minAccuracy: 88 },
    { name: 'Capitals: Right Shift', desc: 'Right Shift for left-side caps.', tags: ['Shift'], diff: 'beginner', icon: '⇧', targetWpm: 20, minAccuracy: 88 },
    { name: 'Capitals: Mixed', desc: 'Opposite-hand Shift rule.', tags: ['Mixed'], diff: 'beginner', icon: '⇧', targetWpm: 28, minAccuracy: 90 },
    { name: 'Numbers: 1-5', desc: 'Left hand numbers.', tags: ['1-5'], diff: 'beginner', icon: '🔢', targetWpm: 18, minAccuracy: 85 },
    { name: 'Numbers: 6-0', desc: 'Right hand numbers.', tags: ['6-0'], diff: 'beginner', icon: '🔢', targetWpm: 18, minAccuracy: 85 },
    { name: 'Numbers: Full', desc: 'All digits 0-9.', tags: ['0-9'], diff: 'beginner', icon: '🔢', targetWpm: 22, minAccuracy: 88 },
    { name: 'Numbers + Letters', desc: 'Alphanumeric mix.', tags: ['Alphanumeric'], diff: 'beginner', icon: '🔢', targetWpm: 25, minAccuracy: 90 },
    { name: 'Space Bar Rhythm', desc: 'Smooth spacing.', tags: ['Space'], diff: 'beginner', icon: '⌨️', targetWpm: 30, minAccuracy: 92 },
    { name: 'Tab Key', desc: 'Tab for indentation.', tags: ['Tab'], diff: 'beginner', icon: '↹', targetWpm: 20, minAccuracy: 85 },
    { name: 'Enter Key Flow', desc: 'Smooth Enter transitions.', tags: ['Enter'], diff: 'beginner', icon: '↵', targetWpm: 22, minAccuracy: 88 },
    { name: 'Code Keywords', desc: 'function, return, const...', tags: ['Keywords'], diff: 'beginner', icon: '📝', targetWpm: 35, minAccuracy: 93 },
    { name: 'Keyword Speed', desc: 'Code keywords at 40+ WPM.', tags: ['Speed'], diff: 'beginner', icon: '⚡', targetWpm: 40, minAccuracy: 93 },
    { name: 'Left Hand Solo', desc: 'Left hand only.', tags: ['Left'], diff: 'beginner', icon: '🤚', targetWpm: 28, minAccuracy: 90 },
    { name: 'Right Hand Solo', desc: 'Right hand only.', tags: ['Right'], diff: 'beginner', icon: '✋', targetWpm: 28, minAccuracy: 90 },
    { name: 'Finger: Index', desc: 'Index finger accuracy.', tags: ['Index'], diff: 'beginner', icon: '👆', targetWpm: 25, minAccuracy: 93 },
    { name: 'Finger: Pinky', desc: 'Strengthen the pinky.', tags: ['Pinky'], diff: 'beginner', icon: '🤙', targetWpm: 20, minAccuracy: 88 },
    { name: '35 WPM Gate', desc: 'Gateway to symbols.', tags: ['35 WPM'], diff: 'beginner', icon: '🚪', targetWpm: 35, minAccuracy: 93 },
    { name: '40 WPM Gate', desc: '40 WPM, 95% accuracy.', tags: ['40 WPM'], diff: 'beginner', icon: '🚪', targetWpm: 40, minAccuracy: 95 },
    { name: 'Eyes on Screen', desc: 'No looking at keyboard.', tags: ['Blind'], diff: 'beginner', icon: '👁️', targetWpm: 30, minAccuracy: 90 },
    { name: 'Accuracy: 97%+', desc: 'Maintain 97%+ accuracy.', tags: ['Accuracy'], diff: 'beginner', icon: '🎯', targetWpm: 20, minAccuracy: 97 },
    { name: 'Foundation Exam', desc: '40 WPM, 95% accuracy.', tags: ['Exam'], diff: 'beginner', icon: '🎓', targetWpm: 40, minAccuracy: 95 },
  ];
}

function genSymbols(): Omit<Level, 'id' | 'track'>[] {
  const s: Omit<Level, 'id' | 'track'>[] = [];
  const syms = [
    ['( )', '()', 20], [' { }', '{}', 20], ['[ ]', '[]', 20], ['< >', '<>', 18],
    ['All Brackets', '(){}[]<>', 22], ['Semicolon ;', ';', 25], ['Colon :', ':', 25],
    ["Single Quote '", "'", 22], ['Double Quote "', '"', 22], ['Backtick `', '`', 18],
    ['Equals =', '=', 25], ['Double == ', '==', 25], ['Triple ===', '===', 22],
    ['Not != !==', '!=', 22], ['Arrow =>', '=>', 22], ['Compare <= >=', '<=', 22],
    ['Underscore _', '_', 22], ['Hyphen -', '-', 25], ['Plus +', '+', 25],
    ['Asterisk *', '*', 22], ['Slash /', '/', 25], ['Backslash \\', '\\', 20],
    ['Pipe |', '|', 20], ['Ampersand &', '&', 20], ['Exclamation !', '!', 22],
    ['Question ?', '?', 22], ['At @', '@', 20], ['Hash #', '#', 20],
    ['Dollar $', '$', 20], ['Percent %', '%', 20], ['Caret ^', '^', 20],
    ['Tilde ~', '~', 18], ['Comments //', '//', 25], ['Block /* */', '/*', 22],
    ['Spread ...', '...', 22], ['Optional ?.', '?.', 20], ['Nullish ??', '??', 20],
    ['Destructuring', '{...}', 22], ['Template ${}', '${}', 20],
    ['All Operators', 'All', 28], ['Symbol Combos', 'Combos', 25],
    ['Punct Speed', 'Speed', 30], ['Symbol + Code', 'Mixed', 30],
    ['Symbol: 35 WPM', '35', 35], ['Symbol: 40 WPM', '40', 40],
    ['Regex Patterns', 'Regex', 20],
  ];
  syms.forEach(([name, tag, wpm]) => {
    s.push({
      name: String(name), desc: `Master ${name} in code context.`,
      tags: [String(tag)], diff: 'intermediate', icon: '⌨️',
      targetWpm: Number(wpm), minAccuracy: 88,
    });
  });
  return s;
}

function genLangLevels(langName: string, langId: LanguageId, count: number, icon: string): Level[] {
  const types = ['function', 'loop', 'class', 'async', 'algo', 'oop', 'symbol', 'pattern'];
  const diffs: Difficulty[] = ['intermediate', 'intermediate', 'advanced', 'advanced', 'expert', 'expert', 'elite', 'elite'];
  const result: Level[] = [];
  for (let i = 0; i < count; i++) {
    const phase = Math.floor((i / count) * types.length);
    const type = types[Math.min(phase, types.length - 1)];
    const diff = diffs[Math.min(phase, diffs.length - 1)];
    const wpm = 25 + Math.floor((i / count) * 75);
    result.push({
      id: 0, name: `${langName}: ${type} ${i + 1}`,
      desc: `Practice ${type} in ${langName}. Target: ${wpm} WPM.`,
      tags: [langName, type], diff, icon, track: langName,
      targetWpm: wpm, minAccuracy: Math.min(85 + Math.floor((i / count) * 12), 97),
      lang: langId, snippetType: type,
      level: (i % 30) + 1,
    });
  }
  return result;
}

export function generateAllLevels(): Level[] {
  const levels: Level[] = [];
  let id = 0;
  const assign = (items: Omit<Level, 'id' | 'track'>[], track: string) => {
    items.forEach(l => levels.push({ ...l, id: ++id, track }));
  };
  const assignFull = (items: Level[]) => {
    items.forEach(l => { l.id = ++id; levels.push(l); });
  };

  assign(genFoundation(), 'Foundation');
  assign(genSymbols(), 'Symbol Mastery');
  assignFull(genLangLevels('JavaScript', 'js', 70, '🌐'));
  assignFull(genLangLevels('TypeScript', 'ts', 50, '🔷'));
  assignFull(genLangLevels('Python', 'py', 60, '🐍'));
  assignFull(genLangLevels('Rust', 'rust', 40, '⚙️'));
  assignFull(genLangLevels('Go', 'go', 35, '🔀'));
  assignFull(genLangLevels('C++', 'cpp', 35, '⚡'));
  assignFull(genLangLevels('Java', 'java', 35, '☕'));
  assignFull(genLangLevels('SQL', 'sql', 30, '🗄️'));
  assignFull(genLangLevels('Ruby', 'ruby', 20, '💎'));
  assignFull(genLangLevels('PHP', 'php', 20, '🐘'));

  // Mixed Sprints
  for (let i = 0; i < 40; i++) {
    const wpm = 40 + i * 2;
    const diff: Difficulty = wpm < 60 ? 'intermediate' : wpm < 80 ? 'advanced' : wpm < 100 ? 'expert' : 'elite';
    levels.push({ id: ++id, name: `Sprint: ${wpm} WPM`, desc: `Any language. Hit ${wpm} WPM.`,
      tags: ['Sprint', `${wpm}`], diff, icon: '🏃', track: 'Mixed Sprints', targetWpm: wpm, minAccuracy: 93 });
  }

  // Elite (30)
  for (let i = 0; i < 30; i++) {
    levels.push({ id: ++id, name: `Elite Challenge ${i + 1}`, desc: `Elite challenge. ${80 + i * 2} WPM target.`,
      tags: ['Elite'], diff: 'elite', icon: '🏆', track: 'Elite', targetWpm: 80 + i * 2, minAccuracy: 95 });
  }

  return levels;
}

export const LEVELS = generateAllLevels();

export function getLevelsByTrack(): Record<string, Level[]> {
  const tracks: Record<string, Level[]> = {};
  LEVELS.forEach(l => { if (!tracks[l.track]) tracks[l.track] = []; tracks[l.track].push(l); });
  return tracks;
}
