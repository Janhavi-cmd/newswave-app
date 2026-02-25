import React, { useState, useCallback } from "react";
import Navbar          from "./components/Navbar.jsx";
import BreakingTicker  from "./components/BreakingTicker.jsx";
import CategoryTabs    from "./components/CategoryTabs.jsx";
import SearchBar       from "./components/SearchBar.jsx";
import HeroSection     from "./components/HeroSection.jsx";
import NewsCard        from "./components/NewsCard.jsx";
import LoadingSkeleton from "./components/LoadingSkeleton.jsx";
import VideoSidebar    from "./components/VideoSidebar.jsx";
import ReaderModal     from "./components/ReaderModal.jsx";
import Toast           from "./components/Toast.jsx";
import ReadingProgress from "./components/ReadingProgress.jsx";
import { useNewsData } from "./hooks/useNewsData.js";
import { UI } from "./utils/constants.js";

function useBookmarks() {
  var [bm, setBm] = useState(function() {
    try { return JSON.parse(localStorage.getItem("nw3-bookmarks") || "[]"); } catch(e) { return []; }
  });
  function save(items) {
    setBm(items);
    try { localStorage.setItem("nw3-bookmarks", JSON.stringify(items)); } catch(e) {}
  }
  function toggle(article) {
    var exists = bm.find(function(a) { return a.url === article.url; });
    if (exists) save(bm.filter(function(a) { return a.url !== article.url; }));
    else save(bm.concat([article]));
    return !exists;
  }
  function isSaved(url) { return bm.some(function(a) { return a.url === url; }); }
  return { bookmarks: bm, toggle: toggle, isSaved: isSaved };
}

export default function App() {
  var [category,  setCategory] = useState("general");
  var [query,     setQuery]    = useState("");
  var [lang,      setLang]     = useState("en");
  var [reader,    setReader]   = useState(null);
  var [toast,     setToast]    = useState({ msg: "", type: "ok" });
  var [showSaved, setShowSaved] = useState(false);
  var { bookmarks, toggle, isSaved } = useBookmarks();
  var { news, videos, loading, error } = useNewsData(category, query, lang);
  var ui = UI[lang] || UI.en;

  var handleCategory = useCallback(function(cat) {
    setCategory(cat); setQuery(""); setShowSaved(false);
  }, []);

  var handleSearch = useCallback(function(q) {
    setQuery(q); setShowSaved(false);
    if (q) setCategory("general");
  }, []);

  var handleSave = useCallback(function(article) {
    var added = toggle(article);
    setToast({ msg: added ? (ui.saved || "Saved") : (ui.unsaved || "Removed"), type: "ok" });
  }, [toggle, ui]);

  var displayNews = showSaved ? bookmarks : news;
  var heroNews    = (!query && !showSaved && !loading) ? displayNews.slice(0, 5) : [];
  var gridNews    = (!query && !showSaved) ? displayNews.slice(5) : displayNews;

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* Animated background */}
      <div className="mesh-bg">
        <div className="mesh-orb orb1" />
        <div className="mesh-orb orb2" />
        <div className="mesh-orb orb3" />
      </div>
      <div className="grain-overlay" />
      <ReadingProgress />

      {/* App */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <Navbar lang={lang} setLang={setLang} savedCount={bookmarks.length} />
        <BreakingTicker news={news} lang={lang} />
        <CategoryTabs active={category} onChange={handleCategory} />

        <main style={{ maxWidth: 1800, margin: "0 auto", padding: "32px 24px 80px" }}>
          <SearchBar onSearch={handleSearch} lang={lang} />

          {/* Saved toggle */}
          {bookmarks.length > 0 && (
            <div style={{ marginBottom: 20, display: "flex", gap: 10, alignItems: "center" }}>
              <button onClick={function() { setShowSaved(false); }} style={{
                padding: "7px 18px", borderRadius: 99, border: "none", cursor: "pointer",
                background: !showSaved ? "linear-gradient(135deg,#00e5a0,#00cfff)" : "var(--glass)",
                color: !showSaved ? "#000" : "var(--muted)",
                fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 13,
                transition: "all 0.2s",
              }}>
                📰 {ui.latest || "Latest"}
              </button>
              <button onClick={function() { setShowSaved(true); }} style={{
                padding: "7px 18px", borderRadius: 99, border: "none", cursor: "pointer",
                background: showSaved ? "linear-gradient(135deg,#f5c842,#f97316)" : "var(--glass)",
                color: showSaved ? "#000" : "var(--muted)",
                fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 13,
                transition: "all 0.2s",
              }}>
                🔖 {ui.bookmarks || "Saved"} ({bookmarks.length})
              </button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ textAlign: "center", padding: 20, color: "var(--rose)", marginBottom: 20 }}>
              ⚠️ {error}
            </div>
          )}

          {/* Layout: news + sidebar */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 28, alignItems: "start" }}>
            {/* LEFT: news */}
            <div>
              {/* Hero trending */}
              {!loading && heroNews.length > 0 && !showSaved && (
                <HeroSection news={heroNews} onRead={setReader} />
              )}

              {/* Section header */}
              {!loading && gridNews.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div className="f-display g-text" style={{ fontSize: 22 }}>
                      {showSaved ? (ui.bookmarks || "SAVED") : (ui.latest || "LATEST STORIES")}
                    </div>
                    <span className="f-mono" style={{
                      fontSize: 11, color: "#00e5a0", background: "rgba(0,229,160,0.1)",
                      border: "1px solid rgba(0,229,160,0.2)", padding: "2px 10px", borderRadius: 99,
                    }}>
                      {gridNews.length}
                    </span>
                  </div>
                </div>
              )}

              {/* Grid */}
              {loading ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 18 }}>
                  {Array.from({ length: 9 }).map(function(_, i) { return <LoadingSkeleton key={i} />; })}
                </div>
              ) : gridNews.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px" }}>
                  <div style={{ fontSize: 56, marginBottom: 14 }}>📭</div>
                  <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, color: "var(--muted)", letterSpacing: "0.04em" }}>
                    {ui.noNews || "No stories found"}
                  </p>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 18 }}>
                  {gridNews.map(function(article, i) {
                    return (
                      <NewsCard
                        key={article.id || i}
                        article={article}
                        index={i}
                        lang={lang}
                        isSaved={isSaved(article.url)}
                        onSave={handleSave}
                        onRead={setReader}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* RIGHT: videos */}
            <VideoSidebar videos={videos} loading={loading} lang={lang} />
          </div>
        </main>

        {/* Footer */}
        <footer style={{ borderTop: "1px solid var(--border)", padding: "36px 24px" }}>
          <div style={{ maxWidth: 1800, margin: "0 auto", textAlign: "center" }}>
            <div className="f-display g-text" style={{ fontSize: 32, marginBottom: 6 }}>NEWSWAVE</div>
            <p style={{ fontSize: 13, color: "var(--muted)", fontFamily: "'Outfit',sans-serif" }}>
              Real-time global news in 12 languages · YouTube videos · Voice search · Bookmark anything
            </p>
            <div className="f-mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 10, opacity: 0.5 }}>
              © 2026 NewsWave · Built with React + Vite + Tailwind · The Guardian API + YouTube
            </div>
          </div>
        </footer>
      </div>

      {/* Reader Modal */}
      {reader && (
        <ReaderModal article={reader} lang={lang} onClose={function() { setReader(null); }} />
      )}

      {/* Toast */}
      <Toast message={toast.msg} type={toast.type} onDone={function() { setToast({ msg: "", type: "ok" }); }} />
    </div>
  );
}
