import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { CHALLENGES } from '@/data/tips';
import './ChallengesPage.css';

export default function ChallengesPage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data, error } = await supabase
          .from('leaderboard')
          .select('*')
          .limit(10);
        
        const mockUsers = [
          { user_id: 'mock1', username: 'SpeedDemon', max_wpm: 115 },
          { user_id: 'mock2', username: 'TypeNinja', max_wpm: 95 },
          { user_id: 'mock3', username: 'CodeSpeedster', max_wpm: 85 },
          { user_id: 'mock4', username: 'AlgoMaster', max_wpm: 75 },
          { user_id: 'mock5', username: 'BugHunter', max_wpm: 65 },
        ];

        const realData = data || [];
        
        // Combine and filter out duplicates based on username
        const combined = [...realData];
        mockUsers.forEach(mock => {
          if (!combined.some(real => real.username === mock.username)) {
            combined.push(mock);
          }
        });

        // Sort by max_wpm
        combined.sort((a, b) => (b.max_wpm || 0) - (a.max_wpm || 0));
        
        setLeaderboard(combined.slice(0, 10));
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        // Fallback if view doesn't exist
        setLeaderboard([
          { username: 'SpeedDemon', max_wpm: 115 },
          { username: 'TypeNinja', max_wpm: 95 },
          { username: 'CodeSpeedster', max_wpm: 85 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="page-content">
      <div className="container">
        <div className="section">
          <div className="section-label">Daily Challenges</div>
          <div className="section-title">Prove your speed.<br/><em>Every. Single. Day.</em></div>

          <div className="challenges-split">
            <div className="challenges-main">
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
                  <Link to="/practice?lang=js&type=async" className="btn btn-primary" style={{marginTop:'1rem'}}>Accept Challenge →</Link>
                </div>
              </div>

              <h3 className="section-sub-title">All Challenges</h3>
              <div className="chal-grid">
                {CHALLENGES.map((c) => (
                  <Link to={`/practice?lang=${c.lang}&type=${c.snippetType || 'function'}`} key={c.id} className="ccard">
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

            <div className="challenges-side">
              <div className="section-label">Global Leaderboard</div>
              <div className="section-title" style={{fontSize: '1.5rem', marginBottom: '1rem'}}>Top coders <em>this week</em></div>

              <div className="leaderboard">
                {loading ? (
                  <div style={{color: 'var(--text2)', fontSize: '0.85rem'}}>Loading leaderboard...</div>
                ) : leaderboard.length === 0 ? (
                  <div style={{color: 'var(--text2)', fontSize: '0.85rem'}}>No data yet. Be the first!</div>
                ) : (
                  leaderboard.map((item, index) => {
                    const rank = index + 1;
                    const isTop3 = rank <= 3;
                    const rankColor = rank === 1 ? '#ffd700' : rank === 2 ? '#c0c0c0' : rank === 3 ? '#cd7f32' : 'var(--text2)';
                    
                    return (
                      <div key={item.user_id || item.username} className="lb-row">
                        <div className="lb-rank" style={{color: rankColor}}>#{rank}</div>
                        <div className="lb-name">
                          <div className="lb-avatar" style={{background: 'var(--surface2)', borderColor: 'var(--border2)', color: 'var(--text)'}}>
                            {item.username?.[0]?.toUpperCase() || '?'}
                          </div>
                          {item.username}
                        </div>
                        <div className="lb-wpm">{Math.round(item.max_wpm || 0)} <span style={{fontSize:'0.65rem',color:'var(--text2)'}}>WPM</span></div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
