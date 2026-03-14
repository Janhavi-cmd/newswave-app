import React, { useState, useEffect } from 'react';
import { ExternalLink, Share2, Bookmark, Heart, Sparkles } from 'lucide-react';

function timeAgo(d) {
  if (!d) return '';
  const m = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
  if (m < 60) return m + 'm ago';
  if (m < 1440) return Math.floor(m / 60) + 'h ago';
  return Math.floor(m / 1440) + 'd ago';
}

export default function NewsCard({ article, index = 0 }) {
  const [isLiked,      setIsLiked]      = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showSummary,  setShowSummary]  = useState(false);
  const [summary,      setSummary]      = useState('');
  const [loading,      setLoading]      = useState(false);
  const [hovered,      setHovered]      = useState(false);
  const [sentiment,    setSentiment]    = useState({ label: 'NEUTRAL', color: 'var(--sig3)', bg: 'rgba(255,228,77,0.15)', border: 'rgba(255,228,77,0.4)' });

  useEffect(() => {
    if (!article) return;
    const text = `${article.title||''} ${article.description||''}`.toLowerCase();
    const pos  = ['success','win','gain','growth','breakthrough','victory','peace','hope','record'].filter(w=>text.includes(w)).length;
    const neg  = ['crisis','fail','loss','decline','disaster','death','war','attack','killed','conflict','crash'].filter(w=>text.includes(w)).length;
    if (pos > neg + 1)      setSentiment({ label: 'POSITIVE', color: 'var(--sig)',    bg: 'rgba(0,200,100,0.15)', border: 'rgba(0,200,100,0.4)' });
    else if (neg > pos + 1) setSentiment({ label: 'NEGATIVE', color: 'var(--danger)', bg: 'rgba(255,62,92,0.15)',  border: 'rgba(255,62,92,0.4)' });
  }, [article]);

  if (!article) return null;
  const { title = 'No title', description = 'No description available.', url = '#',
          image = '', publishedAt = '', source = 'Unknown', author = '', readTime = 2 } = article;

  const handleSummary = () => {
    if (showSummary) { setShowSummary(false); return; }
    if (summary)     { setShowSummary(true);  return; }
    setLoading(true);
    setTimeout(() => {
      const pts = description.split(/[.!?]+/).filter(s => s.trim().length > 12).slice(0, 3).map(s => `• ${s.trim()}`);
      while (pts.length < 3) pts.push('• Read the full article for more details');
      setSummary(pts.join('\n'));
      setShowSummary(true);
      setLoading(false);
    }, 500);
  };

  const handleBookmark = e => {
    e.preventDefault(); e.stopPropagation();
    setIsBookmarked(v => !v);
    try {
      const bm = JSON.parse(localStorage.getItem('nw_bookmarks') || '[]');
      localStorage.setItem('nw_bookmarks', JSON.stringify(
        isBookmarked ? bm.filter(b => b.url !== url) : [...bm, article]
      ));
    } catch {}
  };

  const handleShare = e => {
    e.preventDefault(); e.stopPropagation();
    if (navigator.share) navigator.share({ title, url }).catch(() => {});
    else navigator.clipboard?.writeText(url);
  };

  return (
    <article
      className="news-card fade-up"
      style={{ animationDelay: `${(index % 6) * 0.06}s`, display: 'flex', flexDirection: 'column', height: '100%' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 180, overflow: 'hidden', flexShrink: 0 }}>
        {image
          ? <img src={image} alt={title} style={{
              width: '100%', height: '100%', objectFit: 'cover',
              filter: hovered ? 'brightness(0.72)' : 'brightness(0.58)',
              transition: 'transform 0.6s ease, filter 0.3s',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }} onError={e => { e.target.src = `https://picsum.photos/seed/${index}nw/400/200`; }} />
          : <div style={{ width: '100%', height: '100%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, color: 'var(--muted)' }}>◈</div>
        }
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)' }} />

        {/* Badges */}
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 5 }}>
          <span className="f-mono" style={{
            fontSize: 10, padding: '3px 9px', borderRadius: 2, letterSpacing: '0.1em',
            background: 'rgba(0,0,0,0.7)', border: '1px solid var(--sig)',
            color: 'var(--sig)', display: 'flex', alignItems: 'center', gap: 4,
          }}>◈ AI</span>
          <span className="f-mono" style={{
            fontSize: 10, padding: '3px 9px', borderRadius: 2, letterSpacing: '0.1em',
            background: sentiment.bg, border: `1px solid ${sentiment.border}`,
            color: sentiment.color,
          }}>{sentiment.label}</span>
        </div>

        {/* Action buttons on hover */}
        <div style={{
          position: 'absolute', top: 10, right: 10, display: 'flex', gap: 5,
          opacity: hovered ? 1 : 0, transition: 'opacity 0.2s',
        }}>
          {[
            { icon: <Bookmark size={12} fill={isBookmarked ? 'var(--sig3)' : 'none'} color={isBookmarked ? 'var(--sig3)' : '#fff'} />, fn: handleBookmark },
            { icon: <Share2 size={12} color="#fff" />, fn: handleShare },
          ].map((btn, i) => (
            <button key={i} onClick={btn.fn} style={{
              width: 30, height: 30, borderRadius: 2, cursor: 'pointer',
              background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{btn.icon}</button>
          ))}
        </div>

        {/* Source badge */}
        <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
          <span className="f-mono" style={{
            fontSize: 10, padding: '3px 10px', borderRadius: 2, letterSpacing: '0.1em',
            background: 'rgba(0,0,0,0.8)', border: '1px solid var(--border)',
            color: '#fff', fontWeight: 600,
          }}>{source}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* Meta */}
        <div className="f-mono" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: 9 }}>
          <span>{timeAgo(publishedAt)}</span>
          <span>·</span><span>{readTime} MIN READ</span>
          {author && <><span>·</span><span style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{author}</span></>}
        </div>

        {/* Title */}
        <h3 className="c2 f-display" style={{
          fontSize: 17, fontWeight: 700, lineHeight: 1.3, marginBottom: 9,
          color: hovered ? 'var(--sig)' : 'var(--txt)',
          transition: 'color 0.2s',
        }}>{title}</h3>

        {/* Description */}
        <p className="c3" style={{
          fontSize: 13, lineHeight: 1.7, color: 'var(--txt2)',
          fontFamily: 'var(--body)', flex: 1, marginBottom: 12,
        }}>{description}</p>

        {/* AI Summary */}
        <button onClick={handleSummary} disabled={loading} style={{
          width: '100%', padding: '9px', borderRadius: 3, marginBottom: 10,
          background: showSummary ? 'var(--surface)' : 'transparent',
          border: `1px solid ${showSummary ? 'var(--sig)' : 'var(--border)'}`,
          color: 'var(--sig)', cursor: 'pointer',
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          transition: 'all 0.2s',
        }}>
          <Sparkles size={11} />
          {loading ? 'PROCESSING...' : showSummary ? 'CLOSE SUMMARY' : '◈ AI SUMMARY'}
        </button>

        {showSummary && summary && (
          <div style={{
            marginBottom: 10, padding: '11px 13px', borderRadius: 3,
            background: 'var(--surface)',
            borderLeft: '3px solid var(--sig)',
          }}>
            <p style={{ fontSize: 12, color: 'var(--txt2)', fontFamily: 'var(--body)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
              {summary}
            </p>
          </div>
        )}

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
          <button onClick={e => { e.preventDefault(); setIsLiked(v => !v); }} style={{
            display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none',
            cursor: 'pointer', color: isLiked ? 'var(--danger)' : 'var(--muted)',
            fontSize: 12, fontFamily: 'var(--mono)', transition: 'color 0.2s',
          }}>
            <Heart size={13} fill={isLiked ? 'var(--danger)' : 'none'} />
            <span>{isLiked ? '1' : '0'}</span>
          </button>

          <a href={url} target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 3,
            background: 'linear-gradient(90deg, var(--sig), var(--sig2))',
            color: '#050c08', fontFamily: 'var(--mono)', fontSize: 11,
            fontWeight: 700, letterSpacing: '0.1em', textDecoration: 'none',
            transition: 'opacity 0.2s, box-shadow 0.2s',
            boxShadow: hovered ? '0 0 16px rgba(0,200,100,0.35)' : 'none',
          }}>
            READ FULL <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </article>
  );
}
