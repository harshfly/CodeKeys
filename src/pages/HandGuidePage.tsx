import { useState } from 'react';
import Keyboard from '@/components/typing/Keyboard';
import './HandGuidePage.css';

export default function HandGuidePage() {
  const [activeTip, setActiveTip] = useState('posture');

  return (
    <div className="page-content">
      <div className="container">
        <div className="section">
          <div className="section-label">Hand Guide & Tips</div>
          <div className="section-title">Type like a surgeon,<br/>not a <em>caveman</em>.</div>
          
          <div className="tips-layout">
            {/* SIDEBAR NAV */}
            <div className="tips-sidebar">
              <div className="tips-nav-group">
                <div className="tng-label">Foundation</div>
                <div className={`tnav-item ${activeTip === 'posture' ? 'active' : ''}`} onClick={() => setActiveTip('posture')}><span className="tnav-icon">🪑</span>Posture & Setup</div>
                <div className={`tnav-item ${activeTip === 'homerow' ? 'active' : ''}`} onClick={() => setActiveTip('homerow')}><span className="tnav-icon">🏠</span>Home Row Method</div>
                <div className={`tnav-item ${activeTip === 'fingers' ? 'active' : ''}`} onClick={() => setActiveTip('fingers')}><span className="tnav-icon">✋</span>Finger Zones</div>
              </div>
              <div className="tips-nav-group">
                <div className="tng-label">Code-Specific</div>
                <div className={`tnav-item ${activeTip === 'specials' ? 'active' : ''}`} onClick={() => setActiveTip('specials')}><span className="tnav-icon">{`{ }`}</span>Special Characters</div>
              </div>
              <div className="tips-nav-group">
                <div className="tng-label">Improvement</div>
                <div className={`tnav-item ${activeTip === 'speed' ? 'active' : ''}`} onClick={() => setActiveTip('speed')}><span className="tnav-icon">⚡</span>Speed Building</div>
              </div>
            </div>

            {/* CONTENT AREA */}
            <div className="tips-content-area">
              
              {activeTip === 'posture' && (
                <div className="tip-panel">
                  <h2>Posture & Ergonomic Setup</h2>
                  <p className="tip-intro">Your typing speed ceiling is set before you type a single character. Poor posture creates muscular tension that caps both speed and accuracy — and causes carpal tunnel over years.</p>
                  <div className="posture-grid">
                    <div className="posture-item">
                      <div className="posture-icon">💺</div>
                      <div><h5>Chair height</h5><p>Elbows at 90°, forearms roughly parallel to floor. Feet flat on ground. Thighs parallel to floor.</p></div>
                    </div>
                    <div className="posture-item">
                      <div className="posture-icon">🖥️</div>
                      <div><h5>Monitor distance</h5><p>50–70cm away. Top of screen at or just below eye level. No tilting your head up or down.</p></div>
                    </div>
                    <div className="posture-item">
                      <div className="posture-icon">⌨️</div>
                      <div><h5>Keyboard position</h5><p>Directly in front of you, about 10–15cm from desk edge. Wrists neutrally floating.</p></div>
                    </div>
                    <div className="posture-item">
                      <div className="posture-icon">⏱️</div>
                      <div><h5>Take Breaks</h5><p>20-20-20 rule: every 20 min, look 20 feet away for 20 seconds. Let your hands drop and shake them out.</p></div>
                    </div>
                  </div>
                </div>
              )}

              {activeTip === 'homerow' && (
                <div className="tip-panel">
                  <h2>The Home Row Foundation</h2>
                  <p className="tip-intro">The home row is your base camp. Your fingers must instinctively return here after striking any other key. It minimizes travel distance.</p>
                  
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
                </div>
              )}

              {activeTip === 'fingers' && (
                <div className="tip-panel">
                  <h2>Finger Zones</h2>
                  <p className="tip-intro">Each color represents a different finger's territory. Never cross over—using the wrong finger builds bad muscle memory.</p>
                  
                  <div className="zone-list" style={{ marginBottom: '2rem' }}>
                    <div className="zone-item"><div className="zone-dot" style={{background:'rgba(168,85,247,0.7)'}} /><strong>Pinky:</strong> Q/A/Z, P/;/', 1, 0, -, =, [, ], \, ', Enter</div>
                    <div className="zone-item"><div className="zone-dot" style={{background:'rgba(56,189,248,0.7)'}} /><strong>Ring:</strong> W/S/X, O/L/., 2, 9</div>
                    <div className="zone-item"><div className="zone-dot" style={{background:'rgba(52,211,153,0.7)'}} /><strong>Middle:</strong> E/D/C, I/K/,, 3, 8</div>
                    <div className="zone-item"><div className="zone-dot" style={{background:'rgba(251,146,60,0.7)'}} /><strong>Index:</strong> R/F/V, T/G/B (L), Y/H/N, U/J/M (R), 4-7</div>
                  </div>
                  
                  <h3 style={{fontSize:'1rem',marginBottom:'1rem',fontWeight:600}}>Full Keyboard Reference</h3>
                  <Keyboard activeKey="" />
                </div>
              )}

              {activeTip === 'specials' && (
                <div className="tip-panel">
                  <h2>Critical Coding Keys</h2>
                  <p className="tip-intro">These are the keys that slow most programmers down. Master these to see an immediate WPM jump when typing actual code.</p>
                  
                  <div className="coding-keys">
                    {[
                      { k: ';', desc: 'Home row! Right pinky already there.', tip: 'No hand movement needed.' },
                      { k: '{}', desc: 'Shift + [ and ] with right pinky.', tip: 'Practice open-close as one motion.' },
                      { k: '()', desc: 'Shift + 9/0. Right ring + pinky.', tip: 'Function calls, conditions.' },
                      { k: '=>', desc: '= then > — right pinky + ring.', tip: 'Arrow function — drill daily.' },
                      { k: '===', desc: 'Three = signs rapid fire.', tip: 'JS strict equality.' },
                      { k: '`', desc: 'Left pinky, top-left corner key.', tip: 'Template literals in JS/TS.' }
                    ].map(item => (
                      <div key={item.k} className="ck-item">
                        <div className="ck-key">{item.k}</div>
                        <div>
                          <div className="ck-desc">{item.desc}</div>
                          <div className="ck-tip">{item.tip}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTip === 'speed' && (
                <div className="tip-panel">
                  <h2>Speed Building Principles</h2>
                  <p className="tip-intro">Speed comes from accuracy. If you try to type fast and make mistakes, you reinforce bad muscle memory and ultimately slow down.</p>
                  <ul style={{ color: 'var(--text2)', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                    <li><strong>Accuracy first:</strong> Slow down to achieve 98%+ accuracy. Speed will follow naturally.</li>
                    <li><strong>Read ahead:</strong> Look at the next word while typing the current one.</li>
                    <li><strong>Lighter touch:</strong> You don't need to bottom out keys. A lighter touch allows your fingers to rebound faster.</li>
                    <li><strong>Consistent practice:</strong> 15 minutes every single day is better than 2 hours once a week.</li>
                  </ul>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
