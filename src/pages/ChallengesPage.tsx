import { Link } from 'react-router-dom';
import { CHALLENGES, LEADERBOARD_DATA } from '@/data/tips';
import './ChallengesPage.css';

export default function ChallengesPage() {
  return (
    <div className="page-content">
      <div className="container">
        <div className="section">
          <div className="section-label">Challenges</div>
          <div className="section-title">Compete. Beat records.<br/><em>Level up.</em></div>
          
          <div className="challenges-layout">
            <div>
              {/* DAILY CHALLENGE */}
              <div className="chal-hero">
                <div className="chal-hero-inner">
                  <div className="chal-badge">🔥 DAILY CHALLENGE</div>
                  <h3>Recursive Fibonacci in Rust</h3>
                  <p>Type this Rust function with match arms and lifetime annotations. Target: 75 WPM, 98% accuracy. Bonus: finish in under 45 seconds.</p>
                  <div className="chal-hero-meta">
                    <span className="cm"><span className="cm-icon">⚡</span>75 WPM target</span>
                    <span className="cm"><span className="cm-icon">⏱️</span>45 seconds</span>
                    <span className="cm"><span className="cm-icon">🏅</span>Rustacean Badge reward</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                    <Link to="/practice" className="btn btn-primary">Start Challenge →</Link>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text2)', fontFamily: 'var(--mono)' }}>Resets in <span>14:22:31</span></div>
                  </div>
                </div>
              </div>

              {/* CHALLENGE LIST */}
              <h3 className="section-sub-title">All Challenges</h3>
              <div className="chal-grid">
                {CHALLENGES.map((c) => (
                  <Link to="/practice" key={c.id} className="ccard">
                    <div className="ccard-icon">{c.icon}</div>
                    <h4>{c.title}</h4>
                    <p>{c.desc}</p>
                    <div className="ccard-tags">
                      {c.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                    <div className="ccard-meta">
                      <span className={`badge badge-${c.diff === 'intermediate' ? 'amber' : c.diff === 'advanced' ? 'red' : 'purple'}`}>{c.diff.toUpperCase()}</span>
                      <span className="ccard-time">{c.time}</span>
                    </div>
                    <div className="ccard-reward">
                      <span className="ccard-reward-label">Reward</span>
                      <span className="ccard-reward-val">{c.reward}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* LEADERBOARD AND PANELS */}
            <div>
              <div className="leaderboard">
                <div className="section-sub-title" style={{ margin: '0 0 1rem 0' }}>🏆 Global Leaderboard</div>
                {LEADERBOARD_DATA.map((item) => (
                  <div key={item.rank} className="lb-row" style={{background: item.color}}>
                    <div className="lb-rank" style={{color: item.rank <= 3 ? item.textColor : 'var(--text2)'}}>#{item.rank}</div>
                    <div className="lb-name" style={{color: item.rank <= 3 ? item.textColor : 'var(--text)'}}>
                      <div className="lb-avatar" style={{background: item.color, borderColor: item.textColor, color: item.textColor}}>
                        {item.name[0]}
                      </div>
                      {item.name}
                    </div>
                    <div className="lb-wpm" style={{color: item.textColor}}>{item.wpm} <span style={{fontSize:'0.65rem',color:'var(--text2)'}}>WPM</span></div>
                  </div>
                ))}
              </div>

              <div className="side-panel">
                <h4>Your Rank</h4>
                <div style={{ textAlign: 'center', padding: '0.75rem 0' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--amber)' }}>#—</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text2)', marginTop: '4px' }}>Complete a timed test to earn a rank</div>
                </div>
              </div>

              <div className="side-panel">
                <h4>Streak</h4>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  {[1,2,3,4,5,6,7].map(i => (
                    <div key={i} style={{ width: '24px', height: '24px', borderRadius: '4px', background: i <= 2 ? 'var(--green)' : 'var(--border)', opacity: i <= 2 ? 1 : 0.5 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
