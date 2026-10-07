"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const RAW_PATH_ROOF =
  "M 297.089844 616.949219 L 688.203125 342.449219 C 729.375 319.574219 770.542969 319.574219 811.710938 342.449219 L 1202.824219 616.949219 L 1106.761719 616.949219 L 832.296875 493.425781 C 777.40625 470.550781 722.511719 470.550781 667.617188 493.425781 L 393.152344 616.949219 Z";
const RAW_PATH_BOOK =
  "M 228.476562 713.023438 L 708.789062 713.023438 C 727.085938 713.023438 738.523438 724.460938 743.097656 747.335938 L 749.957031 795.375 L 756.820312 747.335938 C 761.394531 724.460938 772.832031 713.023438 791.128906 713.023438 L 1271.441406 713.023438 L 1381.226562 795.375 L 900.914062 795.375 C 855.167969 795.375 823.148438 804.523438 804.851562 822.824219 C 768.253906 859.425781 731.660156 859.425781 695.066406 822.824219 C 676.765625 804.523438 644.746094 795.375 599.003906 795.375 L 118.6875 795.375 Z";

// Intro: a closed book lying on a table — the right half (cover) rests on the left half and
// turns over the spine, a few pages riffle after it, then the roof rises out of the open book
const FADE_IN = 400; // ms
const BOOK_DURATION = 1700; // ms — the cover travels from left to right
const BOOK_STAGGER = 450; // ms — the outer edge trails the spine, so the page bends like paper
const PAGE_LIFT = 0.35; // height of the page arc relative to its width
const CLOSED_WIDTH = 0.85; // closed book block width relative to one open page
const UNFOLD_DELAY = 300; // ms — the block under the cover starts unfolding after the cover lifts
const RIFFLE_PAGES = 4; // translucent pages flipping after the cover
const RIFFLE_START = 650; // ms — first page leaves while the cover is mid-air
const RIFFLE_GAP = 260; // ms between pages
const RIFFLE_DURATION = 1100; // ms per page
const RIFFLE_ALPHA = 0.35; // peak opacity of a riffling page
const ROOF_DELAY = 2450; // ms — roof starts once the pages have settled
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
  // Book dots only: position in the closed book block
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

      // Closed book: a dense rectangular block left of the spine, filled row by row on the dot grid.
      // The cover (right half) lies on the same grid, offset half a step up and right to show thickness.
      const cols = Math.max(2, Math.floor((maxDx * CLOSED_WIDTH) / step) + 1);
      const blockLeft = spineX - (cols - 1) * step;
      for (const right of [false, true]) {
        const half = particles
          .filter(p => !p.isRoof && (p.baseX > spineX) === right)
          .sort((a, b) => a.baseY - b.baseY || a.baseX - b.baseX);
        half.forEach((p, i) => {
          p.closedX = blockLeft + (i % cols) * step + (right ? step / 2 : 0);
          p.closedY = bookTopY + Math.floor(i / cols) * step - (right ? step / 2 : 0);
        });
      }
      for (const p of particles) {
        p.x = p.closedX;
        p.y = p.closedY;
      }
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    /** Right-half dot turning over the spine: progress 0 = closed (on the block), 1 = flat on the right */
    function turnPosition(p: Particle, progress: number, lift: number) {
      const angle = Math.PI * progress;
      const radius = lerp(spineX - p.closedX, p.baseX - spineX, progress);
      return {
        x: spineX - radius * Math.cos(angle),
        y: lerp(p.closedY, p.baseY, progress) - radius * Math.sin(angle) * lift,
      };
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
              // Right half (cover): lifts off the closed block and turns over the spine in an arc
              const t = clamp01((elapsed - FADE_IN / 2 - p.spread * BOOK_STAGGER) / BOOK_DURATION);
              const turn = turnPosition(p, easeInOutCubic(t), PAGE_LIFT);
              p.x = turn.x;
              p.y = turn.y;
            } else {
              // Left half: the block underneath unfolds into the open left page
              const t = clamp01((elapsed - FADE_IN / 2 - UNFOLD_DELAY - p.spread * BOOK_STAGGER) / BOOK_DURATION);
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
      // Riffling pages: translucent copies of the right half flipping one after another
      if (!assembled) {
        for (let k = 0; k < RIFFLE_PAGES; k++) {
          const start = RIFFLE_START + k * RIFFLE_GAP;
          if (elapsed < start || elapsed > start + RIFFLE_DURATION + BOOK_STAGGER) continue;
          const lift = PAGE_LIFT * (0.7 + 0.12 * k);
          for (const p of particles) {
            if (p.isRoof || p.baseX <= spineX) continue;
            const t = clamp01((elapsed - start - p.spread * BOOK_STAGGER) / RIFFLE_DURATION);
            if (t === 0 || t === 1) continue;
            const pos = turnPosition(p, easeInOutCubic(t), lift);
            // Visible mid-flight, gone as it lands
            ctx.globalAlpha = RIFFLE_ALPHA * Math.sin(Math.PI * t);
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = bookColor;
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
