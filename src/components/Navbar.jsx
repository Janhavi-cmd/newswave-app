import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    const tick = () => setTime(new Date().toLocaleTimeString('en-IN', { hour12: false }));
    tick(); const id = setInterval(tick, 1000);
    return () => { window.removeEventListener('scroll', onScroll); clearInterval(id); };
  }, []);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'var(--ink)',
      borderBottom: '1px solid var(--border)',
      boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.3)' : 'none',
      transition: 'all 0.3s',
    }}>
      {/* Top accent line */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, var(--sig) 0%, var(--sig2) 50%, var(--sig3) 100%)' }} />

      <div style={{ maxWidth: 1800, margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 62 }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative', width: 42, height: 42, flexShrink: 0 }}>
            <div style={{
              width: 42, height: 42, borderRadius: '50%',
              border: '2px solid var(--sig)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--sig)', fontSize: 18,
              boxShadow: '0 0 14px rgba(0,200,100,0.25)',
            }}>◈</div>
            <div style={{
              position: 'absolute', inset: -5, borderRadius: '50%',
              border: '1px solid var(--border)',
              animation: 'ping 2.5s cubic-bezier(0,0,0.2,1) infinite',
            }} />
          </div>
          <div>
            <div className="f-display" style={{
              fontSize: 26, fontWeight: 800, lineHeight: 1,
              background: 'linear-gradient(90deg, var(--sig), var(--sig2))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>NEWSWAVE</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
              <span className="live-dot" />
              <span className="f-mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.12em' }}>
                SIGNAL BROADCAST · v3.0
              </span>
            </div>
          </div>
        </div>

        {/* Center */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--sig)', boxShadow: '0 0 6px var(--sig)' }} />
            <span className="f-mono" style={{ fontSize: 12, color: 'var(--txt2)', letterSpacing: '0.1em', fontWeight: 600 }}>LIVE</span>
          </div>
          <span className="f-mono" style={{ fontSize: 12, color: 'var(--muted)', letterSpacing: '0.08em' }}>{time} IST</span>
          <span className="f-mono" style={{ fontSize: 12, color: 'var(--muted)', letterSpacing: '0.06em' }}>28.6°N · 77.2°E</span>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 18, marginRight: 4 }}>
            {[5, 9, 13, 18].map((h, i) => (
              <div key={i} style={{
                width: 3, height: h, borderRadius: 1,
                background: i < 3 ? 'var(--sig)' : 'var(--border)',
                boxShadow: i < 3 ? '0 0 4px var(--sig)' : 'none',
              }} />
            ))}
          </div>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
      <style>{`@keyframes ping{75%,100%{transform:scale(1.6);opacity:0}}`}</style>
    </nav>
  );
}
