import { useState, useEffect, useCallback } from "react";
import { fetchNews, fetchVideos } from "../utils/api";

export function useNewsData(catId, query, lang) {
  var [news,    setNews]    = useState([]);
  var [videos,  setVideos]  = useState([]);
  var [loading, setLoading] = useState(true);
  var [error,   setError]   = useState(null);

  var load = useCallback(function() {
    var active = true;
    setLoading(true);
    setError(null);
    Promise.all([
      fetchNews(catId, query),
      fetchVideos(catId, query, lang),
    ]).then(function(results) {
      if (active) { setNews(results[0] || []); setVideos(results[1] || []); }
    }).catch(function(err) {
      if (active) setError(err.message);
    }).finally(function() {
      if (active) setLoading(false);
    });
    return function() { active = false; };
  }, [catId, query, lang]);

  useEffect(function() {
    var cleanup = load();
    return cleanup;
  }, [load]);

  return { news: news, videos: videos, loading: loading, error: error, reload: load };
}
