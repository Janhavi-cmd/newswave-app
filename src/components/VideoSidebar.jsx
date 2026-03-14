import React from "react";
import VideoCard from "./VideoCard";
import { UI } from "../utils/constants";

function Skeleton() {
  return (
    <div style={{ display: "flex", gap: 12, padding: 10 }}>
      <div className="skeleton" style={{ width: 110, height: 65, borderRadius: 10, flexShrink: 0 }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, justifyContent: "center" }}>
        <div className="skeleton" style={{ height: 12, width: "90%" }} />
        <div className="skeleton" style={{ height: 12, width: "70%" }} />
        <div className="skeleton" style={{ height: 10, width: "45%" }} />
      </div>
    </div>
  );
}

export default function VideoSidebar({ videos, loading, lang }) {
  var ui = UI[lang] || UI.en;
  return (
    <aside>
      <div className="glass" style={{ borderRadius: 20, padding: "16px 4px 12px", position: "sticky", top: 122 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px 12px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: "0 3px 12px rgba(220,38,38,0.35)" }}>
              ▶
            </div>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 19, letterSpacing: "0.04em", color: "var(--text)" }}>
              {ui.videos || "Watch Now"}
            </span>
          </div>
          {videos.length > 0 && (
            <span className="f-mono" style={{ fontSize: 11, color: "#00e5a0", background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.2)", padding: "2px 8px", borderRadius: 99 }}>
              {videos.length}
            </span>
          )}
        </div>

        {/* List */}
        <div className="thin-scroll" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto", paddingTop: 6 }}>
          {loading
            ? Array.from({ length: 6 }).map(function(_, i) { return <Skeleton key={i} />; })
            : videos.length > 0
              ? videos.map(function(v, i) { return <VideoCard key={i} video={v} />; })
              : (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>🎬</div>
                  <p style={{ fontSize: 14, color: "var(--muted)", fontWeight: 600 }}>{ui.noVideos}</p>
                  <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 6, opacity: 0.7 }}>Add VITE_YOUTUBE_API_KEY in .env</p>
                </div>
              )
          }
        </div>
      </div>
    </aside>
  );
}
