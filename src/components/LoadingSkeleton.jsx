import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="glass" style={{ borderRadius: 20, overflow: "hidden" }}>
      <div className="skeleton" style={{ height: 210, borderRadius: 0 }} />
      <div style={{ padding: "18px 18px 14px" }}>
        <div className="skeleton" style={{ height: 10, width: 80, borderRadius: 99, marginBottom: 12 }} />
        <div className="skeleton" style={{ height: 16, width: "100%", marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 14, width: "85%", marginBottom: 14 }} />
        <div className="skeleton" style={{ height: 12, width: "100%", marginBottom: 6 }} />
        <div className="skeleton" style={{ height: 12, width: "90%", marginBottom: 6 }} />
        <div className="skeleton" style={{ height: 12, width: "70%", marginBottom: 18 }} />
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
          <div className="skeleton" style={{ height: 32, width: 60, borderRadius: 99 }} />
          <div className="skeleton" style={{ height: 32, width: 120, borderRadius: 12 }} />
        </div>
      </div>
    </div>
  );
}
