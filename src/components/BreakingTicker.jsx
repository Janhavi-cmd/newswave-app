import React from "react";
import { UI } from "../utils/constants";

export default function BreakingTicker({ news, lang }) {
  var ui = UI[lang] || UI.en;
  if (!news || news.length === 0) return null;
  var items = [].concat(news.slice(0, 7), news.slice(0, 7));
  return (
    <div style={{ background: "linear-gradient(90deg,#b91c1c,#dc2626,#f97316)", color: "#fff", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", height: 38 }}>
        <div className="f-mono" style={{
          flexShrink: 0, height: "100%",
          background: "rgba(0,0,0,0.35)", padding: "0 18px",
          display: "flex", alignItems: "center", gap: 8,
          fontSize: 11, fontWeight: 700, letterSpacing: "2px",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", display: "inline-block", animation: "livePulse 1.9s ease-out infinite" }} />
          {ui.breaking || "BREAKING"}
        </div>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div className="ticker-track">
            {items.map(function(a, i) {
              return (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", fontSize: 13, fontWeight: 500, marginRight: 64 }}>
                  <span style={{ opacity: 0.45, marginRight: 14, fontSize: 9 }}>◆</span>
                  {a.title}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
