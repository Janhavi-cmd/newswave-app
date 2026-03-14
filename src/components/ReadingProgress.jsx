import React, { useState, useEffect } from "react";

export default function ReadingProgress() {
  var [pct, setPct] = useState(0);
  useEffect(function() {
    function onScroll() {
      var el  = document.documentElement;
      var top = el.scrollTop || document.body.scrollTop;
      var h   = el.scrollHeight - el.clientHeight;
      setPct(h > 0 ? (top / h) * 100 : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return function() { window.removeEventListener("scroll", onScroll); };
  }, []);
  return <div className="read-progress" style={{ width: pct + "%" }} />;
}
