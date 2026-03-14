import React from 'react';
import { CATEGORIES } from '../utils/constants';

export default function CategoryTabs({ active, onChange }) {
  return (
    <div style={{
      position: 'sticky', top: 65, zIndex: 90,
      background: 'var(--ink)',
      borderBottom: '1px solid var(--border)',
    }}>
      {/* Stats bar */}
      <div style={{
        display: 'flex', borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
      }}>
        {[
          { v: '2,847', l: 'STORIES', c: 'var(--sig)' },
          { v: '12',    l: 'LANGUAGES', c: 'var(--sig)' },
          { v: '94',    l: 'COUNTRIES', c: 'var(--sig)' },
          { v: 'LIVE',  l: 'GUARDIAN',  c: 'var(--sig3)' },
          { v: '↑ AI',  l: 'POWERED',   c: 'var(--sig2)' },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, textAlign: 'center', padding: '7px 0',
            borderRight: i < 4 ? '1px solid var(--border)' : 'none',
          }}>
            <div className="f-mono" style={{ fontSize: 13, color: s.c, fontWeight: 600, letterSpacing: '0.05em' }}>{s.v}</div>
            <div className="f-mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.12em', marginTop: 1 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Category pills */}
      <div style={{ maxWidth: 1800, margin: '0 auto', padding: '0 24px' }}>
        <div className="no-scroll" style={{ display: 'flex', overflowX: 'auto' }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => onChange(cat.id)}
              className={'cat-pill' + (active === cat.id ? ' active' : '')}>
              <span style={{ fontSize: 15 }}>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
