import React, { useEffect, useRef } from 'react';
import './StarCanvas.css';

const NUM_BG_STARS = 118;
const CONNECT_DIST = 108;
const INFLUENCE_RADIUS = 220;
const MAX_PULL = 38;
const REVEAL_DURATION = 3400;
const POINT_REVEAL_SPAN = 0.78;
const POINT_REVEAL_LEN = 0.16;

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2);
const easeOutSmooth = (t) => 1 - (1 - t) ** 3;

const shuffleRevealRanks = (count) => {
  const order = Array.from({ length: count }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const ranks = new Array(count);
  order.forEach((index, rank) => {
    ranks[index] = rank;
  });
  return ranks;
};

const getPointReveal = (rank, count, progress) => {
  const start = (rank / count) * POINT_REVEAL_SPAN;
  return easeOutSmooth(Math.min(1, Math.max(0, (progress - start) / POINT_REVEAL_LEN)));
};

// Minimal human — few points, soft proportions
const HEAD_CY = 0.94;
const HEAD_R = 0.058;
const headRing = Array.from({ length: 6 }, (_, i) => {
  const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
  return { x: Math.cos(a) * HEAD_R, y: HEAD_CY + Math.sin(a) * HEAD_R };
});

const BODY_POINTS = [
  { x: 0, y: 0.83 },
  { x: 0, y: 0.68 },
  { x: 0, y: 0.5 },
  { x: -0.14, y: 0.74 },
  { x: 0.14, y: 0.74 },
  { x: -0.22, y: 0.62 },
  { x: 0.22, y: 0.62 },
  { x: -0.26, y: 0.5 },
  { x: 0.26, y: 0.5 },
  { x: -0.28, y: 0.38 },
  { x: 0.28, y: 0.38 },
  { x: -0.09, y: 0.36 },
  { x: 0.09, y: 0.36 },
  { x: -0.08, y: 0.17 },
  { x: 0.08, y: 0.17 },
  { x: -0.09, y: 0 },
  { x: 0.09, y: 0 },
];

const FIGURE_POINTS = [...headRing, ...BODY_POINTS];

const HEAD_COUNT = headRing.length;
const idx = {
  neck: HEAD_COUNT,
  chest: HEAD_COUNT + 1,
  core: HEAD_COUNT + 2,
  lShoulder: HEAD_COUNT + 3,
  rShoulder: HEAD_COUNT + 4,
  lElbow: HEAD_COUNT + 5,
  rElbow: HEAD_COUNT + 6,
  lWrist: HEAD_COUNT + 7,
  rWrist: HEAD_COUNT + 8,
  lHand: HEAD_COUNT + 9,
  rHand: HEAD_COUNT + 10,
  lHip: HEAD_COUNT + 11,
  rHip: HEAD_COUNT + 12,
  lKnee: HEAD_COUNT + 13,
  rKnee: HEAD_COUNT + 14,
  lFoot: HEAD_COUNT + 15,
  rFoot: HEAD_COUNT + 16,
};

const headEdges = Array.from({ length: HEAD_COUNT }, (_, i) => [i, (i + 1) % HEAD_COUNT]);
const FIGURE_EDGES = [
  ...headEdges,
  [3, idx.neck],
  [idx.neck, idx.chest],
  [idx.chest, idx.core],
  [idx.chest, idx.lShoulder],
  [idx.chest, idx.rShoulder],
  [idx.lShoulder, idx.lElbow],
  [idx.lElbow, idx.lWrist],
  [idx.lWrist, idx.lHand],
  [idx.rShoulder, idx.rElbow],
  [idx.rElbow, idx.rWrist],
  [idx.rWrist, idx.rHand],
  [idx.core, idx.lHip],
  [idx.core, idx.rHip],
  [idx.lHip, idx.lKnee],
  [idx.lKnee, idx.lFoot],
  [idx.rHip, idx.rKnee],
  [idx.rKnee, idx.rFoot],
];


const WAVE_RADIUS = INFLUENCE_RADIUS * 1.15;

const getFigureZone = (width, height) => {
  const isMobile = width < 640;
  return {
    cx: width * (isMobile ? 0.72 : 0.78),
    cy: height * (isMobile ? 0.78 : 0.83),
    rx: Math.min(width, height) * (isMobile ? 0.21 : 0.25),
    ry: Math.min(width, height) * (isMobile ? 0.3 : 0.34),
  };
};

const isInFigureZone = (x, y, zone) => {
  const dx = (x - zone.cx) / zone.rx;
  const dy = (y - zone.cy) / zone.ry;
  return dx * dx + dy * dy <= 1;
};

const randomBgStarPos = (width, height, zone, avoidFigureZone = true) => {
  for (let n = 0; n < 32; n += 1) {
    const pick = Math.random();
    let x;
    let y;
    if (!avoidFigureZone) {
      return { x: Math.random() * width, y: Math.random() * height };
    }
    if (pick < 0.36) {
      x = Math.random() * width * 0.56;
      y = Math.random() * height;
    } else if (pick < 0.56) {
      x = Math.random() * width;
      y = Math.random() * height * 0.24;
    } else if (pick < 0.76) {
      x = Math.random() * width;
      y = height * (0.76 + Math.random() * 0.24);
    } else if (pick < 0.9) {
      x = width * (0.86 + Math.random() * 0.14);
      y = Math.random() * height;
    } else {
      x = width * (0.56 + Math.random() * 0.3);
      y = Math.random() < 0.5
        ? Math.random() * height * 0.3
        : height * (0.7 + Math.random() * 0.3);
    }
    if (!isInFigureZone(x, y, zone)) return { x, y };
  }
  return { x: Math.random() * width * 0.5, y: Math.random() * height };
};

const mapFigurePoint = (p, width, height) => {
  const isMobile = width < 640;
  const scale = Math.min(width, height) * (isMobile ? 0.38 : 0.46);
  const cx = width * (isMobile ? 0.72 : 0.78);
  const cy = height * (isMobile ? 0.78 : 0.83);
  const jitter = () => (Math.random() - 0.5) * scale * 0.012;
  return {
    x: cx + p.x * scale + jitter(),
    y: cy - p.y * scale + jitter(),
  };
};

const StarCanvas = ({ showFigure = true }) => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const burstRef = useRef([]);
  const revealStartRef = useRef(null);
  const waveSmoothRef = useRef(0);
  const revealRanksRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    revealStartRef.current = performance.now();

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initStars = () => {
      const zone = getFigureZone(canvas.width, canvas.height);
      const avoidFigureZone = showFigure;

      if (showFigure) {
        revealRanksRef.current = shuffleRevealRanks(FIGURE_POINTS.length);
        const ranks = revealRanksRef.current;

        const figureStars = FIGURE_POINTS.map((p, i) => {
          const { x, y } = mapFigurePoint(p, canvas.width, canvas.height);
          return {
            x,
            y,
            ox: 0,
            oy: 0,
            vx: 0,
            vy: 0,
            r: Math.random() * 1.2 + 0.65,
            opacity: Math.random() * 0.28 + 0.22,
            twinkleOffset: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            motionPhase: Math.random() * Math.PI * 2,
            motionAmp: 0.75 + Math.random() * 0.55,
            motionSpeed: 0.009 + Math.random() * 0.005,
            isFigure: true,
            figureIndex: i,
            revealRank: ranks[i],
          };
        });

        const bgStars = Array.from({ length: NUM_BG_STARS }, () => {
          const { x, y } = randomBgStarPos(canvas.width, canvas.height, zone, avoidFigureZone);
          return {
            x,
            y,
            ox: 0,
            oy: 0,
            vx: 0,
            vy: 0,
            r: Math.random() * 1.5 + 0.3,
            opacity: Math.random() * 0.35 + 0.08,
            twinkleOffset: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            isFigure: false,
          };
        });

        starsRef.current = [...figureStars, ...bgStars];
        return;
      }

      starsRef.current = Array.from({ length: NUM_BG_STARS }, () => {
        const { x, y } = randomBgStarPos(canvas.width, canvas.height, zone, false);
        return {
          x,
          y,
          ox: 0,
          oy: 0,
          vx: 0,
          vy: 0,
          r: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.35 + 0.08,
          twinkleOffset: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          isFigure: false,
        };
      });
    };

    resize();
    initStars();

    const handleResize = () => {
      resize();
      initStars();
      revealStartRef.current = performance.now();
    };
    window.addEventListener('resize', handleResize);

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      burstRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        t: 0,
      });
    };
    window.addEventListener('click', handleClick);

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;
      const now = performance.now();
      const t = Math.min(1, (now - revealStartRef.current) / REVEAL_DURATION);
      const figureReveal = easeInOutCubic(t);
      const reveal = easeOutSmooth(t);
      frame++;

      const stars = starsRef.current;
      const figureStars = showFigure ? stars.filter((s) => s.isFigure) : [];
      const figureZone = showFigure ? getFigureZone(canvas.width, canvas.height) : null;

      const getStarReveal = (star) => (
        showFigure ? getPointReveal(star.revealRank, FIGURE_POINTS.length, figureReveal) : 1
      );

      const revealedCount = showFigure
        ? figureStars.filter((s) => getStarReveal(s) > 0.02).length
        : 0;
      const figureFormed = showFigure && revealedCount >= FIGURE_POINTS.length * 0.92;
      const floatY = showFigure ? Math.sin(frame * 0.006) * 2 * (figureFormed ? 1 : figureReveal) : 0;
      const motionScale = showFigure ? (figureFormed ? 1 : 0.15 + figureReveal * 0.85) : 1;

      const figureAnchor = showFigure && figureStars.length
        ? figureStars.reduce(
            (acc, s) => ({ x: acc.x + s.x / figureStars.length, y: acc.y + s.y / figureStars.length }),
            { x: 0, y: 0 }
          )
        : { x: 0, y: 0 };

      const figDist = showFigure ? Math.hypot(mx - figureAnchor.x, my - figureAnchor.y) : Infinity;
      const nearFigure = showFigure && figDist < WAVE_RADIUS;
      const waveTarget = nearFigure ? 1 : 0;
      const waveLerp = waveTarget > waveSmoothRef.current ? 0.01 : 0.022;
      if (showFigure) {
        waveSmoothRef.current += (waveTarget - waveSmoothRef.current) * waveLerp;
      } else {
        waveSmoothRef.current = 0;
      }
      const waveSmooth = waveSmoothRef.current;

      stars.forEach((star) => {
        if (star.isFigure) return;

        const sx = star.x + star.ox;
        const sy = star.y + star.oy;
        const dx = mx - sx;
        const dy = my - sy;
        const dist = Math.hypot(dx, dy);

        if (dist < INFLUENCE_RADIUS && dist > 0) {
          const force = (1 - dist / INFLUENCE_RADIUS) * MAX_PULL;
          star.vx += (dx / dist) * force * 0.025;
          star.vy += (dy / dist) * force * 0.025;
        }

        star.vx += -star.ox * 0.05;
        star.vy += -star.oy * 0.05;
        star.vx *= 0.88;
        star.vy *= 0.88;
        star.ox += star.vx;
        star.oy += star.vy;
      });

      const figMouse = showFigure ? Math.max(0, 1 - figDist / (INFLUENCE_RADIUS * 1.3)) : 0;

      const getStableFigurePos = (star) => {
        const phase = frame * star.motionSpeed + star.motionPhase;
        const driftX = (Math.sin(phase) * star.motionAmp + Math.cos(phase * 0.72) * star.motionAmp * 0.42) * motionScale;
        const driftY =
          (Math.cos(phase * 0.88) * star.motionAmp * 0.88 + Math.sin(phase * 1.08) * star.motionAmp * 0.32) * motionScale;

        let x = star.x + driftX;
        let y = star.y + driftY + floatY;

        const pointReveal = getStarReveal(star);
        if (pointReveal < 0.995) {
          const pointScale = 0.25 + pointReveal * 0.75;
          x = figureAnchor.x + (x - figureAnchor.x) * pointScale;
          y = figureAnchor.y + (y - figureAnchor.y) * pointScale;
        }

        return { x, y };
      };

      const getFigureBasePos = (star) => getStableFigurePos(star);

      const getFigurePos = (star) => {
        const pos = getFigureBasePos(star);

        if (star.figureIndex === idx.rHand && waveSmooth > 0.001) {
          const wrist = getStableFigurePos(figureStars[idx.rWrist]);
          const rest = getStableFigurePos(star);
          const phase = frame * 0.036;
          const waveX = wrist.x + 58 + Math.cos(phase) * 34;
          const waveY = wrist.y - 72;
          return {
            x: rest.x + (waveX - rest.x) * waveSmooth,
            y: rest.y + (waveY - rest.y) * waveSmooth,
          };
        }

        return pos;
      };

      const bgReveal = Math.min(1, reveal * 1.15);

      // Background constellation lines
      ctx.save();
      stars.forEach((a, i) => {
        if (a.isFigure) return;
        const ax = a.x + a.ox;
        const ay = a.y + a.oy;
        if (figureZone && isInFigureZone(ax, ay, figureZone)) return;
        const mdist = Math.hypot(mx - ax, my - ay);
        if (mdist > INFLUENCE_RADIUS * 1.5) return;

        for (let j = i + 1; j < stars.length; j++) {
          const b = stars[j];
          if (b.isFigure) continue;
          const bx = b.x + b.ox;
          const by = b.y + b.oy;
          if (figureZone && isInFigureZone(bx, by, figureZone)) continue;
          const d = Math.hypot(ax - bx, ay - by);
          if (d < CONNECT_DIST) {
            const alpha =
              (1 - d / CONNECT_DIST) *
              0.21 *
              (1 - mdist / (INFLUENCE_RADIUS * 1.5)) *
              bgReveal;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = `rgba(250,249,245,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      ctx.restore();

      const drawFigureEdges = (edges, alphaMul = 1) => {
        edges.forEach(([a, b]) => {
          const sa = figureStars[a];
          const sb = figureStars[b];
          if (!sa || !sb) return;

          const aReveal = getStarReveal(sa);
          const bReveal = getStarReveal(sb);
          const edgeReveal = Math.min(aReveal, bReveal);
          if (edgeReveal <= 0) return;

          const aPos = getFigurePos(sa);
          const bPos = getFigurePos(sb);
          const len = Math.hypot(bPos.x - aPos.x, bPos.y - aPos.y);
          const alpha = (0.1 + figMouse * 0.16) * easeOutSmooth(edgeReveal) * alphaMul;

          ctx.setLineDash([len, len]);
          ctx.lineDashOffset = len * (1 - edgeReveal);
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(aPos.x, aPos.y);
          ctx.lineTo(bPos.x, bPos.y);
          ctx.strokeStyle = `rgba(250,249,245,${alpha})`;
          ctx.lineWidth = 0.65;
          ctx.stroke();
        });
      };

      if (showFigure) {
        drawFigureEdges(FIGURE_EDGES, 1);
        ctx.setLineDash([]);
      }

      const drawStar = (star) => {
        let sx = star.x + star.ox;
        let sy = star.y + star.oy;

        let revealMul = bgReveal;
        if (star.isFigure) {
          const starReveal = getStarReveal(star);
          if (starReveal <= 0) return;
          const pos = getFigurePos(star);
          sx = pos.x;
          sy = pos.y;
          revealMul = easeOutSmooth(starReveal);
        }

        const twinkle =
          1 + Math.sin(frame * star.twinkleSpeed + star.twinkleOffset) * (star.isFigure ? 0.12 : 0.3);
        const proximity = star.isFigure
          ? figMouse * 0.45
          : Math.max(0, 1 - Math.hypot(mx - sx, my - sy) / INFLUENCE_RADIUS);
        const opacity = (star.opacity * twinkle + proximity * 0.28) * revealMul;
        const revealRadius = star.isFigure ? (0.45 + revealMul * 0.55) : 1;
        const radius = star.r * revealRadius * (1 + proximity * (star.isFigure ? 0.75 : 1.5));

        if (!star.isFigure && proximity > 0.3) {
          ctx.beginPath();
          ctx.arc(sx, sy, radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(217,119,87,${proximity * 0.08})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250,249,245,${Math.min(opacity, 0.95)})`;
        ctx.fill();
      };

      stars.filter((s) => !s.isFigure).forEach(drawStar);
      if (showFigure) {
        figureStars.forEach(drawStar);
      }

      burstRef.current = burstRef.current.filter((b) => b.t < 1);
      burstRef.current.forEach((burst) => {
        burst.t += 0.04;
        const r = burst.t * 60;
        const alpha = (1 - burst.t) * 0.5;
        ctx.beginPath();
        ctx.arc(burst.x, burst.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(217,119,87,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('click', handleClick);
    };
  }, [showFigure]);

  return <canvas ref={canvasRef} className="star-canvas" aria-hidden="true" />;
};

export default StarCanvas;
