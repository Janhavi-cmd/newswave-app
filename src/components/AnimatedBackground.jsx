export default function AnimatedBackground() {
  return (
    <>
      <div className="grid-bg" />
      {/* Subtle corner glows */}
      <div style={{
        position: 'fixed', top: -200, left: -200, width: 600, height: 600,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'orbDrift1 25s ease-in-out infinite',
      }} />
      <div style={{
        position: 'fixed', bottom: -150, right: -150, width: 500, height: 500,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,255,0.03) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'orbDrift2 30s ease-in-out infinite',
      }} />
      <style>{`
        @keyframes orbDrift1{0%,100%{transform:translate(0,0)}50%{transform:translate(60px,-40px)}}
        @keyframes orbDrift2{0%,100%{transform:translate(0,0)}50%{transform:translate(-50px,40px)}}
      `}</style>
    </>
  );
}
