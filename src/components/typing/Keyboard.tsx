import { KEYBOARD_ROWS, getKeyboardKeyForChar } from '@/data/fingerMap';
import './Keyboard.css';

interface Props {
  activeKey: string;
}

export default function Keyboard({ activeKey }: Props) {
  const targetKey = activeKey ? getKeyboardKeyForChar(activeKey) : '';

  return (
    <div className="kb-section">
      <div className="kb-title">Live Keyboard Guide — Color = Finger | Glow = Next Key</div>
      <div className="kb">
        {KEYBOARD_ROWS.map((row, ri) => (
          <div className="kb-row" key={ri}>
            {row.map((k, ki) => {
              const isLit = targetKey && (k.key === targetKey || k.key.toLowerCase() === targetKey.toLowerCase());
              const isHome = 'home' in k && (k as any).home;
              return (
                <div
                  key={ki}
                  className={`k ${k.classes || ''} ${k.width || ''} ${isLit ? 'lit' : ''} ${isHome ? 'home' : ''}`}
                  data-k={k.key}
                >
                  {k.label}
                  {isHome && <span className="home-dot" />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="kb-legend">
        <div className="kl"><div className="kl-dot" style={{background:'rgba(168,85,247,0.5)'}} />Pinky</div>
        <div className="kl"><div className="kl-dot" style={{background:'rgba(56,189,248,0.5)'}} />Ring</div>
        <div className="kl"><div className="kl-dot" style={{background:'rgba(52,211,153,0.5)'}} />Middle</div>
        <div className="kl"><div className="kl-dot" style={{background:'rgba(251,146,60,0.5)'}} />Index</div>
        <div className="kl"><div className="kl-dot" style={{background:'var(--accent)',boxShadow:'0 0 6px rgba(0,212,255,0.5)'}} />Next Key</div>
      </div>
    </div>
  );
}
