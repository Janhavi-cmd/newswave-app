import React, { useState, useEffect } from "react";
import { LANGUAGES, UI } from "../utils/constants";

function ThemeToggle({ ui }) {
  var [dark, setDark] = useState(false);
  useEffect(function() {
    var s = localStorage.getItem("nw-theme");
    var sys = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var d = s ? s === "dark" : sys;
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
  }, []);
  function toggle() {
    var n = !dark;
    setDark(n);
    document.documentElement.classList.toggle("dark", n);
    localStorage.setItem("nw-theme", n ? "dark" : "light");
  }
  return (
    <button onClick={toggle} title={dark ? (ui.lightMode || "Light") : (ui.darkMode || "Dark")} style={{
      width: 46, height: 26, borderRadius: 99, border: "none", cursor: "pointer",
      background: dark ? "linear-gradient(135deg,#00e5a0,#f5c842)" : "#c8d5ca",
      position: "relative", flexShrink: 0, transition: "background 0.3s",
    }}>
      <span style={{
        position: "absolute", top: 3,
        left: dark ? 23 : 3, width: 20, height: 20, borderRadius: "50%",
        background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, transition: "left 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
      }}>{dark ? "☀️" : "🌙"}</span>
    </button>
  );
}

function LangPicker({ lang, setLang }) {
  var [open, setOpen] = useState(false);
  var cur = LANGUAGES.find(function(l) { return l.code === lang; }) || LANGUAGES[0];
  useEffect(function() {
    function h(e) { if (!e.target.closest(".lang-picker")) setOpen(false); }
    document.addEventListener("mousedown", h);
    return function() { document.removeEventListener("mousedown", h); };
  }, []);
  return (
    <div className="lang-picker" style={{ position: "relative" }}>
      <button onClick={function() { setOpen(function(o) { return !o; }); }} style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "6px 12px", borderRadius: 12, cursor: "pointer",
        border: "1px solid rgba(0,229,160,0.2)", background: "rgba(0,229,160,0.06)",
        color: "var(--text)", fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600,
        transition: "all 0.2s",
      }}>
        <span style={{ fontSize: 17 }}>{cur.flag}</span>
        <span className="hide-mobile">{cur.name}</span>
        <span style={{ fontSize: 9, opacity: 0.5 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="glass thin-scroll" style={{
          position: "absolute", top: "calc(100% + 8px)", right: 0, width: 180,
          borderRadius: 18, boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          zIndex: 200, maxHeight: 380, overflowY: "auto",
        }}>
          {LANGUAGES.map(function(l) {
            return (
              <button key={l.code} onClick={function() { setLang(l.code); setOpen(false); }} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "10px 16px", border: "none", cursor: "pointer",
                background: lang === l.code ? "rgba(0,229,160,0.12)" : "transparent",
                color: lang === l.code ? "#00e5a0" : "var(--text)",
                fontWeight: lang === l.code ? 700 : 400,
                fontFamily: "'Outfit', sans-serif", fontSize: 13, textAlign: "left",
                transition: "background 0.15s",
                direction: l.dir || "ltr",
              }}>
                <span style={{ fontSize: 20 }}>{l.flag}</span>
                <span>{l.name}</span>
                {lang === l.code && <span style={{ marginLeft: "auto", fontSize: 11 }}>✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Navbar({ lang, setLang, savedCount }) {
  var ui = UI[lang] || UI.en;
  return (
    <header className="glass" style={{
      position: "sticky", top: 0, zIndex: 100,
      borderBottom: "1px solid rgba(0,229,160,0.1)",
    }}>
      <div style={{
        maxWidth: 1800, margin: "0 auto",
        padding: "0 24px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
      }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 13, flexShrink: 0,
            background: "linear-gradient(135deg,#00e5a0,#00cfff,#f5c842)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, boxShadow: "0 4px 18px rgba(0,229,160,0.35)",
          }}>🌊</div>
          <div>
            <div className="f-display g-text" style={{ fontSize: 30, lineHeight: 1 }}>NEWSWAVE</div>
            <div className="f-mono" style={{ fontSize: 9, opacity: 0.38, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--text)" }}>
              World News Hub
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          {/* Live badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span className="live-dot" />
            <span className="f-mono" style={{ fontSize: 11, color: "var(--rose)", fontWeight: 700, letterSpacing: 1 }}>LIVE</span>
          </div>
          {/* Saved count */}
          {savedCount > 0 && (
            <div style={{
              padding: "4px 12px", borderRadius: 99,
              background: "rgba(245,200,66,0.12)", border: "1px solid rgba(245,200,66,0.25)",
              color: "#f5c842", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700,
            }}>🔖 {savedCount}</div>
          )}
          <LangPicker lang={lang} setLang={setLang} />
          <ThemeToggle ui={ui} />
        </div>
      </div>
    </header>
  );
}
