import React, { useEffect, useMemo, useRef } from 'react';

/*
 * The λ river. Λόγος (DialogosAI, blue) falls from the top, Πράξη (PraxisAI,
 * green) rises from the lower left; they meet side by side at the confluence
 * and continue as one wide, slow river. Paper boats drift along; a question
 * turns into its answer once the boat passes the confluence.
 * Motion is slow on purpose (25–40 s loops) and stops for reduced motion.
 */

const W = 1440;
const H = 900;
const N = 12;          // lines per stream
const S = 6.5;         // spacing between lines
const JX = 1080;       // confluence
const JY = 590;

// Centre lines are sampled cubic Béziers; every line is the centre offset along
// its normal, so spacing stays even and the streams never pinch.
const bez = (p0, p1, p2, p3, t) => {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ];
};
const sample = (segs, steps = 40) => {
  const pts = [];
  segs.forEach((sg, k) => { for (let j = k ? 1 : 0; j <= steps; j += 1) pts.push(bez(sg[0], sg[1], sg[2], sg[3], j / steps)); });
  return pts;
};
const offsetPath = (pts, o, widen = 0) => {
  let d = '';
  pts.forEach((p, n) => {
    const a = pts[Math.max(0, n - 1)]; const b = pts[Math.min(pts.length - 1, n + 1)];
    const dx = b[0] - a[0]; const dy = b[1] - a[1]; const L = Math.hypot(dx, dy) || 1;
    const grow = 1 + widen * Math.max(0, (p[0] - JX) / (W - JX));
    const x = p[0] - (dy / L) * o * grow; const y = p[1] + (dx / L) * o * grow;
    d += `${n ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)} `;
  });
  return d;
};
const HALF = (N * S) / 2;
const LOGOS = sample([
  [[880, -30], [880, 190], [930, 440], [JX, JY - HALF]],
  [[JX, JY - HALF], [1220, JY - HALF + 10], [1330, JY - HALF + 34], [W + 60, JY - HALF + 54]],
]);
const PRAXIS = sample([
  [[420, H + 40], [700, 720], [900, JY + HALF + 6], [JX, JY + HALF]],
  [[JX, JY + HALF], [1220, JY + HALF + 10], [1330, JY + HALF + 34], [W + 60, JY + HALF + 54]],
]);
const logosPath = (i) => offsetPath(LOGOS, -(i - (N - 1) / 2) * S, 0.5);
const praxisPath = (i) => offsetPath(PRAXIS, -(i - (N - 1) / 2) * S, 0.5);

const Boat = () => (
  <g className="flr-boat-shape">
    <path d="M-15 -2 L15 -2 L9 7 L-9 7 Z" />
    <path d="M-2 -2 L-2 -19 L10 -4 Z" />
  </g>
);

const FlowRiver = ({ copy }) => {
  const svgRef = useRef(null);
  const boatRefs = useRef([]);
  const reduce = typeof window !== 'undefined' && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lines = useMemo(() => {
    const out = [];
    for (let i = 0; i < N; i += 1) {
      const edge = Math.abs(i - (N - 1) / 2) / ((N - 1) / 2);
      const op = (0.28 + 0.72 * (1 - edge)).toFixed(2);
      out.push({ d: logosPath(i), k: 'logos', i, op });
      out.push({ d: praxisPath(i), k: 'praxis', i, op });
    }
    return out;
  }, []);

  // boats: which line they ride, where they start (0..1), speed (fraction per second)
  const boats = useMemo(() => ([
    { k: 'logos', i: 5, start: 0.26, v: 0.012 },
    { k: 'praxis', i: 6, start: 0.20, v: 0.010 },
    { k: 'logos', i: 8, start: 0.56, v: 0.011 },
  ]), []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;
    const guides = boats.map((b) => svg.querySelector(`[data-guide="${b.k}-${b.i}"]`));
    const lens = guides.map((g) => (g ? g.getTotalLength() : 1));
    // where each guide reaches the confluence (fraction of its length)
    const joinAt = guides.map((g, n) => {
      if (!g) return 0.5;
      let lo = 0; let hi = lens[n];
      for (let k = 0; k < 24; k += 1) { const mid = (lo + hi) / 2; if (g.getPointAtLength(mid).x < JX) lo = mid; else hi = mid; }
      return lo / lens[n];
    });
    const pos = boats.map((b) => b.start);
    let raf = 0; let last = performance.now();

    const place = () => {
      boats.forEach((b, n) => {
        const el = boatRefs.current[n]; const g = guides[n];
        if (!el || !g) return;
        const p = g.getPointAtLength(lens[n] * pos[n]);
        const p2 = g.getPointAtLength(Math.min(lens[n], lens[n] * pos[n] + 4));
        const ang = Math.atan2(p2.y - p.y, p2.x - p.x) * 57.3 * 0.35;
        el.setAttribute('transform', `translate(${p.x.toFixed(1)},${p.y.toFixed(1)})`);
        const tag = el.querySelector('.flr-tags');
        const wide = Number(tag.getAttribute('data-w')) || 260;
        tag.setAttribute('transform', p.x + wide * 1.05 + 30 > W ? `translate(${-wide - 16},-40)` : 'translate(16,-40)');
        el.querySelector('.flr-boat-shape').setAttribute('transform', `rotate(${ang.toFixed(1)})`);
        const answered = pos[n] > joinAt[n];
        el.classList.toggle('is-answered', answered);
        const fade = pos[n] < 0.04 ? pos[n] / 0.04 : pos[n] > 0.9 ? Math.max(0, (1 - pos[n]) / 0.1) : 1;
        el.style.opacity = fade.toFixed(2);
      });
    };
    place();
    if (reduce) return undefined;

    const tick = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000); last = t;
      boats.forEach((b, n) => { pos[n] += b.v * dt; if (pos[n] > 1) pos[n] = 0; });
      place();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [boats, reduce]);

  return (
    <svg ref={svgRef} className="flr" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMaxYMid slice" role="img" aria-label={copy.aria}>
      <defs>
        <radialGradient id="flrGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#d97757" stopOpacity="0.22" />
          <stop offset="1" stopColor="#d97757" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="flrFadeG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.16" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="flrFade"><rect width={W} height={H} fill="url(#flrFadeG)" /></mask>
      </defs>
      <circle cx={JX} cy={JY} r="170" fill="url(#flrGlow)" />
      <g className="flr-lines" mask="url(#flrFade)">
        {lines.map((l) => (
          <path
            key={`${l.k}-${l.i}`}
            d={l.d}
            data-guide={`${l.k}-${l.i}`}
            className={`flr-line flr-${l.k}`}
            style={{ opacity: l.op, strokeDasharray: `${90 + l.i * 11} ${14 + l.i * 2}`, animationDuration: `${26 + l.i * 1.4}s` }}
          />
        ))}
      </g>
      {/* the λ itself, small, at the meeting point */}
      <text x={JX - 8} y={JY + 7} className="flr-lambda" aria-hidden="true">λ</text>

      <g className="flr-labels" aria-hidden="true">
        <text x="960" y="170" className="flr-word">{copy.logos[0]}</text>
        <text x="960" y="194" className="flr-note">{copy.logos[1]}</text>
        <text x="560" y="820" className="flr-word">{copy.praxis[0]}</text>
        <text x="560" y="844" className="flr-note">{copy.praxis[1]}</text>
        <text x="1230" y="470" className="flr-word">{copy.roi[0]}</text>
        <text x="1230" y="494" className="flr-note">{copy.roi[1]}</text>
      </g>

      <g aria-hidden="true">
        {boats.map((b, n) => (
          <g key={n} ref={(el) => { boatRefs.current[n] = el; }} className="flr-boat">
            <Boat />
            <g className="flr-tags" transform="translate(16,-40)" data-w={Math.max(copy.boats[n].q.length, copy.boats[n].a.length) * 7.3 + 28}>
              <g className="flr-q">
                <rect rx="14" height="28" width={copy.boats[n].q.length * 7.3 + 28} />
                <text x="14" y="18.5">{copy.boats[n].q}</text>
              </g>
              <g className="flr-a">
                <rect rx="14" height="28" width={copy.boats[n].a.length * 7.3 + 28} />
                <text x="14" y="18.5">{copy.boats[n].a}</text>
              </g>
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
};

export default FlowRiver;
