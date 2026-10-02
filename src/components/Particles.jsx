import { useMemo } from 'react';

export default function Particles({ count = 18, className = '' }) {
  const dots = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${(i * 47) % 100}%`,
    top: `${(i * 71) % 100}%`,
    delay: `${(i % 8) * 0.45}s`,
    duration: `${5 + (i % 5)}s`,
    size: `${2 + (i % 3)}px`,
  })), [count]);
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {dots.map((d) => (
        <span key={d.id} className="particle" style={{ left: d.left, top: d.top, animationDelay: d.delay, animationDuration: d.duration, width: d.size, height: d.size }} />
      ))}
    </div>
  );
}
