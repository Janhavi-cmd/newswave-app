import React from "react";
import { CATEGORIES } from "../utils/constants";

export default function CategoryTabs({ active, onChange }) {
  return (
    <div className="glass" style={{ borderBottom: "1px solid var(--border)", position: "sticky", top: 64, zIndex: 90 }}>
      <div style={{ maxWidth: 1800, margin: "0 auto", padding: "0 24px" }}>
        <div className="no-scroll" style={{ display: "flex", gap: 6, padding: "10px 0", overflowX: "auto" }}>
          {CATEGORIES.map(function(cat) {
            return (
              <button key={cat.id} onClick={function() { onChange(cat.id); }}
                className={"cat-pill" + (active === cat.id ? " active" : "")}>
                <span style={{ fontSize: 15 }}>{cat.icon}</span>
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
