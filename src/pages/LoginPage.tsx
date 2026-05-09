import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ 
          email: email.trim(), 
          password,
          options: {
            data: {
              username: username.trim(),
            }
          }
        });
        if (error) throw error;
        alert('Account created successfully! Please log in.');
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        navigate('/profile');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page container">
      <div className="login-card">
        <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
        <p className="login-sub">{isSignUp ? 'Sign up to track your progress' : 'Log in to continue your journey'}</p>
        
        {error && <div className="error-msg">{error}</div>}
        
        <form onSubmit={handleAuth} className="login-form">
          {isSignUp && (
            <div className="form-group">
              <label>Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="johndoe" required />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        
        <p className="toggle-auth">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Log In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
}
