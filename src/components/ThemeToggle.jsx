import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(localStorage.getItem('theme') !== 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('light', !dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button onClick={() => setDark(v => !v)} aria-label="Toggle theme" style={{
      width: 40, height: 40, borderRadius: 2,
      border: '1px solid var(--border)',
      background: 'var(--surface)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', transition: 'all 0.2s',
      fontSize: 16, color: dark ? 'var(--sig3)' : 'var(--sig2)',
    }}>
      {dark ? '☀' : '◑'}
    </button>
  );
}
