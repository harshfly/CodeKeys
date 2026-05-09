import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';
import { useAuthStore } from '@/store/useAuthStore';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/layout/Navbar';
import LoginPage from '@/pages/LoginPage';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import PracticePage from '@/pages/PracticePage';
import LevelsPage from '@/pages/LevelsPage';
import ChallengesPage from '@/pages/ChallengesPage';
import HandGuidePage from '@/pages/HandGuidePage';
import ProfilePage from '@/pages/ProfilePage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppInner() {
  const { theme } = useThemeStore();
  const { setUser, setLoading } = useAuthStore();
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/levels" element={<LevelsPage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/guide" element={<HandGuidePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
