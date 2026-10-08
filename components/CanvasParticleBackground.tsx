"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const RAW_PATH_ROOF =
  "M 297.089844 616.949219 L 688.203125 342.449219 C 729.375 319.574219 770.542969 319.574219 811.710938 342.449219 L 1202.824219 616.949219 L 1106.761719 616.949219 L 832.296875 493.425781 C 777.40625 470.550781 722.511719 470.550781 667.617188 493.425781 L 393.152344 616.949219 Z";
const RAW_PATH_BOOK =
  "M 228.476562 713.023438 L 708.789062 713.023438 C 727.085938 713.023438 738.523438 724.460938 743.097656 747.335938 L 749.957031 795.375 L 756.820312 747.335938 C 761.394531 724.460938 772.832031 713.023438 791.128906 713.023438 L 1271.441406 713.023438 L 1381.226562 795.375 L 900.914062 795.375 C 855.167969 795.375 823.148438 804.523438 804.851562 822.824219 C 768.253906 859.425781 731.660156 859.425781 695.066406 822.824219 C 676.765625 804.523438 644.746094 795.375 599.003906 795.375 L 118.6875 795.375 Z";

// Intro: a closed book — the right half lies rotated 180° on top of the left half — opens by
// rotating rigidly around the spine like a real cover; thin pages riffle after it; then the roof
// rises out of the open book
const FADE_IN = 400; // ms
const BOOK_DURATION = 1900; // ms — cover rotation from closed (180°) to flat (0°)
const BOOK_BEND = 160; // ms — outer edge trails slightly, so the cover flexes a little
const RIFFLE_PAGES = 4; // thin translucent pages turning after the cover
const RIFFLE_START = 550; // ms
const RIFFLE_GAP = 240; // ms between pages
const RIFFLE_DURATION = 1500; // ms per page
const RIFFLE_ALPHA = 0.45; // peak opacity of a turning page
const ROOF_DELAY = 2350; // ms — roof starts once the book lies open
const ROOF_STAGGER = 700; // ms — roof grows from the center outward
const ROOF_DURATION = 1150; // ms
const ASSEMBLY_DURATION = ROOF_DELAY + ROOF_STAGGER + ROOF_DURATION;
const MAX_LOGO_W = 860;
const EDGE_MARGIN = 48;
const TEXT_GAP = 36;

interface Particle {
  baseX: number;
  baseY: number;
  // 0 at the spine/center, 1 at the outer edge: drives the intro stagger
  spread: number;
  // Book dots: position in the closed book (flat block with a rounded spine)
  closedX: number;
  closedY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isRoof: boolean;
  radius: number;
  density: number;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const clamp01 = (t: number) => Math.min(Math.max(t, 0), 1);

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
    // Book spine and top edge of the book in canvas pixels (set in buildParticles)
    let spineX = 0;
    let bookTopY = 0;
    let topRow: Particle[] = [];
    // Play the intro only on first load, not on every resize or theme change
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
        // Logo is symmetric about the spine (raw x≈750): put a grid column exactly on the spine so
        // both halves — and the central V — are sampled as mirror images
        const axis = logoX + (749.957 - 118) * scale;
        const halfW = (1381.226 - 749.957) * scale;
        const x0 = axis - Math.ceil((axis - logoX) / step) * step;
        const y0 = Math.max(0, Math.floor(logoY / step) * step);
        for (let y = y0; y < Math.min(h, logoY + 541 * scale + step); y += step) {
          for (let x = x0; x < logoX + targetW + step; x += step) {
            const inRoof = off.isPointInPath(pathRoof, x, y);
            const inBook = !inRoof && off.isPointInPath(pathBook, x, y);
            if (!inRoof && !inBook) continue;
            // The book's thin outer tips produce stray dots; trim both sides equally
            if (inBook && Math.abs(x - axis) > halfW - step * 1.5) continue;
            pts.push({
              baseX: x, baseY: y, spread: 0, closedX: x, closedY: y,
              x, y, vx: 0, vy: 0,
              isRoof: inRoof, radius: 2, density: 25,
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

      // Book opening: spine at raw x≈750, book top edge at raw y≈713 (see RAW_PATH_BOOK)
      spineX = logoX + (749.957 - 118) * scale;
      bookTopY = logoY + (713.023 - 319) * scale;
      const maxDx = Math.max(1, ...particles.map(p => Math.abs(p.baseX - spineX)));
      for (const p of particles) p.spread = Math.abs(p.baseX - spineX) / maxDx;

      // Closed book, seen edge-on: a flat block with a rounded spine on the right.
      // Left page = lower layer, cover (right half, flipped over the spine) = upper layer.
      // Rows are packed against the spine; the dots of the central fold form the rounded spine.
      const slabH = (795.375 - 713.023) * scale; // page thickness (RAW_PATH_BOOK)
      const rows = new Map<string, Particle[]>();
      const fold: Particle[] = [];
      for (const p of particles) {
        if (p.isRoof) continue;
        if (p.baseY - bookTopY > slabH) { fold.push(p); continue; }
        const key = `${p.baseX > spineX ? "R" : "L"}${Math.round(p.baseY)}`;
        if (!rows.has(key)) rows.set(key, []);
        rows.get(key)!.push(p);
      }
      for (const [key, row] of rows) {
        const right = key.startsWith("R");
        // nearest to the spine first
        row.sort((a, b) => Math.abs(a.baseX - spineX) - Math.abs(b.baseX - spineX));
        row.forEach((p, k) => {
          const dy = p.baseY - bookTopY;
          p.closedX = spineX - step / 2 - k * step;
          p.closedY = right ? bookTopY - dy - step / 2 : bookTopY + dy + step / 2;
        });
      }
      // Rounded spine: a filled half-ellipse attached to the block's last column, spanning its
      // full thickness, on the same dot grid. It splits at its middle row: the upper part belongs
      // to the cover (right half of the V), the lower part to the left page (left half of the V).
      // Slots nearest the middle/outermost point take the deepest V dots, so it becomes the V tip.
      const cx = spineX - step / 2;
      const ry = slabH + step / 2;
      const rx = Math.max(step * 1.5, ry * 0.55);
      const slots: { x: number; y: number; upper: boolean; key: number }[] = [];
      for (let y = bookTopY - ry + step / 2; y < bookTopY + ry; y += step) {
        for (let x = cx + step; ((x - cx) / rx) ** 2 + ((y - bookTopY) / ry) ** 2 <= 1; x += step) {
          // outermost and closest to the middle row first
          slots.push({ x, y, upper: y < bookTopY, key: Math.abs(y - bookTopY) / ry - (x - cx) / rx });
        }
      }
      for (const right of [true, false]) {
        const half = slots.filter(sl => sl.upper === right).sort((a, b) => a.key - b.key);
        const dots = fold.filter(p => (p.baseX > spineX) === right).sort((a, b) => b.baseY - a.baseY);
        dots.forEach((p, i) => {
          // more dots than slots: the extras stack on the outermost slots, keeping it saturated
          const sl = half.length ? half[i % half.length] : { x: cx + step, y: bookTopY };
          p.closedX = sl.x;
          p.closedY = sl.y;
        });
      }

      // Thin "pages" for the riffle: the top row of the right half
      topRow = particles.filter(p => !p.isRoof && p.baseX > spineX && p.baseY - bookTopY < step);
      for (const p of particles) {
        if (p.isRoof) continue;
        p.x = p.closedX;
        p.y = p.closedY;
      }
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    /**
     * Cover dot at opening progress e (0 = closed, 1 = flat on the right).
     * Its shape relative to the spine pivot morphs from the closed block to the open page while
     * the whole cover rotates rigidly from π (flipped over) through upright to 0 (flat).
     */
    function coverPosition(p: Particle, e: number, closedX = p.closedX, closedY = p.closedY) {
      // Closed position expressed in the cover's own (unrotated) frame: undo the π rotation
      const cx = -(closedX - spineX);
      const cy = -(closedY - bookTopY);
      const lx = lerp(cx, p.baseX - spineX, e);
      const ly = lerp(cy, p.baseY - bookTopY, e);
      const angle = Math.PI * (1 - e);
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      return { x: spineX + lx * c + ly * s, y: bookTopY - lx * s + ly * c };
    }

    function render(timestamp: number) {
      if (!canvas || !ctx) return;
      if (assemblyStart === null) {
        assemblyStart = introPlayed ? timestamp - ASSEMBLY_DURATION : timestamp;
        if (introPlayed) for (const p of particles) { p.x = p.baseX; p.y = p.baseY; }
        introPlayed = true;
      }

      const elapsed = timestamp - assemblyStart;
      const assembled = elapsed >= ASSEMBLY_DURATION;
      const fade = clamp01(elapsed / FADE_IN);

      const dark = isDark();
      ctx.fillStyle = dark ? "#0A0C10" : "#FDFDFE";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const roofColor = dark ? "#5D97F5" : "#4A86E8";
      const bookColor = dark ? "#E2E8F0" : "#22252A";

      for (const p of particles) {
        let alpha = 1;
        if (!assembled) {
          if (p.isRoof) {
            // Roof rises out of the open book, center first
            const t = clamp01((elapsed - ROOF_DELAY - p.spread * ROOF_STAGGER) / ROOF_DURATION);
            if (t === 0) continue;
            const e = easeOutCubic(t);
            p.x = p.baseX;
            p.y = bookTopY + (p.baseY - bookTopY) * e;
            alpha = e;
          } else {
            if (p.baseX > spineX) {
              // Right half (cover): rotates around the spine from closed to flat
              const t = clamp01((elapsed - FADE_IN / 2 - p.spread * BOOK_BEND) / BOOK_DURATION);
              const pos = coverPosition(p, easeInOutCubic(t));
              p.x = pos.x;
              p.y = pos.y;
            } else {
              // Left half: the lower layer settles into the open left page
              const t = clamp01((elapsed - FADE_IN / 2 - p.spread * BOOK_BEND) / BOOK_DURATION);
              const e = easeInOutCubic(t);
              p.x = lerp(p.closedX, p.baseX, e);
              p.y = lerp(p.closedY, p.baseY, e);
            }
            alpha = fade;
          }
        } else {
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
          p.vx += (p.baseX - p.x) * 0.08;
          p.vy += (p.baseY - p.y) * 0.08;
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
      // Riffling pages: thin translucent pages turning around the spine one after another
      if (!assembled) {
        ctx.fillStyle = bookColor;
        for (let k = 0; k < RIFFLE_PAGES; k++) {
          const start = RIFFLE_START + k * RIFFLE_GAP;
          for (const p of topRow) {
            const t = clamp01((elapsed - start - p.spread * BOOK_BEND) / RIFFLE_DURATION);
            if (t === 0 || t === 1) continue;
            const pos = coverPosition(p, easeInOutCubic(t));
            ctx.globalAlpha = RIFFLE_ALPHA * Math.sin(Math.PI * t);
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
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
