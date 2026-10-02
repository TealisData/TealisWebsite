"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const RAW_PATH_ROOF =
  "M 297.089844 616.949219 L 688.203125 342.449219 C 729.375 319.574219 770.542969 319.574219 811.710938 342.449219 L 1202.824219 616.949219 L 1106.761719 616.949219 L 832.296875 493.425781 C 777.40625 470.550781 722.511719 470.550781 667.617188 493.425781 L 393.152344 616.949219 Z";
const RAW_PATH_BOOK =
  "M 228.476562 713.023438 L 708.789062 713.023438 C 727.085938 713.023438 738.523438 724.460938 743.097656 747.335938 L 749.957031 795.375 L 756.820312 747.335938 C 761.394531 724.460938 772.832031 713.023438 791.128906 713.023438 L 1271.441406 713.023438 L 1381.226562 795.375 L 900.914062 795.375 C 855.167969 795.375 823.148438 804.523438 804.851562 822.824219 C 768.253906 859.425781 731.660156 859.425781 695.066406 822.824219 C 676.765625 804.523438 644.746094 795.375 599.003906 795.375 L 118.6875 795.375 Z";

// Intro: big-bang burst from the logo center across the whole page, then a slow regroup
const EXPLODE_DURATION = 1600; // ms — fast burst that decelerates
const GATHER_STAGGER = 800; // ms — max random delay before each particle starts regrouping
const GATHER_DURATION = 2400; // ms
const ASSEMBLY_DURATION = EXPLODE_DURATION + GATHER_STAGGER + GATHER_DURATION;
const DRIFT_RAMP = 3000; // ms — eases the continuous drift in after assembly
const DRIFT_WINDOW = 0.25; // fraction of each particle's cycle spent away from home
const MAX_LOGO_W = 860;
const EDGE_MARGIN = 48;
const TEXT_GAP = 36;

interface Particle {
  baseX: number;
  baseY: number;
  originX: number;
  originY: number;
  scatterX: number;
  scatterY: number;
  gatherDelay: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isRoof: boolean;
  radius: number;
  density: number;
  // Continuous drift: each particle periodically wanders off and returns home
  period: number;
  phase: number;
  cycle: number;
  angle: number;
  reach: number;
  wobble: number;
}

function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type Rect = { left: number; top: number; right: number; bottom: number };

/** Line boxes of the text inside [data-particle-avoid], in canvas pixel coordinates */
function avoidRects(canvas: HTMLCanvasElement): Rect[] {
  const el = document.querySelector("[data-particle-avoid]");
  if (!el) return [];
  const box = canvas.getBoundingClientRect();
  const sx = canvas.width / (box.width || 1);
  const sy = canvas.height / (box.height || 1);
  const rects: Rect[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node.textContent?.trim()) continue;
    range.selectNodeContents(node);
    for (const r of range.getClientRects()) {
      rects.push({
        left: (r.left - box.left - TEXT_GAP) * sx,
        right: (r.right - box.left + TEXT_GAP) * sx,
        top: (r.top - box.top - TEXT_GAP / 2) * sy,
        bottom: (r.bottom - box.top + TEXT_GAP / 2) * sy,
      });
    }
  }
  return rects;
}

export default function CanvasParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    if (shouldReduceMotion) {
      canvas.style.display = "none";
      return;
    }

    let particles: Particle[] = [];
    let animId: number;
    let assemblyStart: number | null = null;
    // Play the big bang only on first load, not on every resize or theme change
    let introPlayed = false;
    const mouse = { x: -1000, y: -1000, radius: 90 };

    const isDark = () =>
      document.documentElement.getAttribute("data-theme") === "dark" ||
      (document.documentElement.getAttribute("data-theme") === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    function buildParticles() {
      if (!canvas || !ctx) return;
      particles = [];
      assemblyStart = null;
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);

      const isMobile = w < 768;
      const step = isMobile ? 10 : 12;
      const offCanvas = document.createElement("canvas");
      offCanvas.width = w;
      offCanvas.height = h;
      const off = offCanvas.getContext("2d")!;
      const pathRoof = new Path2D(RAW_PATH_ROOF);
      const pathBook = new Path2D(RAW_PATH_BOOK);

      // Sample the logo shape at a given width, anchored to the right edge (desktop) or centered (mobile)
      function sample(targetW: number) {
        const scale = targetW / 1263;
        const logoX = isMobile ? (w - targetW) / 2 : w - EDGE_MARGIN - targetW;
        const logoY = h * 0.5 - (541 * scale) / 2;
        off.setTransform(1, 0, 0, 1, 0, 0);
        off.translate(logoX, logoY);
        off.scale(scale, scale);
        off.translate(-118, -319);

        const pts: Particle[] = [];
        const x0 = Math.floor(logoX / step) * step;
        const y0 = Math.max(0, Math.floor(logoY / step) * step);
        for (let y = y0; y < Math.min(h, logoY + 541 * scale + step); y += step) {
          for (let x = x0; x < logoX + targetW + step; x += step) {
            const inRoof = off.isPointInPath(pathRoof, x, y);
            const inBook = !inRoof && off.isPointInPath(pathBook, x, y);
            if (!inRoof && !inBook) continue;
            // The SVG book path has an extreme-right tip at logoX+targetW that produces stray dots on wider screens
            if (inBook && x > logoX + targetW - step * 1.5) continue;
            pts.push({
              baseX: x, baseY: y, originX: 0, originY: 0, scatterX: 0, scatterY: 0, gatherDelay: 0,
              x, y, vx: 0, vy: 0,
              isRoof: inRoof, radius: 2, density: 25,
              period: 0, phase: 0, cycle: -1, angle: 0, reach: 0, wobble: 0,
            });
          }
        }
        return { pts, logoX, logoY, scale };
      }

      // Desktop: largest logo whose dots stay clear of the hero text lines
      const avoid = isMobile ? [] : avoidRects(canvas);
      const hits = (pts: Particle[]) =>
        pts.some(p => avoid.some(r => p.baseX >= r.left && p.baseX <= r.right && p.baseY >= r.top && p.baseY <= r.bottom));
      let targetW = isMobile ? Math.min(w * 0.85, 450) : Math.min(w * 0.62, MAX_LOGO_W);
      let layout = sample(targetW);
      while (!isMobile && targetW > 360 && hits(layout.pts)) {
        targetW -= 16;
        layout = sample(targetW);
      }
      const { pts: raw, logoX, logoY, scale } = layout;

      // Remove isolated particles (no neighbor within 2×step)
      const neighborDist = step * 2.5;
      particles = raw.filter(p =>
        raw.some(o => o !== p &&
          Math.abs(o.baseX - p.baseX) <= neighborDist &&
          Math.abs(o.baseY - p.baseY) <= neighborDist)
      );

      // Big bang: every particle starts at the logo center and bursts to a random spot on the page
      const logoCx = logoX + targetW / 2;
      const logoCy = logoY + (541 * scale) / 2;
      for (const p of particles) {
        p.originX = logoCx + (Math.random() - 0.5) * 6;
        p.originY = logoCy + (Math.random() - 0.5) * 6;
        p.scatterX = (Math.random() * 1.1 - 0.05) * w;
        p.scatterY = (Math.random() * 1.1 - 0.05) * h;
        p.gatherDelay = Math.random() * GATHER_STAGGER;
        p.x = p.originX;
        p.y = p.originY;
        p.period = 9000 + Math.random() * 6000;
        p.phase = Math.random();
        p.cycle = -1;
        p.angle = 0;
        p.reach = 0;
        p.wobble = Math.random() * Math.PI * 2;
      }
    }

    /** Offset from home for the slow wander-and-return cycle (0 while the particle is home) */
    function driftOffset(p: Particle, time: number, strength: number) {
      const u = time / p.period + p.phase;
      const cycle = Math.floor(u);
      if (cycle !== p.cycle) {
        // New cycle: pick a fresh direction and distance for the next excursion
        p.cycle = cycle;
        p.angle = Math.random() * Math.PI * 2;
        p.reach = 40 + Math.random() * 110;
      }
      const f = u - cycle;
      const away = f < DRIFT_WINDOW ? Math.pow(Math.sin((Math.PI * f) / DRIFT_WINDOW), 2) * strength : 0;
      // Gentle idle wobble keeps the assembled logo alive
      const wob = 1.5 * strength;
      return {
        dx: Math.cos(p.angle) * p.reach * away + Math.cos(time / 1700 + p.wobble) * wob,
        dy: Math.sin(p.angle) * p.reach * away + Math.sin(time / 2100 + p.wobble) * wob,
        away,
      };
    }

    function render(timestamp: number) {
      if (!canvas || !ctx) return;
      if (assemblyStart === null) {
        assemblyStart = introPlayed ? timestamp - ASSEMBLY_DURATION - DRIFT_RAMP : timestamp;
        if (introPlayed) for (const p of particles) { p.x = p.baseX; p.y = p.baseY; }
        introPlayed = true;
      }

      const elapsed = timestamp - assemblyStart;
      const assembled = elapsed >= ASSEMBLY_DURATION;
      const burst = easeOutExpo(Math.min(elapsed / EXPLODE_DURATION, 1));

      const dark = isDark();
      ctx.fillStyle = dark ? "#0A0C10" : "#FDFDFE";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const roofColor = dark ? "#5D97F5" : "#4A86E8";
      const bookColor = dark ? "#E2E8F0" : "#22252A";

      const driftTime = elapsed - ASSEMBLY_DURATION;
      const driftStrength = assembled ? Math.min(driftTime / DRIFT_RAMP, 1) : 0;

      for (const p of particles) {
        let alpha = 1;
        if (!assembled) {
          const gatherT = (elapsed - EXPLODE_DURATION - p.gatherDelay) / GATHER_DURATION;
          if (gatherT <= 0) {
            // Burst outward: very fast at first, decelerating to rest
            p.x = p.originX + (p.scatterX - p.originX) * burst;
            p.y = p.originY + (p.scatterY - p.originY) * burst;
          } else {
            // Slowly regroup into the logo
            const g = easeInOutCubic(Math.min(gatherT, 1));
            p.x = p.scatterX + (p.baseX - p.scatterX) * g;
            p.y = p.scatterY + (p.baseY - p.scatterY) * g;
          }
        } else {
          const { dx: ox, dy: oy, away } = driftOffset(p, driftTime, driftStrength);
          const homeX = p.baseX + ox;
          const homeY = p.baseY + oy;
          alpha = 1 - away * 0.55;
          // Normal interactive physics
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            p.vx -= Math.cos(angle) * force * 7;
            p.vy -= Math.sin(angle) * force * 7;
          }
          p.vx += (homeX - p.x) * 0.08;
          p.vy += (homeY - p.y) * 0.08;
          p.vx *= 0.82;
          p.vy *= 0.82;
          p.x += p.vx;
          p.y += p.vy;
        }

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isRoof ? roofColor : bookColor;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    }

    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseLeave = () => { mouse.x = -1000; mouse.y = -1000; };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; }
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildParticles, 150);
    };

    const themeObserver = new MutationObserver(() => buildParticles());
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    buildParticles();
    animId = requestAnimationFrame(render);

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
