"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const RAW_PATH_ROOF =
  "M 297.089844 616.949219 L 688.203125 342.449219 C 729.375 319.574219 770.542969 319.574219 811.710938 342.449219 L 1202.824219 616.949219 L 1106.761719 616.949219 L 832.296875 493.425781 C 777.40625 470.550781 722.511719 470.550781 667.617188 493.425781 L 393.152344 616.949219 Z";
const RAW_PATH_BOOK =
  "M 228.476562 713.023438 L 708.789062 713.023438 C 727.085938 713.023438 738.523438 724.460938 743.097656 747.335938 L 749.957031 795.375 L 756.820312 747.335938 C 761.394531 724.460938 772.832031 713.023438 791.128906 713.023438 L 1271.441406 713.023438 L 1381.226562 795.375 L 900.914062 795.375 C 855.167969 795.375 823.148438 804.523438 804.851562 822.824219 C 768.253906 859.425781 731.660156 859.425781 695.066406 822.824219 C 676.765625 804.523438 644.746094 795.375 599.003906 795.375 L 118.6875 795.375 Z";

interface Particle {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  radius: number;
  density: number;
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
    const mouse = { x: -1000, y: -1000, radius: 90 };

    const isDark = () =>
      document.documentElement.getAttribute("data-theme") === "dark" ||
      (document.documentElement.getAttribute("data-theme") === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    function buildParticles() {
      if (!canvas || !ctx) return;
      particles = [];
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);

      const isMobile = w < 768;
      const targetW = isMobile ? Math.min(w * 0.85, 450) : Math.min(w * 0.46, 580);
      const scale = targetW / 1263;
      const logoX = isMobile ? (w - targetW) / 2 : w * 0.52;
      const logoY = h * 0.5 - (541 * scale) / 2;

      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const offCtx = off.getContext("2d")!;
      offCtx.save();
      offCtx.translate(logoX, logoY);
      offCtx.scale(scale, scale);
      offCtx.translate(-118, -319);

      const pathRoof = new Path2D(RAW_PATH_ROOF);
      const pathBook = new Path2D(RAW_PATH_BOOK);
      const step = isMobile ? 10 : 12;

      const dark = isDark();
      const roofColor = dark ? "#5D97F5" : "#4A86E8";
      const bookColor = dark ? "#CBD5E1" : "#22252A";
      const ambientA = dark ? "rgba(93,151,245,0.18)" : "rgba(74,134,232,0.22)";
      const ambientB = dark ? "rgba(203,213,225,0.12)" : "rgba(34,37,42,0.16)";

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const inRoof = offCtx.isPointInPath(pathRoof, x, y);
          const inBook = offCtx.isPointInPath(pathBook, x, y);
          if (inRoof) {
            particles.push({ baseX: x, baseY: y, x, y, vx: 0, vy: 0, color: roofColor, radius: 2.4, density: 25 });
          } else if (inBook) {
            particles.push({ baseX: x, baseY: y, x, y, vx: 0, vy: 0, color: bookColor, radius: 2.4, density: 25 });
          } else {
            const distToLogo = Math.hypot(x - (logoX + targetW / 2), y - (logoY + (541 * scale) / 2));
            const maxDist = Math.max(w, h);
            const chance = (1 - distToLogo / maxDist) * 0.08 + 0.025;
            if (Math.random() < chance) {
              const color = Math.random() > 0.5 ? ambientA : ambientB;
              const jx = x + (Math.random() - 0.5) * 6;
              const jy = y + (Math.random() - 0.5) * 6;
              particles.push({ baseX: jx, baseY: jy, x: jx, y: jy, vx: 0, vy: 0, color, radius: 1.6, density: 15 });
            }
          }
        }
      }
      offCtx.restore();
    }

    function render() {
      if (!canvas || !ctx) return;
      const dark = isDark();
      ctx.fillStyle = dark ? "#0A0C10" : "#FDFDFE";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
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

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
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

    buildParticles();
    render();

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
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
