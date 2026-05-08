import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useStatsStore } from '@/store/useStatsStore';
import { useThemeStore } from '@/store/useThemeStore';
import { THEMES } from '@/lib/constants';
import { ACHIEVEMENTS } from '@/data/tips';
import './ProfilePage.css';

export default function ProfilePage() {
  const { session: statsSession, resetSession } = useStatsStore();
  const { theme, setTheme } = useThemeStore();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authMsg, setAuthMsg] = useState<{text: string, type: 'error' | 'success'} | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMsg(null);
    try {
      if (authMode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setAuthMsg({ text: 'Check your email for the confirmation link!', type: 'success' });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (error: any) {
      setAuthMsg({ text: error.message || 'Authentication failed', type: 'error' });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const avg = statsSession.tests ? Math.round(statsSession.totalWPM / statsSession.tests) : null;
  const avgAcc = statsSession.tests ? Math.round(statsSession.totalAcc / statsSession.tests) : null;
  const sortedErrors = Object.entries(statsSession.errMap).sort((a,b) => b[1]-a[1]).slice(0,5);
  const langEntries = Object.entries(statsSession.langStats);

  if (loading) {
    return <div className="page-content"><div className="container" style={{textAlign:'center',paddingTop:'4rem'}}>Loading profile...</div></div>;
  }

  return (
    <div className="page-content">
      <div className="container">
        <div className="section">
          <div className="section-label">User Dashboard</div>
          <div className="section-title">Your CodeKeys <em>identity</em>.</div>
          <div className="section-sub">Manage your settings, view your progress, and sync to the cloud.</div>

          <div className="profile-layout">
            {/* LEFT COLUMN: Settings & Auth */}
            <div className="profile-sidebar">
              {/* AUTH PANEL */}
              <div className="settings-panel auth-panel">
                {user ? (
                  <>
                    <div className="user-info">
                      <div className="user-avatar">{user.email?.charAt(0).toUpperCase()}</div>
                      <div className="user-details">
                        <div className="user-email">{user.email}</div>
                        <div className="user-status">Cloud Sync Active</div>
                      </div>
                    </div>
                    <button className="btn btn-secondary w-full mt-1" onClick={handleLogout}>Log Out</button>
                  </>
                ) : (
                  <>
                    <h3 className="sp-title">Cloud Sync</h3>
                    <p className="sp-desc">Create an account to save your stats and compete on the global leaderboard.</p>
                    <form onSubmit={handleAuth} className="auth-form">
                      <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required className="auth-input" />
                      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="auth-input" />
                      {authMsg && <div className={`auth-msg ${authMsg.type}`}>{authMsg.text}</div>}
                      <button type="submit" className="btn btn-primary w-full mt-1">
                        {authMode === 'login' ? 'Log In' : 'Sign Up'}
                      </button>
                    </form>
                    <div className="auth-toggle">
                      {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                      <span onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}>
                        {authMode === 'login' ? 'Sign up' : 'Log in'}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* THEME PANEL */}
              <div className="settings-panel">
                <h3 className="sp-title">Theme</h3>
                <div className="theme-grid">
                  {THEMES.map(t => (
                    <button key={t} className={`theme-btn ${theme === t ? 'active' : ''}`} onClick={() => setTheme(t)}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* DANGER ZONE */}
              <div className="settings-panel border-red">
                <h3 className="sp-title text-red">Danger Zone</h3>
                <p className="sp-desc">Resetting your local session data cannot be undone.</p>
                <button className="btn-danger w-full mt-1" onClick={() => {
                  if (confirm('Are you sure you want to delete all local stats?')) resetSession();
                }}>
                  Reset Local Data
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Stats & Progress */}
            <div className="profile-main">
              <h3 className="sp-title">Performance Overview</h3>
              <div className="stats-overview">
                <div className="stat-box"><div className="sb-val accent">{avg ?? '—'}</div><div className="sb-key">Avg WPM</div></div>
                <div className="stat-box"><div className="sb-val green">{statsSession.bestWPM || '—'}</div><div className="sb-key">Best WPM</div></div>
                <div className="stat-box"><div className="sb-val amber">{avgAcc ? avgAcc + '%' : '—'}</div><div className="sb-key">Accuracy</div></div>
                <div className="stat-box"><div className="sb-val">{statsSession.tests}</div><div className="sb-key">Tests</div></div>
              </div>

              <div className="stats-split">
                {/* WPM HISTORY */}
                <div className="settings-panel">
                  <h3 className="sp-title">Recent History</h3>
                  <div className="chart-wrap">
                    {statsSession.wpmHistory.length === 0 ? (
                      <div className="empty-msg">No test history yet</div>
                    ) : (
                      statsSession.wpmHistory.map((w, i) => {
                        const max = Math.max(...statsSession.wpmHistory, 1);
                        return (
                          <div key={i} className="wpm-bar-g">
                            <div className="wpm-bar" data-v={w} style={{height:`${Math.max(4, Math.round(w/max*100))}%`}} />
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* LANGUAGES */}
                <div className="settings-panel">
                  <h3 className="sp-title">Top Languages</h3>
                  <div className="lang-stats">
                    {langEntries.length === 0 ? (
                      <div className="empty-msg">No language data</div>
                    ) : (
                      langEntries.slice(0, 4).map(([lang, v]) => {
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

              {/* ACHIEVEMENTS */}
              <h3 className="sp-title mt-2">Badges & Achievements</h3>
              <div className="achievements-grid">
                {ACHIEVEMENTS.slice(0, 8).map((a) => {
                  const earned = a.condition(statsSession);
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
