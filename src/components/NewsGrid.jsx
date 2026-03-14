import React from 'react';
import NewsCard from './NewsCard';
import SkeletonCard from './SkeletonCard';
import HeroSection from './HeroSection';

export default function NewsGrid({ news, loading, onRead }) {
  if (loading) {
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          <div className="skeleton" style={{ height: 360, borderRadius: 6 }} />
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 14 }}>
            <div className="skeleton" style={{ borderRadius: 6 }} />
            <div className="skeleton" style={{ borderRadius: 6 }} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <div style={{ padding: '40px 60px', borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', display: 'inline-block' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
          <p className="f-display" style={{ fontSize: 20, color: 'var(--muted)' }}>NO ARTICLES FOUND</p>
        </div>
      </div>
    );
  }

  const rest = news.slice(news.length >= 3 ? 3 : 0);

  return (
    <div>
      {news.length >= 3 && <HeroSection news={news} onRead={onRead} />}

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0 18px' }}>
        <span className="f-display g-text" style={{ fontSize: 20, fontWeight: 800 }}>LATEST NEWS</span>
        <span className="stat-pill">{rest.length} STORIES</span>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, var(--border), transparent)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
        {rest.map((article, i) => (
          <NewsCard key={article.id || i} article={article} index={i} />
        ))}
      </div>
    </div>
  );
}
