"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* The Tealis mark as a 3D cloud of dots. The front face is the exact logo; behind it the book has
   real page depth. Intro: the dots gather into a closed book, the cover swings open on the spine
   with a few pages riffling after it, the roof settles on top, and the mark turns to face the
   visitor at a gentle three-quarter angle, then tilts towards the pointer. Raw logo units. */

const ROOF =
  "M 297.089844 616.949219 L 688.203125 342.449219 C 729.375 319.574219 770.542969 319.574219 811.710938 342.449219 L 1202.824219 616.949219 L 1106.761719 616.949219 L 832.296875 493.425781 C 777.40625 470.550781 722.511719 470.550781 667.617188 493.425781 L 393.152344 616.949219 Z";
const BOOK_LEFT =
  "M 228.476562 713.023438 L 708.789062 713.023438 C 727.085938 713.023438 738.523438 724.460938 743.097656 747.335938 L 749.957031 795.375 L 749.957031 850.28 C 731.66 850.28 713.365 841.125 695.066406 822.824219 C 676.765625 804.523438 644.746094 795.375 599.003906 795.375 L 118.6875 795.375 Z";
const BOOK_RIGHT =
  "M 749.957031 795.375 L 756.820312 747.335938 C 761.394531 724.460938 772.832031 713.023438 791.128906 713.023438 L 1271.441406 713.023438 L 1381.226562 795.375 L 900.914062 795.375 C 855.167969 795.375 823.148438 804.523438 804.851562 822.824219 C 786.55 841.125 768.25 850.28 749.957031 850.28 Z";

const RAW = { cx: 749.957, cy: 589.5, w: 1263, minX: 110, maxX: 1390, minY: 315, maxY: 860 };
const SPINE = { x: 749.957, y: 713.023 };
const PAGE_DEPTH = 180; // how far the pages run back from the logo face
const ROOF_DEPTH = 48;
const STEP = 15; // dot spacing, raw units
const MAX_LOGO_W = 800;
const EDGE_MARGIN = 48;
const TEXT_GAP = 56;
const PAGES = 4;

// Intro timeline (ms)
const T = { gather: [0, 1000], open: [950, 2350], roof: [2150, 3150], turn: [500, 3500] };
const PAGE_START = 1250;
const PAGE_GAP = 170;
const PAGE_DUR = 1150;

const clamp01 = (t: number) => Math.min(Math.max(t, 0), 1);
const phase = (ms: number, [a, b]: number[]) => clamp01((ms - a) / (b - a));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type Kind = 0 | 1 | 2 | 3; // left half, cover (right half), roof, riffle page
type Dot = { x: number; y: number; z: number; kind: Kind; page: number; sx: number; sy: number; sz: number };

/** Sample the logo: front faces on a grid, page surfaces running back from the top edge, roof depth. */
function sampleDots(): Dot[] {
  const c = document.createElement("canvas").getContext("2d")!;
  const paths = { left: new Path2D(BOOK_LEFT), right: new Path2D(BOOK_RIGHT), roof: new Path2D(ROOF) };
  const dots: Dot[] = [];
  const add = (x: number, y: number, z: number, kind: Kind, page = -1) => {
    dots.push({ x, y, z, kind, page, sx: (Math.random() - 0.5) * 2600, sy: (Math.random() - 0.5) * 1800, sz: (Math.random() - 0.5) * 1600 });
  };
  // Grid aligned on the spine so both halves are mirror images
  const x0 = SPINE.x - Math.ceil((SPINE.x - RAW.minX) / STEP) * STEP;
  for (let x = x0; x <= RAW.maxX; x += STEP) {
    let topBook = Infinity;
    let topRoof = Infinity;
    for (let y = RAW.minY; y <= RAW.maxY; y += STEP) {
      if (c.isPointInPath(paths.roof, x, y)) { add(x, y, 0, 2); topRoof = Math.min(topRoof, y); continue; }
      const side: Kind | null = c.isPointInPath(paths.left, x, y) ? 0 : c.isPointInPath(paths.right, x, y) ? 1 : null;
      if (side === null) continue;
      add(x, y, 0, side);
      topBook = Math.min(topBook, y);
    }
    // Pages: the open book's surface runs back from the top edge of each column
    if (topBook < Infinity) {
      const side: Kind = x < SPINE.x ? 0 : 1;
      for (let z = STEP * 2; z <= PAGE_DEPTH; z += STEP * 2) add(x, topBook, -z, side);
      // Riffle pages: thin sheets of the right half that turn after the cover
      if (x > SPINE.x + STEP) {
        for (let k = 0; k < PAGES; k++) {
          for (let z = STEP; z <= PAGE_DEPTH; z += STEP * 2) add(x, SPINE.y, -z, 3, k);
        }
      }
    }
    // The roof's top edge gets a little depth, like the hat's brim
    if (topRoof < Infinity) for (let z = STEP; z <= ROOF_DEPTH; z += STEP) add(x, topRoof, -z, 2);
  }
  return dots;
}

/** Soft round dot sprite */
function dotTexture() {
  const s = 64;
  const cv = document.createElement("canvas");
  cv.width = cv.height = s;
  const g = cv.getContext("2d")!;
  g.fillStyle = "#fff";
  g.beginPath();
  g.arc(s / 2, s / 2, s / 2 - 2, 0, Math.PI * 2);
  g.fill();
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

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
    const camera = new THREE.PerspectiveCamera(32, 1, 10, 20000);

    // One Points object per role so each can carry its own colour and opacity
    const all = sampleDots();
    const tex = dotTexture();
    const makeCloud = (filter: (d: Dot) => boolean) => {
      const dots = all.filter(filter);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(dots.length * 3), 3));
      const mat = new THREE.PointsMaterial({ size: 11, map: tex, transparent: true, alphaTest: 0.2, depthWrite: false, sizeAttenuation: true });
      return { dots, geo, mat, pts: new THREE.Points(geo, mat) };
    };
    const book = makeCloud((d) => d.kind === 0 || d.kind === 1);
    const roof = makeCloud((d) => d.kind === 2);
    const pages = makeCloud((d) => d.kind === 3);

    const applyTheme = () => {
      const ink = new THREE.Color(cssColor("--text-primary", "#22252A"));
      const brand = new THREE.Color(cssColor("--color-brand", "#4A86E8"));
      book.mat.color.copy(ink);
      pages.mat.color.copy(ink);
      roof.mat.color.copy(brand);
    };
    applyTheme();

    // Logo space: raw coordinates, y flipped, centred on the mark
    const logo = new THREE.Group();
    const inner = new THREE.Group();
    inner.scale.set(1, -1, 1);
    inner.position.set(-RAW.cx, RAW.cy, PAGE_DEPTH / 3);
    inner.add(book.pts, roof.pts, pages.pts);
    logo.add(inner);
    scene.add(logo);

    const layout = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.set(0, 0, h / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))); // 1 unit = 1px at z = 0
      camera.updateProjectionMatrix();
      const text = document.querySelector("[data-particle-avoid]")?.getBoundingClientRect();
      const box = host.getBoundingClientRect();
      const textRight = text ? text.right - box.left + TEXT_GAP : 0;
      const targetW = Math.max(320, Math.min(MAX_LOGO_W, w - EDGE_MARGIN - textRight, w * 0.62));
      logo.scale.setScalar(targetW / RAW.w);
      logo.position.set(w - EDGE_MARGIN - targetW / 2 - w / 2, -h * 0.02, 0);
    };
    layout();

    // Rotate a raw point around the spine axis (parallel to z). Negative angles lift the cover up and over.
    const p = [0, 0, 0];
    const swing = (d: Dot, angle: number) => {
      const dx = d.x - SPINE.x, dy = d.y - SPINE.y;
      const c = Math.cos(angle), s = Math.sin(angle);
      p[0] = SPINE.x + dx * c - dy * s;
      p[1] = SPINE.y + dx * s + dy * c;
      p[2] = d.z;
    };

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onLeave = () => { pointer.tx = 0; pointer.ty = 0; };

    const write = (cloud: typeof book, ms: number) => {
      const arr = cloud.geo.attributes.position.array as Float32Array;
      const gather = easeOutCubic(phase(ms, T.gather));
      const open = easeInOutCubic(phase(ms, T.open));
      const roofIn = easeOutCubic(phase(ms, T.roof));
      cloud.dots.forEach((d, i) => {
        if (d.kind === 1) swing(d, -Math.PI * (1 - open));
        else if (d.kind === 3) swing(d, -Math.PI * (1 - easeInOutCubic(clamp01((ms - PAGE_START - d.page * PAGE_GAP) / PAGE_DUR))));
        else if (d.kind === 2) { p[0] = d.x; p[1] = d.y - 380 * (1 - roofIn); p[2] = d.z; }
        else { p[0] = d.x; p[1] = d.y; p[2] = d.z; }
        // The book's dots gather from a loose cloud; the roof's arrive with their own fall
        const g = d.kind === 2 ? roofIn : gather;
        arr[i * 3] = p[0] + d.sx * (1 - g);
        arr[i * 3 + 1] = p[1] + d.sy * (1 - g);
        arr[i * 3 + 2] = p[2] + d.sz * (1 - g);
      });
      cloud.geo.attributes.position.needsUpdate = true;
    };

    const lastPage = PAGE_START + (PAGES - 1) * PAGE_GAP + PAGE_DUR;
    const start = performance.now();
    let raf = 0;
    const frame = (now: number) => {
      const ms = reduce ? 1e6 : now - start;
      write(book, ms);
      write(roof, ms);
      write(pages, ms);
      book.mat.opacity = easeOutCubic(phase(ms, [0, 600]));
      roof.mat.opacity = easeOutCubic(phase(ms, [T.roof[0], T.roof[0] + 500]));
      // Turning pages are lighter; once they lie flat they merge into the open book
      pages.mat.opacity = ms < PAGE_START ? 0 : 0.45 * (1 - phase(ms, [lastPage - 200, lastPage + 300]));

      const turn = easeInOutCubic(phase(ms, T.turn));
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const idle = ms > T.turn[1] ? Math.sin((ms - T.turn[1]) / 1900) * 0.05 : 0;
      // From a high three-quarter view to a gentle one that still shows the pages' depth
      logo.rotation.x = 0.75 * (1 - turn) + turn * (0.2 + pointer.y * 0.12);
      logo.rotation.y = -0.6 * (1 - turn) + turn * (-0.16 + pointer.x * 0.3 + idle);

      renderer.render(scene, camera);
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onResize = () => { layout(); if (reduce) renderer.render(scene, camera); };
    const themeObserver = new MutationObserver(() => { applyTheme(); if (reduce) renderer.render(scene, camera); });
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
      for (const c of [book, roof, pages]) { c.geo.dispose(); c.mat.dispose(); }
      tex.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}
