// Animated space background: a planet with satellites travelling along
// elliptical orbit trajectories, over a twinkling starfield.
// Original implementation — canvas 2D, no dependencies.

const ORBIT_DEFS = [
  { rx: 1.38, ry: 0.40, rot: -0.32, speed: 0.090, phase: 0.0 },
  { rx: 1.72, ry: 0.52, rot: -0.32, speed: 0.062, phase: 2.1 },
  { rx: 2.08, ry: 0.62, rot: -0.32, speed: 0.045, phase: 4.0 },
  { rx: 1.30, ry: 0.34, rot: 0.55, speed: -0.080, phase: 1.2 },
  { rx: 1.62, ry: 0.46, rot: 0.55, speed: -0.055, phase: 3.3 },
];

const TRAIL_LEN = 46;

export function initOrbitBackground() {
  const canvas = document.getElementById("orbitBg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let W = 0;
  let H = 0;
  let stars = [];
  let rafId = 0;
  let running = false;

  const sats = ORBIT_DEFS.map((def) => ({
    def,
    angle: def.phase,
    trail: [],
  }));

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.round((W * H) / 9500);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.25 + 0.35,
      a: Math.random() * 0.45 + 0.22,
      tw: Math.random() * Math.PI * 2,
      sp: Math.random() * 0.6 + 0.4,
    }));
  }

  function planetGeom() {
    const r = Math.min(W, H) * 0.235;
    return { x: W > 900 ? W * 0.655 : W * 0.5, y: H * 0.42, r };
  }

  function drawBackground() {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#05070d");
    g.addColorStop(0.55, "#080d1a");
    g.addColorStop(1, "#0a1224");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  function drawStars(t) {
    for (const s of stars) {
      const alpha = s.a * (0.72 + 0.28 * Math.sin(t * 0.001 * s.sp + s.tw));
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#cfe4ff";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawOrbitLines(p) {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 7]);
    for (const { def } of sats) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(def.rot);
      ctx.strokeStyle = "rgba(120, 190, 255, 0.16)";
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r * def.rx, p.r * def.ry, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
    ctx.setLineDash([]);
  }

  function drawPlanet(p) {
    // Atmosphere glow
    const glow = ctx.createRadialGradient(p.x, p.y, p.r * 0.82, p.x, p.y, p.r * 1.35);
    glow.addColorStop(0, "rgba(34, 186, 235, 0.16)");
    glow.addColorStop(1, "rgba(34, 186, 235, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * 1.35, 0, Math.PI * 2);
    ctx.fill();

    // Sphere with top-left rim light
    const body = ctx.createRadialGradient(
      p.x - p.r * 0.45, p.y - p.r * 0.5, p.r * 0.1,
      p.x, p.y, p.r * 1.05
    );
    body.addColorStop(0, "#1c3a5e");
    body.addColorStop(0.55, "#12233d");
    body.addColorStop(1, "#081120");
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    // Latitude arcs — technical-globe feel
    ctx.save();
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.clip();
    ctx.strokeStyle = "rgba(120, 190, 255, 0.10)";
    ctx.lineWidth = 1;
    for (let i = -2; i <= 2; i++) {
      const ry = p.r * (0.22 * i);
      ctx.beginPath();
      ctx.ellipse(p.x, p.y + ry * 1.9, p.r * 1.02, Math.abs(ry) + p.r * 0.05, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    // Rim light arc
    ctx.strokeStyle = "rgba(34, 186, 235, 0.55)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r - 1, Math.PI * 0.75, Math.PI * 1.65);
    ctx.stroke();
    ctx.restore();
  }

  function satPosition(p, sat) {
    const { def } = sat;
    const cx = p.r * def.rx * Math.cos(sat.angle);
    const cy = p.r * def.ry * Math.sin(sat.angle);
    return {
      x: p.x + cx * Math.cos(def.rot) - cy * Math.sin(def.rot),
      y: p.y + cx * Math.sin(def.rot) + cy * Math.cos(def.rot),
    };
  }

  function drawSatellites(p, t) {
    for (const sat of sats) {
      const pos = satPosition(p, sat);
      sat.trail.push(pos);
      if (sat.trail.length > TRAIL_LEN) sat.trail.shift();

      // Fading trajectory trail
      for (let i = 1; i < sat.trail.length; i++) {
        const alpha = (i / sat.trail.length) * 0.55;
        ctx.strokeStyle = `rgba(140, 210, 255, ${alpha})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(sat.trail[i - 1].x, sat.trail[i - 1].y);
        ctx.lineTo(sat.trail[i].x, sat.trail[i].y);
        ctx.stroke();
      }

      // Satellite glow + core
      const pulse = 0.75 + 0.25 * Math.sin(t * 0.002 + sat.def.phase);
      ctx.save();
      ctx.shadowColor = "rgba(34, 186, 235, 0.9)";
      ctx.shadowBlur = 14 * pulse;
      ctx.fillStyle = "#eaf6ff";
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 2.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Soft halo
      const halo = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 11);
      halo.addColorStop(0, `rgba(34, 186, 235, ${0.35 * pulse})`);
      halo.addColorStop(1, "rgba(34, 186, 235, 0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 11, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function frame(t) {
    drawBackground();
    drawStars(t);
    const p = planetGeom();
    drawOrbitLines(p);
    drawPlanet(p);

    for (const sat of sats) sat.angle += sat.def.speed * 0.012;
    drawSatellites(p, t);

    if (running) rafId = requestAnimationFrame(frame);
  }

  function start() {
    if (running || reduceMotion) return;
    running = true;
    rafId = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  window.addEventListener("resize", () => {
    resize();
    if (reduceMotion) frame(0);
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  resize();
  if (reduceMotion) {
    frame(0); // single static frame
  } else {
    start();
  }
}
