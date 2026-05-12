import { Link } from 'react-router-dom';
import { LEVELS } from '@/data/levels';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="page-content">
      <div className="container">
        {/* HERO */}
        <div className="section hero">
          <div className="hero-inner">
            <div>
              <div className="hero-pill"><div className="hero-pill-dot pulse" />Built for developers — not secretaries</div>
              <h1 className="hero-heading">The ultimate<br/><em>typing test</em><br/>for developers.</h1>
              <p className="hero-desc">The only typing platform engineered for programmers. Real code snippets, special characters, 12+ languages — from 30 WPM to 120+ WPM.</p>
              <div className="hero-btns">
                <Link to="/practice" className="btn btn-primary">Start Practicing →</Link>
                <Link to="/levels" className="btn btn-secondary">View Curriculum</Link>
              </div>
              <div className="hero-stats">
                <div className="hstat"><div className="hstat-num">12+</div><div className="hstat-lbl">Languages</div></div>
                <div className="hstat"><div className="hstat-num">{LEVELS.length}+</div><div className="hstat-lbl">Levels</div></div>
                <div className="hstat"><div className="hstat-num">120<span style={{fontSize:'1rem'}}>wpm</span></div><div className="hstat-lbl">Max Target</div></div>
              </div>
            </div>
            <div>
              <div className="hero-terminal">
                <div className="term-bar">
                  <div className="term-dots"><div className="td td-r" /><div className="td td-a" /><div className="td td-g" /></div>
                  <div className="term-name">practice.js — CodeKeys</div>
                </div>
                <div className="term-body">
                  <div className="cl"><span className="ln">1</span><span><span className="kw">async function</span> <span className="fn">fetchUser</span>(id) {'{'}</span></div>
                  <div className="cl"><span className="ln">2</span><span>  <span className="kw">try</span> {'{'}</span></div>
                  <div className="cl"><span className="ln">3</span><span>    <span className="kw">const</span> res = <span className="kw">await</span> <span className="fn">fetch</span>(<span className="str">`/api/${'{'}<span className="op">id</span>{'}'}` </span>);</span></div>
                  <div className="cl"><span className="ln">4</span><span>    <span className="kw">if</span> (!res.ok) <span className="kw">throw new</span> Error(<span className="str">'Not found'</span>);</span></div>
                  <div className="cl"><span className="ln">5</span><span>    <span className="kw">return await</span> res.<span className="fn">json</span>();</span></div>
                  <div className="cl"><span className="ln">6</span><span>  {'}'} <span className="kw">catch</span> (err) {'{'}</span></div>
                  <div className="cl"><span className="ln">7</span><span>    <span className="cmt">// handle gracefully</span><span className="cursor" /></span></div>
                  <div className="cl"><span className="ln">8</span><span>  {'}'}</span></div>
                  <div className="cl"><span className="ln">9</span><span>{'}'}</span></div>
                </div>
              </div>
              <div className="lang-pills">
                {['JavaScript','Python','Rust','Go','TypeScript','C++','Java','SQL','HTML','CSS','Ruby','PHP'].map(l => (
                  <span key={l} className="lpill">{l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="divider" />

        {/* FEATURES */}
        <div className="section">
          <div className="section-label">Platform Features</div>
          <div className="section-title">Everything a coder needs<br/>to type without <em>thinking</em></div>
          <div className="features-grid">
            {[
              { icon: '⌨️', title: 'Real-time Finger Guide', desc: 'Color-coded keyboard shows which finger owns each key. The next key glows.', color: 'var(--accent)' },
              { icon: '📊', title: 'Error Analysis Engine', desc: 'Tracks every mistake, identifies weak characters, and generates targeted drills.', color: 'var(--green)' },
              { icon: '🎯', title: '12 Languages, Real Code', desc: 'JS, Python, Rust, Go, TS, C++, Java, SQL, HTML, CSS, Ruby, PHP.', color: 'var(--purple)' },
              { icon: '⚡', title: 'Timed Sprint Modes', desc: '15s, 30s, 60s, and 2-minute sprints with leaderboard.', color: 'var(--amber)' },
              { icon: '🔒', title: 'Strict Accuracy Mode', desc: 'Backspace disabled. Type correctly first, build speed second.', color: 'var(--red)' },
              { icon: '📈', title: `${LEVELS.length}+ Level Curriculum`, desc: 'Structured from home row basics to 120 WPM elite challenges.', color: 'var(--accent)' },
            ].map((f, i) => (
              <div key={i} className="feat">
                <div className="feat-icon" style={{background: `${f.color}15`}}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <span className="feat-accent" style={{background: f.color}} />
              </div>
            ))}
          </div>
        </div>

        <hr className="divider" />

        {/* HOW IT WORKS */}
        <div className="section">
          <div className="section-label">How It Works</div>
          <div className="section-title">Go from hunt-and-peck<br/>to <em>eyes on screen</em> in weeks</div>
          <div className="steps">
            {[
              { num: '01', title: 'Start at your level', desc: 'Assessment places you in the right curriculum track.' },
              { num: '02', title: 'Type real code', desc: 'Snippets in your chosen language with finger guides.' },
              { num: '03', title: 'Analyze mistakes', desc: 'Error reports show which characters slow you down.' },
              { num: '04', title: 'Level up daily', desc: 'Structured progression unlocks new challenges.' },
            ].map((s, i) => (
              <div key={i} className="step">
                <div className="step-num">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <hr className="divider" />

        {/* TESTIMONIALS */}
        <div className="section">
          <div className="section-label">Developer Stories</div>
          <div className="section-title">From 40 WPM to shipping<br/><em>faster than teammates</em></div>
          <div className="testi-grid">
            {[
              { text: '"I went from 45 to 88 WPM in 6 weeks. The bracket training saved me hours."', name: 'Arjun K.', role: 'React Developer', color: 'rgba(0,212,255,0.12)', textColor: 'var(--accent)' },
              { text: '"The error heatmap showed I was mistyping semicolons. Fixed in 3 days."', name: 'Sarah L.', role: 'Backend Engineer', color: 'rgba(0,232,122,0.1)', textColor: 'var(--green)' },
              { text: '"The finger guide was a game-changer. 8 weeks later I\'m at 92 WPM."', name: 'Marco R.', role: 'Full-stack dev', color: 'rgba(168,85,247,0.1)', textColor: 'var(--purple)' },
            ].map((t, i) => (
              <div key={i} className="testi">
                <div className="testi-stars">★★★★★</div>
                <p className="testi-text">{t.text}</p>
                <div className="testi-author">
                  <div className="testi-avatar" style={{background:t.color,color:t.textColor}}>{t.name.split(' ').map(n=>n[0]).join('')}</div>
                  <div><div className="testi-name">{t.name}</div><div className="testi-role">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section">
          <h2>Ready to type like a senior dev?</h2>
          <p>Free forever. No account needed. Just open and type.</p>
          <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
            <Link to="/practice" className="btn btn-primary">Start Practicing Now →</Link>
            <Link to="/levels" className="btn btn-secondary">View the Curriculum</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
