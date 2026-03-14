export default function SkeletonCard() {
  return (
    <div style={{ borderRadius: 6, overflow: 'hidden', background: 'var(--card)', border: '1px solid rgba(0,255,136,0.06)' }}>
      <div className="skeleton" style={{ height: 170 }} />
      <div style={{ padding: '13px 15px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div className="skeleton" style={{ height: 18, width: 50, borderRadius: 2 }} />
          <div className="skeleton" style={{ height: 18, width: 64, borderRadius: 2 }} />
        </div>
        <div className="skeleton" style={{ height: 10, width: '50%', borderRadius: 2 }} />
        <div className="skeleton" style={{ height: 18, width: '100%', borderRadius: 2 }} />
        <div className="skeleton" style={{ height: 18, width: '80%', borderRadius: 2 }} />
        <div className="skeleton" style={{ height: 11, width: '100%', borderRadius: 2 }} />
        <div className="skeleton" style={{ height: 11, width: '85%', borderRadius: 2 }} />
        <div className="skeleton" style={{ height: 32, borderRadius: 3, marginTop: 4 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8 }}>
          <div className="skeleton" style={{ height: 28, width: 50, borderRadius: 2 }} />
          <div className="skeleton" style={{ height: 28, width: 90, borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
}
