export const APP_NAME = 'CodeKeys';
export const APP_VERSION = '1.0.0';

export const THEMES = ['midnight', 'light'] as const;
export type Theme = typeof THEMES[number];

export const LANGUAGES = [
  { id: 'js', name: 'JavaScript', icon: '🌐', ext: '.js' },
  { id: 'ts', name: 'TypeScript', icon: '🔷', ext: '.ts' },
  { id: 'py', name: 'Python', icon: '🐍', ext: '.py' },
  { id: 'rust', name: 'Rust', icon: '⚙️', ext: '.rs' },
  { id: 'go', name: 'Go', icon: '🔀', ext: '.go' },
  { id: 'cpp', name: 'C++', icon: '⚡', ext: '.cpp' },
  { id: 'java', name: 'Java', icon: '☕', ext: '.java' },
  { id: 'sql', name: 'SQL', icon: '🗄️', ext: '.sql' },
  { id: 'html', name: 'HTML', icon: '📄', ext: '.html' },
  { id: 'css', name: 'CSS', icon: '🎨', ext: '.css' },
  { id: 'ruby', name: 'Ruby', icon: '💎', ext: '.rb' },
  { id: 'php', name: 'PHP', icon: '🐘', ext: '.php' },
] as const;

export type LanguageId = typeof LANGUAGES[number]['id'];

export const SNIPPET_TYPES = [
  'function', 'class', 'loop', 'async', 'algo', 'oop',
  'symbol', 'pattern', 'real-world', 'custom'
] as const;

export type SnippetType = typeof SNIPPET_TYPES[number];

export const DURATIONS = [15, 30, 60, 120] as const;

export const DIFFICULTY_LEVELS = ['beginner', 'intermediate', 'advanced', 'expert', 'elite'] as const;
export type Difficulty = typeof DIFFICULTY_LEVELS[number];

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  beginner: 'green',
  intermediate: 'amber',
  advanced: 'red',
  expert: 'purple',
  elite: 'accent',
};
