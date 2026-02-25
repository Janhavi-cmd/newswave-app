import React, { useState } from "react";
import { TRENDING, LANGUAGES, UI } from "../utils/constants";

export default function SearchBar({ onSearch, lang }) {
  var [q, setQ]           = useState("");
  var [listening, setLis] = useState(false);
  var ui = UI[lang] || UI.en;

  function submit(e) {
    e.preventDefault();
    var val = q.trim();
    if (val) onSearch(val);
  }

  function clear() { setQ(""); onSearch(""); }

  function doVoice() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Voice search is not supported in this browser. Try Chrome."); return; }
    var lobj = LANGUAGES.find(function(l) { return l.code === lang; });
    var r    = new SR();
    r.lang         = (lobj && lobj.sr) ? lobj.sr : "en-US";
    r.interimResults = false;
    r.onstart      = function() { setLis(true); };
    r.onend        = function() { setLis(false); };
    r.onresult     = function(e) {
      var txt = e.results[0][0].transcript;
      setQ(txt);
      onSearch(txt);
    };
    r.onerror = function() { setLis(false); };
    r.start();
  }

  return (
    <div style={{ maxWidth: 780, margin: "0 auto 32px" }}>
      <form onSubmit={submit}>
        <div className="glass g-border" style={{
          display: "flex", alignItems: "center", borderRadius: 22,
          padding: "6px 8px 6px 22px", gap: 8,
          boxShadow: "0 8px 32px rgba(0,229,160,0.10)",
          transition: "transform 0.25s",
        }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>🔍</span>
          <input
            value={q}
            onChange={function(e) { setQ(e.target.value); }}
            placeholder={ui.search || "Search news..."}
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              fontSize: 15, fontFamily: "'Outfit', sans-serif", color: "var(--text)",
              minWidth: 0, padding: "8px 0",
            }}
          />
          {q && (
            <button type="button" onClick={clear} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 16, opacity: 0.4, padding: "4px 6px", flexShrink: 0,
              color: "var(--text)",
            }}>✕</button>
          )}
          <button type="button" onClick={doVoice} title="Voice search" style={{
            background: listening ? "rgba(255,78,114,0.15)" : "rgba(0,229,160,0.08)",
            border: listening ? "1px solid rgba(255,78,114,0.4)" : "1px solid rgba(0,229,160,0.2)",
            borderRadius: 12, padding: "8px 12px", cursor: "pointer",
            fontSize: 16, flexShrink: 0, transition: "all 0.2s",
          }}>
            {listening ? "🔴" : "🎙️"}
          </button>
          <button type="submit" className="g-btn" style={{
            borderRadius: 14, padding: "10px 22px", flexShrink: 0,
            fontFamily: "'Outfit', sans-serif", fontSize: 14,
            boxShadow: "0 4px 16px rgba(0,229,160,0.28)",
          }}>
            Search
          </button>
        </div>
      </form>

      {/* Trending chips */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, flexWrap: "wrap", paddingLeft: 4 }}>
        <span className="f-mono" style={{ fontSize: 10, opacity: 0.38, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--text)" }}>
          🔥 Trending:
        </span>
        {TRENDING.map(function(term) {
          return (
            <button key={term} onClick={function() { setQ(term); onSearch(term); }} style={{
              background: "rgba(0,229,160,0.07)", border: "1px solid rgba(0,229,160,0.16)",
              borderRadius: 99, padding: "4px 13px", fontSize: 12, fontWeight: 600,
              color: "#00e5a0", cursor: "pointer", fontFamily: "'Outfit', sans-serif",
              transition: "all 0.18s",
            }}>
              {term}
            </button>
          );
        })}
      </div>
    </div>
  );
}
