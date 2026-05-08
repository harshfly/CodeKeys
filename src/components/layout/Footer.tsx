import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-mark"><svg viewBox="0 0 16 16" fill="#000" style={{width:16,height:16}}><path d="M2 4h12v1H2zM2 7.5h8v1H2zM2 11h10v1H2z"/></svg></div>
              <div className="logo-text">Code<span>Keys</span></div>
            </div>
            <p className="footer-desc">The typing platform built from the ground up for developers. Real code. Real syntax. Real speed.</p>
          </div>
          <div>
            <h5>Learn</h5>
            <ul>
              <li><Link to="/practice">Practice Arena</Link></li>
              <li><Link to="/levels">500+ Level Curriculum</Link></li>
              <li><Link to="/guide">Hand Position Guide</Link></li>
            </ul>
          </div>
          <div>
            <h5>Languages</h5>
            <ul>
              <li><Link to="/practice">JavaScript / TS</Link></li>
              <li><Link to="/practice">Python</Link></li>
              <li><Link to="/practice">Rust / Go</Link></li>
              <li><Link to="/practice">C++ / Java</Link></li>
              <li><Link to="/practice">SQL</Link></li>
            </ul>
          </div>
          <div>
            <h5>More</h5>
            <ul>
              <li><Link to="/challenges">Daily Challenges</Link></li>
              <li><Link to="/stats">Progress Dashboard</Link></li>
              <li><Link to="/challenges">Leaderboard</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 CodeKeys — Built for developers who ship.</p>
          <code>v1.0.0 · Open Source · Free Forever</code>
        </div>
      </div>
    </footer>
  );
}
