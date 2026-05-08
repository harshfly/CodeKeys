import Keyboard from '@/components/typing/Keyboard';
import './HandGuidePage.css';

export default function HandGuidePage() {
  return (
    <div className="page-content">
      <div className="container">
        <div className="section">
          <div className="section-label">Hand Position Guide</div>
          <div className="section-title">Master every key<br/>with the <em>right finger</em></div>
          <div className="section-sub">
            Proper finger placement is the single biggest lever for typing speed.
            Each finger has specific keys it "owns." Learn them and your speed doubles.
          </div>

          <div className="guide-grid">
            <div className="guide-card">
              <h3>🏠 Home Row Position</h3>
              <p>Your fingers should always return to the home row after every keystroke:</p>
              <div className="home-row-demo">
                <div className="hr-hand">
                  <div className="hr-title">Left Hand</div>
                  <div className="hr-keys">
                    <div className="hrk fl0">A<div className="hrk-f">Pinky</div></div>
                    <div className="hrk fl1">S<div className="hrk-f">Ring</div></div>
                    <div className="hrk fl2">D<div className="hrk-f">Middle</div></div>
                    <div className="hrk fl3">F<div className="hrk-f">Index</div></div>
                  </div>
                </div>
                <div className="hr-hand">
                  <div className="hr-title">Right Hand</div>
                  <div className="hr-keys">
                    <div className="hrk fr3">J<div className="hrk-f">Index</div></div>
                    <div className="hrk fr2">K<div className="hrk-f">Middle</div></div>
                    <div className="hrk fr1">L<div className="hrk-f">Ring</div></div>
                    <div className="hrk fr0">;<div className="hrk-f">Pinky</div></div>
                  </div>
                </div>
              </div>
              <p className="guide-note">The F and J keys have physical bumps — feel them without looking.</p>
            </div>

            <div className="guide-card">
              <h3>👆 Finger Zones</h3>
              <p>Each color represents a different finger's territory:</p>
              <div className="zone-list">
                <div className="zone-item"><div className="zone-dot" style={{background:'rgba(168,85,247,0.7)'}} /><strong>Pinky:</strong> Q/A/Z, P/;/', 1, 0, -, =, [, ], \, ', Enter</div>
                <div className="zone-item"><div className="zone-dot" style={{background:'rgba(56,189,248,0.7)'}} /><strong>Ring:</strong> W/S/X, O/L/., 2, 9</div>
                <div className="zone-item"><div className="zone-dot" style={{background:'rgba(52,211,153,0.7)'}} /><strong>Middle:</strong> E/D/C, I/K/,, 3, 8</div>
                <div className="zone-item"><div className="zone-dot" style={{background:'rgba(251,146,60,0.7)'}} /><strong>Index:</strong> R/F/V, T/G/B (L), Y/H/N, U/J/M (R), 4-7</div>
                <div className="zone-item"><div className="zone-dot" style={{background:'rgba(100,100,130,0.5)'}} /><strong>Thumb:</strong> Spacebar (either thumb)</div>
              </div>
            </div>

            <div className="guide-card wide">
              <h3>⌨️ Critical Coding Keys</h3>
              <p>The keys that slow programmers down the most:</p>
              <div className="coding-keys">
                {[
                  { k: ';', desc: 'Home row! Right pinky already there.', tip: 'No hand movement needed.' },
                  { k: '{}', desc: 'Shift + [ and ] with right pinky.', tip: 'Practice open-close as one motion.' },
                  { k: '()', desc: 'Shift + 9/0. Right ring + pinky.', tip: 'Function calls, conditions.' },
                  { k: '=>', desc: '= then > — right pinky + ring.', tip: 'Arrow function — drill daily.' },
                  { k: '===', desc: 'Three = signs rapid fire.', tip: 'JS strict equality — build rhythm.' },
                  { k: '`', desc: 'Left pinky, top-left corner key.', tip: 'Template literals in JS/TS.' },
                  { k: '_', desc: 'Shift + hyphen. Right pinky.', tip: 'snake_case everywhere.' },
                  { k: '\\', desc: 'Right pinky, above Enter.', tip: 'Escape chars, paths, regex.' },
                ].map(item => (
                  <div key={item.k} className="ck-item">
                    <div className="ck-key">{item.k}</div>
                    <div className="ck-info">
                      <div className="ck-desc">{item.desc}</div>
                      <div className="ck-tip">{item.tip}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{marginTop:'3rem'}}>
            <h3 style={{fontSize:'1rem',marginBottom:'1rem',fontWeight:600}}>Full Keyboard Reference</h3>
            <Keyboard activeKey="" />
          </div>

          <div className="posture-section">
            <h3>🪑 Ergonomic Tips</h3>
            <div className="posture-grid">
              {[
                { title: 'Wrist Position', desc: 'Keep wrists floating, not resting on the desk. Bent wrists = slow fingers.' },
                { title: 'Chair Height', desc: 'Elbows at 90°, feet flat on floor. Screen at eye level.' },
                { title: 'Light Touch', desc: 'Don\'t pound keys. Lighter touch = faster recovery = higher WPM.' },
                { title: 'Take Breaks', desc: '20-20-20 rule: every 20 min, look 20 feet away for 20 seconds.' },
              ].map((tip, i) => (
                <div key={i} className="posture-item">
                  <h4>{tip.title}</h4>
                  <p>{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
