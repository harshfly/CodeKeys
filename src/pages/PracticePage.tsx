import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Zap, Target, AlertCircle, Clock } from 'lucide-react';
import { useTypingStore } from '@/store/useTypingStore';
import { useStatsStore } from '@/store/useStatsStore';
import { useAuthStore } from '@/store/useAuthStore';
import { supabase } from '@/lib/supabase';
import { getSnippet } from '@/data/snippets';
import { getFingerForKey, KEY_HINTS } from '@/data/fingerMap';
import { LANGUAGES, SNIPPET_TYPES, DURATIONS } from '@/lib/constants';
import type { LanguageId, SnippetType } from '@/lib/constants';
import { calculateWPM, calculateAccuracy, getGrade, getGradeColor, formatTime } from '@/lib/utils';
import { TIPS } from '@/data/tips';
import Keyboard from '@/components/typing/Keyboard';
import { Globe, Shield, Terminal, Settings, Coffee, Database, Layout, Palette, Gem, Server, Braces } from 'lucide-react';
import './PracticePage.css';

type PracticeStep = 'select-lang' | 'typing';

const ICON_MAP: Record<string, any> = {
  js: Globe,
  ts: Shield,
  py: Terminal,
  rust: Settings,
  go: Zap,
  cpp: Braces,
  java: Coffee,
  sql: Database,
  html: Layout,
  css: Palette,
  ruby: Gem,
  php: Server,
};

export default function PracticePage() {
  const [searchParams] = useSearchParams();
  const store = useTypingStore();
  const stats = useStatsStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [tipIdx, setTipIdx] = useState(0);
  const [step, setStep] = useState<PracticeStep>('select-lang');
  const [selectedLang, setSelectedLang] = useState<LanguageId | null>(null);
  const [currentLevel, setCurrentLevel] = useState(1);

  // Check if we came from a level link
  useEffect(() => {
    const lang = searchParams.get('lang');
    const type = searchParams.get('type');
    const lvl = searchParams.get('level');
    if (lang) {
      store.setLanguage(lang as LanguageId);
      setSelectedLang(lang as LanguageId);
      const snippetType = (type || 'function') as SnippetType;
      store.setSnippetType(snippetType);
      
      const levelNum = lvl ? parseInt(lvl, 10) : 0;
      setCurrentLevel(levelNum);
      
      const text = getSnippet(lang as LanguageId, snippetType, levelNum);
      store.setText(text);
      setStep('typing');
    }
  }, [searchParams]);

  const loadNewSnippet = useCallback((lvl = currentLevel) => {
    const text = getSnippet(store.language, store.snippetType, lvl);
    store.setText(text);
    const freshState = useTypingStore.getState();
    store.setTimeLeft(freshState.timeLimit);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [store.language, store.snippetType, currentLevel]);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);



  const startTimer = useCallback(() => {
    const s = useTypingStore.getState();
    if (s.timeLimit === 0) return; // Free time mode
    if (store.zenMode) return;
    timerRef.current = setInterval(() => {
      const currentS = useTypingStore.getState();
      const newTime = currentS.timeLeft - 1;
      currentS.setTimeLeft(newTime);
      if (newTime <= 0) {
        clearInterval(timerRef.current!);
        finishTest();
      }
    }, 1000);
  }, [store.zenMode]);

  const finishTest = useCallback(() => {
    const s = useTypingStore.getState();
    if (s.finished) return;
    s.setFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);
    const elapsed = s.startTime ? Date.now() - s.startTime : 1;
    const wpm = calculateWPM(s.position, elapsed);
    const acc = calculateAccuracy(s.totalTyped, s.errors);
    stats.addTestResult(wpm, acc, s.position, s.language, s.errMap);
    
    // Save to Supabase if logged in
    const auth = useAuthStore.getState();
    if (auth.user) {
      supabase.from('typing_stats').insert({
        user_id: auth.user.id,
        wpm: wpm,
        accuracy: acc,
        chars_typed: s.position,
        language: s.language,
        snippet_type: s.snippetType
      }).then(({ error }) => {
        if (error) console.error('Error saving stats:', error);
      });
      
      if (currentLevel > 0) {
        supabase.from('level_progress').upsert({
          user_id: auth.user.id,
          level_id: currentLevel,
          completed: true,
          best_wpm: wpm,
          best_accuracy: acc
        }, { onConflict: 'user_id,level_id' }).then(({ error }) => {
          if (error) console.error('Error saving progress:', error);
        });
      }
    }
  }, [currentLevel]);

  const handleChar = useCallback((char: string) => {
    const s = useTypingStore.getState();
    if (s.finished || s.position >= s.text.length) return;
    if (!s.startTime) { s.setStartTime(Date.now()); startTimer(); }
    const expected = s.text[s.position];
    if (char === expected) {
      s.handleCorrectChar();
      
      // Auto-indent skip: if we just typed a newline, skip leading spaces on the next line
      if (char === '\n') {
        setTimeout(() => {
          const s_updated = useTypingStore.getState();
          let nextPos = s_updated.position;
          const text = s_updated.text;
          let spacesToSkip = 0;
          while (nextPos < text.length && text[nextPos] === ' ') {
            nextPos++;
            spacesToSkip++;
          }
          if (spacesToSkip > 0) {
            for (let i = 0; i < spacesToSkip; i++) {
              useTypingStore.getState().handleCorrectChar();
            }
          }
        }, 0);
      }
    } else {
      s.handleWrongChar(expected);
      
      // Vibrate system
      if ('vibrate' in navigator) {
        navigator.vibrate(100);
      }
      
      // Visual shake
      const codeBox = document.querySelector('.code-box');
      if (codeBox) {
        codeBox.classList.add('shake');
        setTimeout(() => codeBox.classList.remove('shake'), 300);
      }
    }
    if (useTypingStore.getState().position >= s.text.length) finishTest();
  }, [startTimer, finishTest]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (store.finished) return;
    if (e.key === 'Tab') { e.preventDefault(); handleChar('\t'); return; }
    if (e.key === 'Enter') { e.preventDefault(); handleChar('\n'); return; }
    if (e.key === 'Backspace' && store.strictMode) { e.preventDefault(); return; }
    if (e.key === 'Escape') { handleReset(); return; }
  }, [store.finished, store.strictMode, handleChar]);

  const handleInput = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const val = input.value;
    if (val.length > 0) {
      handleChar(val[val.length - 1]);
      input.value = '';
    }
  }, [handleChar]);

  const handleReset = () => {
    store.reset();
    store.setTimeLeft(store.timeLimit);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const goBackToLangs = () => {
    handleReset();
    setSelectedLang(null);
    setStep('select-lang');
  };

  const focusInput = () => inputRef.current?.focus();
  const currentChar = store.position < store.text.length ? store.text[store.position] : '';
  const fingerInfo = getFingerForKey(currentChar);
  const elapsed = store.startTime ? Date.now() - store.startTime : 0;
  const liveWpm = store.startTime ? calculateWPM(store.position, elapsed) : 0;
  const liveAcc = calculateAccuracy(store.totalTyped, store.errors);
  const progress = store.text.length > 0 ? (store.position / store.text.length) * 100 : 0;
  const timerClass = store.timeLeft <= 5 ? 'low' : store.timeLeft <= 10 ? 'warn' : '';

  const finalWpm = store.startTime ? calculateWPM(store.position, store.startTime ? Date.now() - store.startTime : 1) : 0;
  const finalAcc = calculateAccuracy(store.totalTyped, store.errors);
  const finalGrade = getGrade(finalWpm, finalAcc);
  const finalTime = store.startTime ? Math.round((Date.now() - store.startTime) / 1000) : 0;

  // ==== STEP 1: LANGUAGE SELECTOR ====
  if (step === 'select-lang') {
    return (
      <div className="page-content">
        <div className="container">
          <div className="section">
            <div className="section-label">Practice Arena</div>
            <div className="section-title">Choose your <em>language</em></div>
            <p className="section-sub">Select a programming language to practice typing real code snippets.</p>

            <div className="lang-grid">
              {LANGUAGES.map(lang => {
                const IconComp = ICON_MAP[lang.id];
                return (
                  <div key={lang.id} className="lang-card" onClick={() => {
                    setSelectedLang(lang.id as LanguageId);
                    store.setLanguage(lang.id as LanguageId);
                    store.setSnippetType('function'); // default to function topic
                    const text = getSnippet(lang.id as LanguageId, 'function');
                    store.setText(text);
                    store.setTimeLeft(store.timeLimit);
                    setStep('typing');
                    if (timerRef.current) clearInterval(timerRef.current);
                  }}>
                    <div className="lang-card-icon">
                      {IconComp ? <IconComp size={28} strokeWidth={1.5} /> : lang.icon}
                    </div>
                    <div className="lang-card-name">{lang.name}</div>
                    <div className="lang-card-ext">{lang.ext}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="container">
        <div style={{ paddingTop: '50px', paddingBottom: '2rem' }}>
          
          <div className="typing-split">
            {/* LEFT COLUMN */}
            <div className="typing-left">
              
              {/* CONTROLS ROW */}
              <div className="arena-header" style={{ marginBottom: '1rem' }}>
                <div className="arena-breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <select className="c-sel" value={store.language} onChange={(e) => { store.setLanguage(e.target.value as any); setCurrentLevel(1); loadNewSnippet(1); }}>
                    {LANGUAGES.map(l => (
                      <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                  </select>
                </div>
                <div className="arena-controls" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {DURATIONS.map(d => (
                    <button key={d} className={`c-btn ${store.timeLimit === d ? 'sel' : ''}`}
                      onClick={() => { store.setTimeLimit(d); loadNewSnippet(); }}>
                      {d === 0 ? 'Free' : d >= 60 ? `${d / 60}min` : `${d}s`}
                    </button>
                  ))}
                  <button className={`c-btn ${store.strictMode ? 'on' : ''}`} onClick={() => store.setStrictMode(!store.strictMode)}>
                    Strict
                  </button>
                  <button className="c-btn" onClick={() => loadNewSnippet()} style={{ color: 'var(--amber)' }}>↺ New</button>
                  <button className="c-btn" onClick={() => {
                    const types = SNIPPET_TYPES.filter(t => t !== 'custom');
                    const nextType = types[(types.indexOf(store.snippetType as any) + 1) % types.length] as any;
                    store.setSnippetType(nextType);
                    loadNewSnippet();
                  }} style={{ color: 'var(--green)' }}>Next →</button>
                </div>
              </div>

              {/* TOPIC TABS */}
              <div className="snippet-tabs" style={{ marginBottom: '1rem', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {SNIPPET_TYPES.filter(t => t !== 'custom').map(t => (
                  <button key={t} className={`stab ${store.snippetType === t ? 'active' : ''}`}
                    onClick={() => {
                      store.setSnippetType(t as any);
                      const text = getSnippet(store.language, t as any, currentLevel);
                      store.setText(text);
                      store.setTimeLeft(store.timeLimit);
                      if (timerRef.current) clearInterval(timerRef.current);
                    }}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>

              {/* LEVEL SELECTOR */}
              <div className="level-selector" style={{ marginBottom: '1.5rem', display: 'flex', gap: '6px', flexWrap: 'wrap', background: 'var(--surface)', padding: '8px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text2)', alignSelf: 'center', marginRight: '4px', fontWeight: 600 }}>Levels:</span>
                {Array.from({ length: 30 }, (_, i) => i + 1).map(l => (
                  <button key={l} className={`level-btn ${currentLevel === l ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentLevel(l);
                      loadNewSnippet(l);
                      handleReset();
                    }}
                    style={{
                      background: currentLevel === l ? 'var(--accent)' : 'var(--surface2)',
                      color: currentLevel === l ? '#000' : 'var(--text2)',
                      border: '1px solid var(--border2)',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '0.75rem',
                      fontWeight: currentLevel === l ? '700' : '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>
                    {l}
                  </button>
                ))}
              </div>

              {/* CODE BOX */}
              <div className="code-panel">
                <div className="code-box" onClick={focusInput} tabIndex={0}>
                  <div className="chars">
                    {store.text.split('').map((ch, i) => {
                      let cls = 'ch ';
                      if (store.typedStatuses[i] === 'ok') cls += 'ok ';
                      else if (store.typedStatuses[i] === 'err') cls += 'err ';
                      else if (i < store.position) cls += 'ok '; // fallback
                      
                      if (i === store.position) cls += 'cur ';
                      if (i >= store.position && !store.typedStatuses[i]) cls += 'todo ';
                      if (ch === ' ') cls += 'sp ';
                      const display = ch === '\n' ? '↵\n' : ch === ' ' ? '\u00A0' : ch;
                      return <span key={i} className={cls}>{display}</span>;
                    })}
                  </div>
                  <input ref={inputRef} className="hidden-input" type="text" autoComplete="off"
                    autoCorrect="off" autoCapitalize="off" spellCheck={false}
                    onKeyDown={handleKeyDown} onInput={handleInput} />
                </div>

                {!store.startTime && !store.finished && (
                  <p className="click-hint">↑ click and start typing — Esc to reset</p>
                )}

                {/* RESULT SCREEN */}
                {store.finished && (
                  <div className="result-screen show">
                    <div className="res-wpm">{finalWpm}</div>
                    <div className="res-label">words per minute</div>
                    <div className="res-row">
                      <div className="res-item"><div className="res-val" style={{ color: 'var(--green)' }}>{finalAcc}%</div><div className="res-key">Accuracy</div></div>
                      <div className="res-item"><div className="res-val" style={{ color: 'var(--red)' }}>{store.errors}</div><div className="res-key">Errors</div></div>
                      <div className="res-item"><div className="res-val" style={{ color: 'var(--amber)' }}>{finalTime}s</div><div className="res-key">Time</div></div>
                      <div className="res-item"><div className="res-grade" style={{ color: getGradeColor(finalGrade) }}>{finalGrade}</div><div className="res-key">Grade</div></div>
                    </div>
                    <div className="res-tip">
                      {finalWpm < 40 ? "Focus on accuracy first — speed follows." :
                        finalWpm < 60 ? "Good progress! Try strict mode next." :
                          finalWpm < 80 ? "Solid! Focus on bracket pairs." :
                            "Excellent! Push for 95%+ accuracy."}
                    </div>
                    <div style={{ display: 'flex', gap: 10, marginTop: '1rem' }}>
                      <button className="btn btn-secondary" onClick={handleReset}>Try Again</button>
                      <button className="btn btn-primary" onClick={() => { 
                        if (currentLevel < 10) {
                          const nextLvl = currentLevel + 1;
                          setCurrentLevel(nextLvl);
                          loadNewSnippet(nextLvl);
                          handleReset();
                        } else {
                          const types = SNIPPET_TYPES.filter(t => t !== 'custom');
                          const nextType = types[(types.indexOf(store.snippetType as any) + 1) % types.length] as any;
                          store.setSnippetType(nextType);
                          setCurrentLevel(1);
                          const text = getSnippet(store.language, nextType, 1);
                          store.setText(text);
                          store.setTimeLeft(store.timeLimit);
                          handleReset();
                        }
                      }}>Next Level →</button>
                    </div>
                  </div>
                )}
              </div>

              {/* KEYBOARD */}
              <div className="kb-wrapper" style={{ marginTop: '1.5rem' }}>
                <div style={{ transform: 'scale(0.85)', transformOrigin: 'top center', paddingBottom: '0.5rem' }}>
                  <Keyboard activeKey={currentChar} />
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="typing-right" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* STATS ROW */}
              <div className="live-bar centered">
                <div className="lb-stat">
                  <div className="lb-val accent" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Zap size={16} /> {liveWpm}
                  </div>
                  <div className="lb-key">WPM</div>
                </div>
                <div className="lb-stat">
                  <div className="lb-val green" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Target size={16} /> {liveAcc}%
                  </div>
                  <div className="lb-key">Accuracy</div>
                </div>
                <div className="lb-stat">
                  <div className="lb-val red" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertCircle size={16} /> {store.errors}
                  </div>
                  <div className="lb-key">Errors</div>
                </div>
                {!store.zenMode && store.timeLimit !== 0 && (
                  <div className={`timer-pill ${timerClass}`} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={16} /> {formatTime(store.timeLeft)}
                  </div>
                )}
                <div className="prog-track-h"><div className="prog-fill-h" style={{ width: `${progress}%` }} /></div>
              </div>

              {/* NEXT KEY INFO */}
              <div className="nk-box">
                <div className="nk-label">NEXT KEY</div>
                <div className="nk-char">{store.position >= store.text.length ? '✓' : currentChar === '\n' ? '↵' : currentChar === ' ' ? '␣' : currentChar || '—'}</div>
                <div className="nk-finger">{store.position >= store.text.length ? 'Done!' : fingerInfo.finger}</div>
              </div>

              {/* ERROR SUMMARY */}
              <div className="err-mini">
                <div className="err-mini-title">SESSION ERRORS</div>
                {Object.keys(store.errMap).length === 0 ? (
                  <div className="err-mini-empty">No errors — keep going!</div>
                ) : (
                  <div className="err-mini-list">
                    {Object.entries(store.errMap).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([k, v]) => {
                      const max = Math.max(...Object.values(store.errMap));
                      return (
                        <div key={k} className="re-item">
                          <div className="re-char">{k === ' ' ? 'SPC' : k === '\n' ? 'ENT' : k}</div>
                          <div className="re-bar-wrap"><div className="re-bar" style={{ width: `${Math.round(v / max * 100)}%` }} /></div>
                          <div className="re-count">{v}x</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* SESSION STATS */}
              <div className="err-mini">
                <div className="err-mini-title">SESSION STATS</div>
                <div className="re-item" style={{ background: 'transparent', border: 'none', padding: '2px 0' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text2)', flex: 1 }}>Characters typed</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color: 'var(--text)' }}>{store.position}</div>
                </div>
                <div className="re-item" style={{ background: 'transparent', border: 'none', padding: '2px 0' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text2)', flex: 1 }}>Time remaining</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color: 'var(--text)' }}>{store.timeLeft}s</div>
                </div>
              </div>

              {/* QUICK TIP */}
              <div className="tip-mini" style={{ background: 'var(--surface2)', borderRadius: 'var(--radius)', padding: '1rem', border: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 700, letterSpacing: '1px', marginBottom: '8px' }}>QUICK TIP</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text2)', lineHeight: 1.6 }}>Keep your eyes on the code, not the keyboard. Trust your muscle memory.</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
