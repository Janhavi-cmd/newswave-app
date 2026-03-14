import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LANGS = [
  { code:'en', name:'English',   flag:'🇬🇧' },
  { code:'hi', name:'हिंदी',    flag:'🇮🇳' },
  { code:'fr', name:'Français',  flag:'🇫🇷' },
  { code:'de', name:'Deutsch',   flag:'🇩🇪' },
  { code:'es', name:'Español',   flag:'🇪🇸' },
  { code:'ja', name:'日本語',    flag:'🇯🇵' },
  { code:'zh', name:'中文',      flag:'🇨🇳' },
  { code:'ar', name:'العربية',   flag:'🇸🇦' },
  { code:'pt', name:'Português', flag:'🇧🇷' },
  { code:'ru', name:'Русский',   flag:'🇷🇺' },
  { code:'ko', name:'한국어',    flag:'🇰🇷' },
  { code:'it', name:'Italiano',  flag:'🇮🇹' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const cur = LANGS.find(l => l.code === i18n.language) || LANGS[0];

  const select = code => { i18n.changeLanguage(code); localStorage.setItem('language', code); setOpen(false); };

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(v => !v)} style={{
        display: 'flex', alignItems: 'center', gap: 7,
        padding: '8px 14px', borderRadius: 2,
        background: 'var(--surface)', border: '1px solid var(--border)',
        cursor: 'pointer', transition: 'all 0.2s', color: 'var(--txt)',
      }}>
        <span style={{ fontSize: 16 }}>{cur.flag}</span>
        <span className="f-mono" style={{ fontSize: 11, color: 'var(--txt2)', letterSpacing: '0.08em', fontWeight: 600 }}>
          {cur.code.toUpperCase()}
        </span>
        <span style={{ fontSize: 9, color: 'var(--muted)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', right: 0, top: 'calc(100% + 6px)',
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 4, width: 180, zIndex: 200,
          boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          animation: 'fadeUp 0.15s ease',
        }}>
          {LANGS.map(lang => (
            <button key={lang.code} onClick={() => select(lang.code)} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 12px', background: 'none', border: 'none',
              cursor: 'pointer', textAlign: 'left',
              background: i18n.language === lang.code ? 'var(--surface)' : 'transparent',
              borderLeft: i18n.language === lang.code ? '2px solid var(--sig)' : '2px solid transparent',
              transition: 'all 0.12s',
            }}>
              <span style={{ fontSize: 15 }}>{lang.flag}</span>
              <span className="f-mono" style={{
                fontSize: 11, letterSpacing: '0.05em',
                color: i18n.language === lang.code ? 'var(--sig)' : 'var(--txt2)',
                fontWeight: i18n.language === lang.code ? 700 : 400,
              }}>{lang.code.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
