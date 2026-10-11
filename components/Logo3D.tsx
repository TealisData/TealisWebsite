"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* The Tealis mark, built once out of dots. The book assembles column by column from the spine,
   the cover swings open and a few pages riffle after it, then the roof is raised from the open
   pages, centre first. After that the mark rests near-frontal and only tilts, softly, towards the
   pointer. Nothing loops. Raw logo units (1263 × 541). */

const ROOF =
  "M 297.089844 616.949219 L 688.203125 342.449219 C 729.375 319.574219 770.542969 319.574219 811.710938 342.449219 L 1202.824219 616.949219 L 1106.761719 616.949219 L 832.296875 493.425781 C 777.40625 470.550781 722.511719 470.550781 667.617188 493.425781 L 393.152344 616.949219 Z";
const BOOK_LEFT =
  "M 228.476562 713.023438 L 708.789062 713.023438 C 727.085938 713.023438 738.523438 724.460938 743.097656 747.335938 L 749.957031 795.375 L 749.957031 850.28 C 731.66 850.28 713.365 841.125 695.066406 822.824219 C 676.765625 804.523438 644.746094 795.375 599.003906 795.375 L 118.6875 795.375 Z";
const BOOK_RIGHT =
  "M 749.957031 795.375 L 756.820312 747.335938 C 761.394531 724.460938 772.832031 713.023438 791.128906 713.023438 L 1271.441406 713.023438 L 1381.226562 795.375 L 900.914062 795.375 C 855.167969 795.375 823.148438 804.523438 804.851562 822.824219 C 786.55 841.125 768.25 850.28 749.957031 850.28 Z";

const RAW = { cx: 749.957, cy: 589.5, w: 1263, minX: 110, maxX: 1390, minY: 315, maxY: 860 };
const SPINE = { x: 749.957, y: 713.023 };
const PAGE_DEPTH = 160;
const ROOF_DEPTH = 45;
const STEP = 15;
const MAX_LOGO_W = 800;
const EDGE_MARGIN = 48;
const TEXT_GAP = 56;
const PAGES = 3;

// Timeline (ms). Each beat starts as the previous one is landing, so the build reads as one gesture.
const BUILD = { start: 0, perColumn: 9, dur: 380 }; // book dots appear from the spine outwards
const OPEN = [700, 1850];
const PAGE_START = 950;
const PAGE_GAP = 160;
const PAGE_DUR = 900;
const RAISE = { start: 1750, perColumn: 14, dur: 650, rise: 210 };
const TURN = [300, 3000];

const clamp01 = (t: number) => Math.min(Math.max(t, 0), 1);

/** CSS-style cubic-bezier easing */
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sy = (t: number) => ((ay * t + by) * t + cy) * t;
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 6; i++) {
      const d = dx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= (sx(t) - x) / d;
    }
    return sy(clamp01(t));
  };
}
const easeOut = bezier(0.23, 1, 0.32, 1);
const easeInOut = bezier(0.77, 0, 0.175, 1);

const LEFT = 0, COVER = 1, ROOFK = 2, PAGE = 3;
type Dot = { kind: number; x: number; y: number; z: number; page: number; col: number };

function sampleDots(): Dot[] {
  const c = document.createElement("canvas").getContext("2d")!;
  const paths = { left: new Path2D(BOOK_LEFT), right: new Path2D(BOOK_RIGHT), roof: new Path2D(ROOF) };
  const dots: Dot[] = [];
  const add = (kind: number, x: number, y: number, z: number, page = -1) =>
    dots.push({ kind, x, y, z, page, col: Math.round(Math.abs(x - SPINE.x) / STEP) });
  const x0 = SPINE.x - Math.ceil((SPINE.x - RAW.minX) / STEP) * STEP;
  for (let x = x0; x <= RAW.maxX; x += STEP) {
    let topBook = Infinity, topRoof = Infinity;
    for (let y = RAW.minY; y <= RAW.maxY; y += STEP) {
      if (c.isPointInPath(paths.roof, x, y)) { add(ROOFK, x, y, 0); topRoof = Math.min(topRoof, y); continue; }
      const side = c.isPointInPath(paths.left, x, y) ? LEFT : c.isPointInPath(paths.right, x, y) ? COVER : -1;
      if (side < 0) continue;
      add(side, x, y, 0);
      topBook = Math.min(topBook, y);
    }
    if (topBook < Infinity) {
      const side = x < SPINE.x ? LEFT : COVER;
      for (let z = STEP * 2; z <= PAGE_DEPTH; z += STEP * 2) add(side, x, topBook, -z);
      if (x > SPINE.x + STEP) for (let k = 0; k < PAGES; k++) for (let z = STEP * 2; z <= PAGE_DEPTH; z += STEP * 2) add(PAGE, x, SPINE.y, -z, k);
    }
    if (topRoof < Infinity) for (let z = STEP; z <= ROOF_DEPTH; z += STEP) add(ROOFK, x, topRoof, -z);
  }
  return dots;
}

const VERT = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  attribute vec3 aColor;
  uniform float uScale;
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uScale / -mv.z;
    // A quiet depth cue: the dots at the back of the pages are a touch lighter
    float depth = clamp((-mv.z - uScale * 0.97) / (uScale * 0.2), 0.0, 1.0);
    vAlpha = aAlpha * (1.0 - 0.35 * depth);
    vColor = aColor;
  }
`;
const FRAG = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.38, r) * vAlpha;
    if (a < 0.02) discard;
    gl_FragColor = vec4(vColor, a);
    #include <colorspace_fragment>
  }
`;

function cssColor(name: string, fallback: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

export default function Logo3D() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%";
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 10, 20000);

    const dots = sampleDots();
    const n = dots.length;
    const pos = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    const alpha = new Float32Array(n);
    const size = new Float32Array(n);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    geo.setAttribute("aAlpha", new THREE.BufferAttribute(alpha, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false,
      uniforms: { uScale: { value: 1 } },
    });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;

    const ink = new THREE.Color();
    const brand = new THREE.Color();
    const applyTheme = () => {
      ink.set(cssColor("--text-primary", "#22252A"));
      brand.set(cssColor("--color-brand", "#4A86E8"));
    };
    applyTheme();

    const logo = new THREE.Group();
    const inner = new THREE.Group();
    inner.scale.set(1, -1, 1);
    inner.position.set(-RAW.cx, RAW.cy, PAGE_DEPTH / 3);
    inner.add(points);
    logo.add(inner);
    scene.add(logo);

    const layout = () => {
      const w = host.clientWidth, h = host.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const dist = h / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)); // 1 unit = 1px at z = 0
      camera.position.set(0, 0, dist);
      camera.updateProjectionMatrix();
      mat.uniforms.uScale.value = dist;
      const text = document.querySelector("[data-particle-avoid]")?.getBoundingClientRect();
      const box = host.getBoundingClientRect();
      const textRight = text ? text.right - box.left + TEXT_GAP : 0;
      const targetW = Math.max(320, Math.min(MAX_LOGO_W, w - EDGE_MARGIN - textRight, w * 0.62));
      logo.scale.setScalar(targetW / RAW.w);
      logo.position.set(w - EDGE_MARGIN - targetW / 2 - w / 2, -h * 0.02, 0);
    };
    layout();

    // Decorative tilt towards the pointer, smoothed like a soft spring
    const tilt = { x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      tilt.tx = (e.clientX / window.innerWidth) * 2 - 1;
      tilt.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onLeave = () => { tilt.tx = 0; tilt.ty = 0; };

    const swing = (x: number, y: number, angle: number, out: number[]) => {
      const dx = x - SPINE.x, dy = y - SPINE.y, c = Math.cos(angle), s = Math.sin(angle);
      out[0] = SPINE.x + dx * c - dy * s;
      out[1] = SPINE.y + dx * s + dy * c;
    };

    const tmp = [0, 0];
    const lastPage = PAGE_START + (PAGES - 1) * PAGE_GAP + PAGE_DUR;
    const start = performance.now();
    let last = start;
    let raf = 0;

    const frame = (now: number) => {
      const ms = reduce ? 1e6 : now - start;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const open = easeInOut(clamp01((ms - OPEN[0]) / (OPEN[1] - OPEN[0])));

      for (let i = 0; i < n; i++) {
        const d = dots[i];
        let x = d.x, y = d.y, a = 1, s = 3.4;
        let c = ink;
        if (d.kind === LEFT || d.kind === COVER) {
          // Appear in place, column by column from the spine: small scale-up with the fade, never from zero
          const t = easeOut(clamp01((ms - BUILD.start - d.col * BUILD.perColumn) / BUILD.dur));
          a = t;
          s = 3.4 * (0.6 + 0.4 * t);
          if (d.kind === COVER) { swing(d.x, d.y, -Math.PI * (1 - open), tmp); x = tmp[0]; y = tmp[1]; }
        } else if (d.kind === PAGE) {
          const t = easeInOut(clamp01((ms - PAGE_START - d.page * PAGE_GAP) / PAGE_DUR));
          swing(d.x, d.y, -Math.PI * (1 - t), tmp);
          x = tmp[0]; y = tmp[1];
          // Turning pages are a lighter weight, and fold into the open book once they land
          a = ms < PAGE_START ? 0 : 0.35 * (1 - clamp01((ms - lastPage + 150) / 300));
        } else {
          // The roof is raised from the open pages, centre first
          const t = easeOut(clamp01((ms - RAISE.start - d.col * RAISE.perColumn) / RAISE.dur));
          y = d.y + RAISE.rise * (1 - t);
          a = t;
          c = brand;
        }
        pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = d.z;
        col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
        alpha[i] = a;
        size[i] = s;
      }
      geo.attributes.position.needsUpdate = true;
      geo.attributes.aColor.needsUpdate = true;
      geo.attributes.aAlpha.needsUpdate = true;
      geo.attributes.aSize.needsUpdate = true;

      // From a three-quarter view to a near-frontal rest pose with a hint of depth
      const turn = easeInOut(clamp01((ms - TURN[0]) / (TURN[1] - TURN[0])));
      tilt.vx += ((tilt.tx - tilt.x) * 60 - tilt.vx * 12) * dt;
      tilt.vy += ((tilt.ty - tilt.y) * 60 - tilt.vy * 12) * dt;
      tilt.x += tilt.vx * dt;
      tilt.y += tilt.vy * dt;
      logo.rotation.x = 0.62 * (1 - turn) + turn * (0.12 + tilt.y * 0.08);
      logo.rotation.y = -0.5 * (1 - turn) + turn * (-0.1 + tilt.x * 0.16);

      renderer.render(scene, camera);
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onResize = () => { layout(); if (reduce) requestAnimationFrame(frame); };
    const themeObserver = new MutationObserver(() => { applyTheme(); if (reduce) requestAnimationFrame(frame); });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}
