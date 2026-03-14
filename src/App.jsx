import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import CategoryTabs from './components/CategoryTabs';
import NewsGrid from './components/NewsGrid';
import VideoSidebar from './components/VideoSidebar';
import AdvancedSearch from './components/AdvancedSearch';
import AnimatedBackground from './components/AnimatedBackground';
import BreakingTicker from './components/BreakingTicker';
import ReadingProgress from './components/ReadingProgress';
import { useNewsData } from './hooks/useNewsData';
import { getUserPreferences } from './services/userPreferences';
import './App.css';

export default function App() {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery,    setSearchQuery]    = useState('');
  const { news, videos, loading, error }    = useNewsData(activeCategory, searchQuery);

  // Always default dark mode
  useEffect(() => {
    document.documentElement.classList.remove('light');
    if (localStorage.getItem('theme') === 'light') {
      document.documentElement.classList.add('light');
    }
  }, []);

  useEffect(() => {
    getUserPreferences().then(p => {
      if (p.language && p.language !== i18n.language) i18n.changeLanguage(p.language);
    }).catch(() => {});
  }, [i18n]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ink)', position: 'relative' }}>
      <AnimatedBackground />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <ReadingProgress />
        <Navbar />
        <BreakingTicker news={news} lang={i18n.language} />
        <CategoryTabs active={activeCategory} onChange={cat => { setActiveCategory(cat); setSearchQuery(''); }} />

        <main style={{ maxWidth: 1800, margin: '0 auto', padding: '22px 28px' }}>
          <AdvancedSearch onSearch={({ query }) => setSearchQuery(query)} />

          {error && (
            <div className="f-mono" style={{
              padding: '12px 16px', borderRadius: 3, marginBottom: 18,
              background: 'rgba(255,62,92,0.06)', border: '1px solid rgba(255,62,92,0.2)',
              color: 'var(--danger)', fontSize: 11, letterSpacing: '0.06em',
            }}>// ERROR: {error}</div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 310px', gap: 26 }}>
            <NewsGrid news={news} loading={loading} />
            <VideoSidebar videos={videos} loading={loading} />
          </div>
        </main>
      </div>
    </div>
  );
}
