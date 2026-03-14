import React from 'react';

export default function BreakingTicker({ news }) {
  if (!news || news.length === 0) return null;
  const items = [...news.slice(0, 8), ...news.slice(0, 8)];
  return (
    <div style={{ background: 'linear-gradient(90deg,#c0162a,#dc1f35,#e8392b)', overflow: 'hidden', height: 36, display: 'flex', alignItems: 'center' }}>
      <div style={{
        flexShrink: 0, height: '100%', background: 'rgba(0,0,0,0.3)',
        padding: '0 18px', display: 'flex', alignItems: 'center', gap: 8,
        borderRight: '1px solid rgba(255,255,255,0.15)',
      }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', animation: 'blink 1.2s step-end infinite' }} />
        <span className="f-mono" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: '#fff' }}>BREAKING</span>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div className="ticker-track">
          {items.map((a, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', fontSize: 12, fontFamily: 'var(--body)', fontWeight: 500, color: 'rgba(255,255,255,0.95)', marginRight: 56 }}>
              <span style={{ marginRight: 16, opacity: 0.4, fontSize: 8 }}>◆</span>
              {a.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
