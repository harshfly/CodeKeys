export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export function calculateWPM(charsTyped: number, elapsedMs: number): number {
  if (elapsedMs <= 0) return 0;
  const minutes = elapsedMs / 60000;
  return Math.round((charsTyped / 5) / minutes);
}

export function calculateAccuracy(totalTyped: number, errors: number): number {
  if (totalTyped <= 0) return 100;
  return Math.round(((totalTyped - errors) / totalTyped) * 100);
}

export function getGrade(wpm: number, accuracy: number): string {
  if (accuracy >= 98 && wpm >= 100) return 'S+';
  if (accuracy >= 98 && wpm >= 80) return 'S';
  if (accuracy >= 96 && wpm >= 60) return 'A';
  if (accuracy >= 93 && wpm >= 45) return 'B';
  if (accuracy >= 88) return 'C';
  return 'D';
}

export function getGradeColor(grade: string): string {
  const colors: Record<string, string> = {
    'S+': 'var(--amber)', S: 'var(--amber)', A: 'var(--green)',
    B: 'var(--accent)', C: 'var(--text2)', D: 'var(--red)',
  };
  return colors[grade] || 'var(--text2)';
}

export function formatTime(seconds: number): string {
  if (seconds >= 60) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }
  return `${seconds}`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
