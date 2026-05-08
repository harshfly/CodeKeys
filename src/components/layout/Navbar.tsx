import { Link, useLocation } from 'react-router-dom';
import { useThemeStore } from '@/store/useThemeStore';
import { THEMES } from '@/lib/constants';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const { theme, setTheme } = useThemeStore();
  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          <div className="logo-mark">
            <svg viewBox="0 0 16 16"><path d="M2 4h12v1H2zM2 7.5h8v1H2zM2 11h10v1H2z"/></svg>
          </div>
          <div className="logo-text">Code<span>Keys</span></div>
        </Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/" className={isActive('/')}>Home</Link></li>
        <li><Link to="/practice" className={isActive('/practice')}>Practice</Link></li>
        <li><Link to="/levels" className={isActive('/levels')}>Levels</Link></li>
        <li><Link to="/challenges" className={isActive('/challenges')}>Challenges</Link></li>
        <li><Link to="/guide" className={isActive('/guide')}>Hand Guide</Link></li>
        <li><Link to="/profile" className={isActive('/profile')}>User Dashboard</Link></li>
      </ul>

      <div className="nav-right">
        <button className="theme-toggle" onClick={() => setTheme(theme === 'midnight' ? 'light' : 'midnight')}>
          {theme === 'midnight' ? '☀️' : '🌙'}
        </button>
        <Link to="/practice" className="nav-cta">Start →</Link>
      </div>
    </nav>
  );
}
