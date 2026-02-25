import React, { useState } from "react";
import { UI } from "../utils/constants";

function timeAgo(dateStr) {
  if (!dateStr) return "";
  var diff = Date.now() - new Date(dateStr).getTime();
  var m = Math.floor(diff / 60000);
  if (m < 1)  return "just now";
  if (m < 60) return m + "m ago";
  var h = Math.floor(m / 60);
  if (h < 24) return h + "h ago";
  return Math.floor(h / 24) + "d ago";
}

export default function NewsCard({ article, index, lang, onSave, isSaved, onRead }) {
  var [liked, setLiked] = useState(false);
  var [likes, setLikes] = useState(Math.floor(Math.random() * 120) + 12);
  var ui = UI[lang] || UI.en;

  if (!article) return null;
  var title       = article.title || "Article";
  var description = article.description || "";
  var url         = article.url || "#";
  var image       = article.image || "";
  var source      = article.source || "Source";
  var author      = article.author || "";
  var publishedAt = article.publishedAt || "";
  var readTime    = article.readTime || 2;
  var delay       = (index % 9) * 65;

  function handleLike(e) {
    e.stopPropagation();
    setLiked(function(l) { return !l; });
    setLikes(function(n) { return liked ? n - 1 : n + 1; });
  }
  function handleSave(e) {
    e.stopPropagation();
    if (onSave) onSave(article);
  }
  function handleShare(e) {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({ title: title, url: url }).catch(function() {});
    } else {
      navigator.clipboard.writeText(url).catch(function() {});
    }
  }
  function handleRead(e) {
    e.stopPropagation();
    if (onRead) onRead(article);
  }

  return (
    <article
      className="news-card shine glass fade-up"
      style={{
        borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column",
        height: "100%", animationDelay: delay + "ms",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 210, flexShrink: 0, overflow: "hidden", background: "linear-gradient(135deg,rgba(0,229,160,0.15),rgba(0,207,255,0.10))" }}>
        {image ? (
          <img src={image} alt={title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={function(e) { e.target.style.display = "none"; }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, opacity: 0.15 }}>📰</div>
        )}
        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 60%)" }} />
        {/* Source badge */}
        <div style={{ position: "absolute", top: 12, left: 12 }}>
          <span className="g-btn f-mono" style={{
            fontSize: 10, padding: "3px 10px", borderRadius: 99, letterSpacing: "0.5px",
            boxShadow: "0 2px 10px rgba(0,229,160,0.3)",
          }}>
            {source}
          </span>
        </div>
        {/* Action buttons — visible on hover via group */}
        <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 6 }}>
          <button onClick={handleSave} title={ui.save} style={{
            width: 32, height: 32, borderRadius: "50%",
            background: isSaved ? "rgba(245,200,66,0.9)" : "rgba(255,255,255,0.85)",
            border: "none", cursor: "pointer", fontSize: 14,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)", transition: "transform 0.2s",
          }}>
            {isSaved ? "🔖" : "📌"}
          </button>
          <button onClick={handleShare} title={ui.share} style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "rgba(255,255,255,0.85)",
            border: "none", cursor: "pointer", fontSize: 14,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)", transition: "transform 0.2s",
          }}>
            🔗
          </button>
        </div>
        {/* Time + read time */}
        <div style={{ position: "absolute", bottom: 10, left: 12, display: "flex", gap: 10 }}>
          <span className="f-mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>⏰ {timeAgo(publishedAt)}</span>
          <span className="f-mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>📖 {readTime} {ui.readTime}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "18px 18px 14px", display: "flex", flexDirection: "column", flex: 1 }}>
        {author && (
          <p style={{ fontSize: 11, color: "#00e5a0", fontWeight: 600, marginBottom: 8, opacity: 0.85 }}>
            ✍️ {author}
          </p>
        )}
        <h3 className="c2" style={{
          fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1.02rem",
          lineHeight: 1.38, marginBottom: 10, color: "var(--text)",
          transition: "color 0.2s",
        }}>
          {title}
        </h3>
        <p className="c3" style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, flex: 1 }}>
          {description || "Click to read the full story."}
        </p>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
          <button onClick={handleLike} style={{
            display: "flex", alignItems: "center", gap: 5,
            background: "none", border: "none", cursor: "pointer",
            color: liked ? "#ff4e72" : "var(--muted)", fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
            transition: "all 0.2s", transform: liked ? "scale(1.15)" : "scale(1)",
          }}>
            {liked ? "❤️" : "🤍"} {likes}
          </button>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={handleRead} title={ui.reader} style={{
              padding: "6px 12px", borderRadius: 10,
              background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.2)",
              color: "#00e5a0", fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600,
              cursor: "pointer", transition: "all 0.2s",
            }}>📖 {ui.reader || "Read"}</button>
            <a href={url} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "6px 14px", borderRadius: 10,
              background: "linear-gradient(135deg,#00e5a0,#00cfff)",
              color: "#000", fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 700,
              textDecoration: "none", transition: "all 0.2s",
              boxShadow: "0 3px 12px rgba(0,229,160,0.25)",
            }}>
              {ui.readMore || "Read"} ↗
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
