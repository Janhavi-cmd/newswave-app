import React, { useEffect } from "react";

export default function Toast({ message, type, onDone }) {
  useEffect(function() {
    if (!message) return;
    var t = setTimeout(function() { if (onDone) onDone(); }, 2600);
    return function() { clearTimeout(t); };
  }, [message, onDone]);

  if (!message) return null;
  var bg   = type === "error" ? "rgba(255,78,114,0.95)" : "rgba(0,229,160,0.95)";
  var clr  = type === "error" ? "#fff" : "#000";
  return (
    <div className="toast" style={{ background: bg, color: clr, boxShadow: "0 8px 30px rgba(0,0,0,0.2)" }}>
      {type === "error" ? "⚠️ " : "✓ "}{message}
    </div>
  );
}
