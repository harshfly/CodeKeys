import { useStatsStore } from '@/store/useStatsStore';
import { ACHIEVEMENTS } from '@/data/tips';
import './StatsPage.css';

export default function StatsPage() {
  const { session } = useStatsStore();
  const avg = session.tests ? Math.round(session.totalWPM / session.tests) : null;
  const avgAcc = session.tests ? Math.round(session.totalAcc / session.tests) : null;
  const sortedErrors = Object.entries(session.errMap).sort((a,b) => b[1]-a[1]).slice(0,8);
  const maxErr = sortedErrors.length > 0 ? sortedErrors[0][1] : 1;
  const langEntries = Object.entries(session.langStats);

  return (
    <div className="page-content">
      <div className="container">
        <div className="section">
          <div className="section-label">Progress Dashboard</div>
          <div className="section-title">Your typing career.</div>

          <div className="stats-overview">
            <div className="stat-big"><div className="sv" style={{color:'var(--accent)'}}>{avg ?? '—'}</div><div className="sk">Avg WPM</div></div>
            <div className="stat-big"><div className="sv" style={{color:'var(--green)'}}>{session.bestWPM || '—'}</div><div className="sk">Best WPM</div></div>
            <div className="stat-big"><div className="sv" style={{color:'var(--amber)'}}>{avgAcc ? avgAcc + '%' : '—'}</div><div className="sk">Avg Accuracy</div></div>
            <div className="stat-big"><div className="sv">{session.tests}</div><div className="sk">Tests Taken</div></div>
            <div className="stat-big"><div className="sv" style={{color:'var(--purple)'}}>{session.totalChars > 999 ? (session.totalChars/1000).toFixed(1)+'k' : session.totalChars}</div><div className="sk">Chars Typed</div></div>
          </div>

          <div className="stats-grid2">
            <div className="stats-card">
              <h4>WPM History (last 20 tests)</h4>
              <div className="chart-wrap">
                {session.wpmHistory.length === 0 ? (
                  <div className="empty-msg">Complete tests to see your progress</div>
                ) : (
                  session.wpmHistory.map((w, i) => {
                    const max = Math.max(...session.wpmHistory, 1);
                    return (
                      <div key={i} className="wpm-bar-g">
                        <div className="wpm-bar" data-v={w} style={{height:`${Math.max(4, Math.round(w/max*100))}%`}} />
                        <div className="wpm-bar-lbl">T{i+1}</div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className="stats-card">
              <h4>Language Breakdown</h4>
              <div className="lang-stats">
                {langEntries.length === 0 ? (
                  <div className="empty-msg">Practice different languages</div>
                ) : (
                  langEntries.map(([lang, v]) => {
                    const avgW = Math.round(v.totalWPM / v.tests);
                    const mx = Math.max(...langEntries.map(([,x]) => Math.round(x.totalWPM/x.tests)), 1);
                    return (
                      <div key={lang} className="ls-item">
                        <div className="ls-name">{lang.toUpperCase()}</div>
                        <div className="ls-bar-w"><div className="ls-bar-f" style={{width:`${Math.round(avgW/mx*100)}%`}} /></div>
                        <div className="ls-wpm">{avgW} WPM</div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div className="stats-grid2">
            <div className="stats-card">
              <h4>Most Mistyped Characters</h4>
              {sortedErrors.length === 0 ? (
                <div className="empty-msg">No error data yet — start typing!</div>
              ) : (
                <table className="err-freq-table">
                  <thead><tr><th>Char</th><th>Mistyped</th><th>Suggestion</th></tr></thead>
                  <tbody>
                    {sortedErrors.map(([k,v]) => (
                      <tr key={k}>
                        <td className="err-char">{k === ' ' ? '[space]' : k === '\n' ? '[enter]' : k}</td>
                        <td><div className="err-bar-inline"><div className="err-bar-wrap2"><div className="err-bar-fill2" style={{width:`${Math.round(v/maxErr*100)}%`}} /></div>{v}x</div></td>
                        <td className="err-sug">Practice in isolation</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="stats-card">
              <h4>Achievements</h4>
              <div className="achievements-grid">
                {ACHIEVEMENTS.map((a, i) => {
                  const earned = a.condition(session);
                  return (
                    <div key={a.id} className={`ach ${earned ? 'earned' : ''}`}>
                      <div className="ach-icon">{a.icon}</div>
                      <div className="ach-name">{a.name}</div>
                      <div className="ach-cond">{a.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
