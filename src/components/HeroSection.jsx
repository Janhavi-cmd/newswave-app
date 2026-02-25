import React from "react";

function timeAgo(d) {
  if (!d) return "";
  var m = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
  if (m < 60) return m + "m ago";
  return Math.floor(m / 60) + "h ago";
}

export default function HeroSection({ news, onRead }) {
  if (!news || news.length < 4) return null;
  var hero  = news[0];
  var side  = news.slice(1, 5);

  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 16 }}>🔥</span>
        <span className="f-display g-text" style={{ fontSize: 22 }}>TRENDING NOW</span>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(0,229,160,0.3),transparent)" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Hero */}
        <div className="hero-card" onClick={function() { if (onRead) onRead(hero); }} style={{ height: 360 }}>
          {hero.image ? (
            <img src={hero.image} alt={hero.title} className="hero-img" style={{ position: "absolute", inset: 0 }} />
          ) : (
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(0,229,160,0.2),rgba(0,207,255,0.15))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>📰</div>
          )}
          <div className="hero-overlay" />
          <div style={{ position: "absolute", inset: 0, padding: 24, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <span className="f-mono g-btn" style={{ fontSize: 10, padding: "3px 10px", borderRadius: 99, display: "inline-block", marginBottom: 10, width: "fit-content" }}>
              {hero.source || "NewsWave"}
            </span>
            <h2 className="c2" style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)",
              color: "#fff", lineHeight: 1.2, marginBottom: 10, letterSpacing: "0.02em",
            }}>
              {hero.title}
            </h2>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span className="f-mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.65)" }}>⏰ {timeAgo(hero.publishedAt)}</span>
              <span className="f-mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>📖 {hero.readTime || 2} min</span>
            </div>
          </div>
        </div>

        {/* Side stories */}
        <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 12 }}>
          {side.slice(0, 2).map(function(a, i) {
            return (
              <div key={i} className="hero-card" onClick={function() { if (onRead) onRead(a); }} style={{ height: "100%" }}>
                {a.image ? (
                  <img src={a.image} alt={a.title} className="hero-img" style={{ position: "absolute", inset: 0, height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(0,207,255,0.15),rgba(245,200,66,0.10))" }} />
                )}
                <div className="hero-overlay" />
                <div style={{ position: "absolute", inset: 0, padding: 16, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <p className="f-mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>
                    {a.source} · {timeAgo(a.publishedAt)}
                  </p>
                  <h3 className="c2" style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#fff", lineHeight: 1.35 }}>
                    {a.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12, marginTop: 12 }}>
        {side.slice(2).map(function(a, i) {
          return (
            <div key={i} className="glass shine news-card" onClick={function() { if (onRead) onRead(a); }} style={{
              borderRadius: 16, overflow: "hidden", display: "flex", gap: 14, padding: 14, alignItems: "flex-start", cursor: "pointer",
            }}>
              {a.image && (
                <div style={{ width: 80, height: 70, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                  <img src={a.image} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={function(e) { e.target.style.display = "none"; }} />
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="f-mono" style={{ fontSize: 10, color: "#00e5a0", marginBottom: 5 }}>{a.source}</p>
                <p className="c2" style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "var(--text)", lineHeight: 1.4 }}>{a.title}</p>
                <p className="f-mono" style={{ fontSize: 10, color: "var(--muted)", marginTop: 5 }}>{timeAgo(a.publishedAt)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
