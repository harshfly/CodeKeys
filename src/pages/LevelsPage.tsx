import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LEVELS, getLevelsByTrack } from '@/data/levels';
import { useAuthStore } from '@/store/useAuthStore';
import { supabase } from '@/lib/supabase';
import { DIFFICULTY_LEVELS, DIFFICULTY_COLORS } from '@/lib/constants';
import type { Difficulty } from '@/lib/constants';
import './LevelsPage.css';

export default function LevelsPage() {
  const [filter, setFilter] = useState<'all' | Difficulty>('all');
  const [expandedTrack, setExpandedTrack] = useState<string | null>(null);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      supabase
        .from('level_progress')
        .select('level_id')
        .eq('user_id', user.id)
        .eq('completed', true)
        .then(({ data, error }) => {
          if (error) console.error('Error fetching progress:', error);
          if (data) {
            setCompletedLevels(data.map(d => d.level_id));
          }
        });
    }
  }, [user]);
  const tracks = useMemo(() => getLevelsByTrack(), []);
  const trackNames = Object.keys(tracks);
  const filteredTracks = filter === 'all'
    ? trackNames
    : trackNames.filter(t => tracks[t].some(l => l.diff === filter));

  const handleLevelClick = (level: typeof LEVELS[0]) => {
    const lang = level.lang || 'js';
    const type = level.snippetType || 'function';
    const lvl = level.level || 1;
    navigate(`/practice?lang=${lang}&type=${type}&level=${lvl}`);
  };

  const toggleTrack = (trackName: string) => {
    setExpandedTrack(expandedTrack === trackName ? null : trackName);
  };

  return (
    <div className="page-content">
      <div className="container">
        <div className="section">
          <div className="section-label">Curriculum</div>
          <div className="section-title">{LEVELS.length}+ levels. <em>Zero shortcuts.</em></div>
          <div className="section-sub">From home row basics (15 WPM) to production-ready elite challenges (120+ WPM). Click any level to start practicing.</div>

          <div className="curriculum-header">
            <div className="curr-filter">
              <button className={`cf-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
                All ({LEVELS.length})
              </button>
              {DIFFICULTY_LEVELS.map(d => {
                const count = LEVELS.filter(l => l.diff === d).length;
                return (
                  <button key={d} className={`cf-btn ${filter === d ? 'active' : ''}`} onClick={() => setFilter(d)}>
                    {d.charAt(0).toUpperCase() + d.slice(1)} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {filteredTracks.map(trackName => {
            const allLevels = tracks[trackName];
            const levels = filter === 'all' ? allLevels : allLevels.filter(l => l.diff === filter);
            if (levels.length === 0) return null;
            const isExpanded = expandedTrack === trackName;
            const displayLevels = isExpanded ? levels : levels.slice(0, 6);

            return (
              <div key={trackName} className="track-section">
                <div className="track-title" onClick={() => toggleTrack(trackName)}>
                  <h3>{trackName}</h3>
                  <span className="track-count">{levels.length} lessons</span>
                  <span className="track-toggle">{isExpanded ? '▲ Collapse' : '▼ Show All'}</span>
                </div>
                <div className="levels-grid">
                  {displayLevels.map(l => (
                    <div key={l.id} className={`lcard ${completedLevels.includes(l.id) ? 'completed' : ''}`} onClick={() => handleLevelClick(l)}>
                      <div className="lcard-top">
                        <div className="lcard-num">#{String(l.id).padStart(3, '0')}</div>
                        <span className={`badge badge-${DIFFICULTY_COLORS[l.diff]}`}>{l.diff}</span>
                      </div>
                      <div className="lcard-icon">{l.icon}</div>
                      <h4>{l.name}</h4>
                      <div className="lcard-desc">{l.desc}</div>
                      <div className="lcard-meta">
                        <span className="lcard-wpm">🎯 {l.targetWpm} WPM</span>
                        <span className="lcard-acc">📊 {l.minAccuracy}%</span>
                      </div>
                      <div className="lcard-tags">
                        {l.tags.slice(0, 3).map(t => <span key={t} className="tag">{t}</span>)}
                      </div>
                      <div className="lcard-start">{completedLevels.includes(l.id) ? 'Completed ✓' : 'Start Level →'}</div>
                    </div>
                  ))}
                </div>
                {levels.length > 6 && !isExpanded && (
                  <button className="show-more-btn" onClick={() => toggleTrack(trackName)}>
                    Show all {levels.length} levels in {trackName} ▼
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
