import React, { useEffect } from "react";
import { UI } from "../utils/constants";

export default function ReaderModal({ article, lang, onClose }) {
  var ui = UI[lang] || UI.en;
  useEffect(function() {
    function handleKey(e) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return function() {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!article) return null;

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: article.title, url: article.url }).catch(function() {});
    } else {
      navigator.clipboard.writeText(article.url || "").catch(function() {});
    }
  }

  return (
    <div className="reader-overlay" onClick={function(e) { if (e.target === e.currentTarget) onClose(); }}>
      <div className="reader-box glass">
        {/* Header bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px 0" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="g-btn f-mono" style={{ fontSize: 10, padding: "3px 10px", borderRadius: 99, letterSpacing: "0.5px" }}>
              {article.source || "NewsWave"}
            </span>
            {article.readTime && (
              <span className="f-mono" style={{ fontSize: 11, color: "var(--muted)" }}>📖 {article.readTime} {ui.readTime}</span>
            )}
          </div>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: "50%", border: "none", cursor: "pointer",
            background: "rgba(255,78,114,0.12)", color: "#ff4e72", fontSize: 18,
            display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
          }}>✕</button>
        </div>

        {/* Hero image */}
        {article.image && (
          <div style={{ margin: "18px 0 0", height: 240, overflow: "hidden", position: "relative" }}>
            <img src={article.image} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={function(e) { e.target.style.display = "none"; }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.4) 0%,transparent 60%)" }} />
          </div>
        )}

        {/* Content */}
        <div style={{ padding: "24px 28px 28px" }}>
          <h2 style={{
            fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1.5rem,3vw,2.1rem)",
            lineHeight: 1.18, marginBottom: 14, color: "var(--text)", letterSpacing: "0.03em",
          }}>
            {article.title}
          </h2>

          {article.author && (
            <p style={{ fontSize: 13, color: "#00e5a0", fontWeight: 600, marginBottom: 16 }}>
              ✍️ {article.author}
            </p>
          )}

          <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--text)", opacity: 0.88, fontFamily: "'Outfit',sans-serif", marginBottom: 24 }}>
            {article.description || "Read the full story on the source website."}
          </p>

          {/* Actions */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href={article.url || "#"} target="_blank" rel="noopener noreferrer" className="g-btn" style={{
              padding: "12px 24px", borderRadius: 14,
              fontFamily: "'Outfit',sans-serif", fontSize: 14,
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6,
              boxShadow: "0 4px 16px rgba(0,229,160,0.3)",
            }}>
              {ui.readMore || "Read Full Story"} ↗
            </a>
            <button onClick={handleShare} style={{
              padding: "12px 20px", borderRadius: 14, border: "1px solid var(--border)",
              background: "transparent", cursor: "pointer", color: "var(--text)",
              fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 600,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              🔗 {ui.share || "Share"}
            </button>
            <button onClick={onClose} style={{
              padding: "12px 20px", borderRadius: 14, border: "1px solid rgba(255,78,114,0.25)",
              background: "rgba(255,78,114,0.08)", cursor: "pointer", color: "#ff4e72",
              fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 600,
            }}>
              {ui.close || "Close"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
