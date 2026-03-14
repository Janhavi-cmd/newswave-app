import React from "react";

function timeAgo(d) {
  if (!d) return "";
  var m = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
  if (m < 60) return m + "m ago";
  var h = Math.floor(m / 60);
  if (h < 24) return h + "h ago";
  return Math.floor(h / 24) + "d ago";
}

export default function VideoCard({ video }) {
  if (!video) return null;
  var href = video.isReal
    ? "https://www.youtube.com/watch?v=" + (video.videoId || "")
    : (video.searchUrl || "https://www.youtube.com/results?search_query=" + encodeURIComponent(video.title || ""));

  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="video-card"
      style={{ display: "flex", gap: 12, padding: 10, textDecoration: "none", color: "inherit", cursor: "pointer" }}>
      {/* Thumbnail */}
      <div style={{ position: "relative", width: 110, height: 65, borderRadius: 10, overflow: "hidden", flexShrink: 0, background: "rgba(0,229,160,0.08)" }}>
        {video.thumb && (
          <img src={video.thumb} alt={video.title || "Video"} style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={function(e) { e.target.style.display = "none"; }} />
        )}
        {/* Play button */}
        <div style={{
          position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex",
          alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.2s",
        }}
          className="video-play-overlay"
          onMouseEnter={function(e) { e.currentTarget.style.opacity = 1; }}
          onMouseLeave={function(e) { e.currentTarget.style.opacity = 0; }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "linear-gradient(135deg,#00e5a0,#00cfff)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
          }}>▶</div>
        </div>
        {!video.isReal && (
          <div style={{ position: "absolute", bottom: 4, right: 4, background: "rgba(0,0,0,0.6)", borderRadius: 4, padding: "1px 4px" }}>
            <span style={{ fontSize: 9, color: "#fff", opacity: 0.7 }}>↗</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p className="c2" style={{
          fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: "0.82rem",
          color: "var(--text)", lineHeight: 1.38, marginBottom: 4,
          transition: "color 0.2s",
        }}>
          {video.title || "Video"}
        </p>
        <p style={{ fontSize: 11, color: "#00e5a0", fontWeight: 600, fontFamily: "'Outfit',sans-serif", marginBottom: 2 }}>
          {video.channel || ""}
        </p>
        {video.published && (
          <p className="f-mono" style={{ fontSize: 10, color: "var(--muted)" }}>{timeAgo(video.published)}</p>
        )}
      </div>
    </a>
  );
}
