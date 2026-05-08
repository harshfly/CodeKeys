import { Link } from 'react-router-dom';
import { CHALLENGES, LEADERBOARD_DATA } from '@/data/tips';
import './ChallengesPage.css';

export default function ChallengesPage() {
  return (
    <div className="page-content">
      <div className="container">
        <div className="section">
          <div className="section-label">Daily Challenges</div>
          <div className="section-title">Prove your speed.<br/><em>Every. Single. Day.</em></div>

          <div className="chal-hero">
            <div className="chal-hero-inner">
              <div className="chal-badge">🏆 TODAY'S CHALLENGE</div>
              <h3>Speed Demon: JS Async</h3>
              <p>Type a complete async/await function under 60 seconds. Target: 70 WPM, 95% accuracy.</p>
              <div className="chal-hero-meta">
                <span className="cm"><span className="cm-icon">⚡</span>70 WPM target</span>
                <span className="cm"><span className="cm-icon">⏱️</span>60 seconds</span>
                <span className="cm"><span className="cm-icon">🏅</span>Speed Badge reward</span>
              </div>
              <Link to="/practice" className="btn btn-primary" style={{marginTop:'1rem'}}>Accept Challenge →</Link>
            </div>
          </div>

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

          <hr className="divider" style={{margin:'3rem 0'}} />

          <div className="section-label">Global Leaderboard</div>
          <div className="section-title">Top coders <em>this week</em></div>

          <div className="leaderboard">
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
        </div>
      </div>
    </div>
  );
}
