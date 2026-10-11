"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* The Tealis mark as a living 3D cloud of dots — knowledge builds.
   Intro: the dots gather into a closed book; the cover swings open on the spine and pages riffle
   after it; sparks rise from the open pages and BUILD the roof (training → development).
   Afterwards the mark stays alive: sparks keep drifting from the pages to the roof, a page turns now
   and then, and the dots shy away from the pointer and spring back. Raw logo units (1263 × 541). */

const ROOF =
  "M 297.089844 616.949219 L 688.203125 342.449219 C 729.375 319.574219 770.542969 319.574219 811.710938 342.449219 L 1202.824219 616.949219 L 1106.761719 616.949219 L 832.296875 493.425781 C 777.40625 470.550781 722.511719 470.550781 667.617188 493.425781 L 393.152344 616.949219 Z";
const BOOK_LEFT =
  "M 228.476562 713.023438 L 708.789062 713.023438 C 727.085938 713.023438 738.523438 724.460938 743.097656 747.335938 L 749.957031 795.375 L 749.957031 850.28 C 731.66 850.28 713.365 841.125 695.066406 822.824219 C 676.765625 804.523438 644.746094 795.375 599.003906 795.375 L 118.6875 795.375 Z";
const BOOK_RIGHT =
  "M 749.957031 795.375 L 756.820312 747.335938 C 761.394531 724.460938 772.832031 713.023438 791.128906 713.023438 L 1271.441406 713.023438 L 1381.226562 795.375 L 900.914062 795.375 C 855.167969 795.375 823.148438 804.523438 804.851562 822.824219 C 786.55 841.125 768.25 850.28 749.957031 850.28 Z";

const RAW = { cx: 749.957, cy: 589.5, w: 1263, minX: 110, maxX: 1390, minY: 315, maxY: 860 };
const SPINE = { x: 749.957, y: 713.023 };
const PAGE_DEPTH = 180;
const ROOF_DEPTH = 45;
const STEP = 15;
const MAX_LOGO_W = 800;
const EDGE_MARGIN = 48;
const TEXT_GAP = 56;
const PAGES = 4;
const SPARKS = 46; // ambient sparks after the intro

// Intro timeline (ms)
const T = { gather: [0, 1000], open: [900, 2300], turn: [500, 4200] };
const PAGE_START = 1200;
const PAGE_GAP = 220;
const PAGE_DUR = 1100;
const ROOF_START = 1500; // roof dots start leaving the pages
const ROOF_SPREAD = 1600; // over this window, in order from the spine outwards
const ROOF_FLIGHT = 1100;
const INTRO_END = ROOF_START + ROOF_SPREAD + ROOF_FLIGHT;
const IDLE_FLIP_EVERY = 6500;
const IDLE_FLIP_DUR = 1500;

const clamp01 = (t: number) => Math.min(Math.max(t, 0), 1);
const phase = (ms: number, [a, b]: number[]) => clamp01((ms - a) / (b - a));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const rand = (a: number, b: number) => a + Math.random() * (b - a);

// Dot roles: left half of the book, cover (right half), roof, riffle page, ambient spark
const LEFT = 0, COVER = 1, ROOFK = 2, PAGE = 3, SPARK = 4;
type Dot = {
  kind: number;
  hx: number; hy: number; hz: number; // home (logo) position
  sx: number; sy: number; sz: number; // scatter offset for the gather
  fx: number; fy: number; fz: number; // where a roof dot leaves the pages
  delay: number; page: number;
  px: number; py: number; pz: number; // current (spring) position
  vx: number; vy: number; vz: number;
};

function sampleDots(): Dot[] {
  const c = document.createElement("canvas").getContext("2d")!;
  const paths = { left: new Path2D(BOOK_LEFT), right: new Path2D(BOOK_RIGHT), roof: new Path2D(ROOF) };
  const dots: Dot[] = [];
  const pageTops: { x: number; y: number }[] = [];
  const add = (kind: number, x: number, y: number, z: number, page = -1) =>
    dots.push({
      kind, hx: x, hy: y, hz: z, page, delay: 0,
      sx: rand(-1300, 1300), sy: rand(-900, 900), sz: rand(-800, 800),
      fx: x, fy: y, fz: z, px: x, py: y, pz: z, vx: 0, vy: 0, vz: 0,
    });
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
      pageTops.push({ x, y: topBook });
      const side = x < SPINE.x ? LEFT : COVER;
      for (let z = STEP * 2; z <= PAGE_DEPTH; z += STEP * 2) add(side, x, topBook, -z);
      if (x > SPINE.x + STEP) for (let k = 0; k < PAGES; k++) for (let z = STEP; z <= PAGE_DEPTH; z += STEP * 2) add(PAGE, x, SPINE.y, -z, k);
    }
    if (topRoof < Infinity) for (let z = STEP; z <= ROOF_DEPTH; z += STEP) add(ROOFK, x, topRoof, -z);
  }
  // Each roof dot is born on the open pages under its own column, and flies up in order from the spine
  for (const d of dots) {
    if (d.kind !== ROOFK) continue;
    const near = pageTops.reduce((b, p) => (Math.abs(p.x - d.hx) < Math.abs(b.x - d.hx) ? p : b), pageTops[0]);
    d.fx = near.x + rand(-60, 60);
    d.fy = near.y;
    d.fz = rand(-PAGE_DEPTH, 0);
    d.delay = ROOF_START + (Math.abs(d.hx - SPINE.x) / 640) * ROOF_SPREAD + rand(-120, 120);
  }
  for (let i = 0; i < SPARKS; i++) add(SPARK, SPINE.x, SPINE.y, 0);
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
    // Depth cue: dots further back fade a little
    float depth = clamp((-mv.z - uScale * 0.95) / (uScale * 0.25), 0.0, 1.0);
    vAlpha = aAlpha * (1.0 - 0.45 * depth);
    vColor = aColor;
  }
`;
const FRAG = /* glsl */ `
  uniform float uGlow;
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.36, r);
    float halo = uGlow * smoothstep(0.5, 0.0, r) * 0.35;
    float a = (core + halo) * vAlpha;
    if (a < 0.02) discard;
    gl_FragColor = vec4(vColor, a);
    #include <colorspace_fragment>
  }
`;

function cssColor(name: string, fallback: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}
const isDark = () =>
  document.documentElement.getAttribute("data-theme") === "dark" ||
  (!document.documentElement.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);

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
      uniforms: { uScale: { value: 1 }, uGlow: { value: 0 } },
    });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;

    const ink = new THREE.Color();
    const brand = new THREE.Color();
    const applyTheme = () => {
      ink.set(cssColor("--text-primary", "#22252A"));
      brand.set(cssColor("--color-brand", "#4A86E8"));
      const dark = isDark();
      mat.uniforms.uGlow.value = dark ? 1 : 0;
      mat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      mat.needsUpdate = true;
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

    // Pointer, projected onto the logo's face plane in raw units
    const ndc = new THREE.Vector2(9, 9);
    const ray = new THREE.Raycaster();
    const plane = new THREE.Plane();
    const normal = new THREE.Vector3();
    const origin = new THREE.Vector3();
    const hit = new THREE.Vector3();
    const local = new THREE.Vector3(9999, 9999, 0);
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      const r = renderer.domElement.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      tilt.tx = (e.clientX / window.innerWidth) * 2 - 1;
      tilt.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onLeave = () => { ndc.set(9, 9); tilt.tx = 0; tilt.ty = 0; };

    // Sparks: drift from a random spot on the open pages up to a random roof dot
    const roofDots = dots.filter((d) => d.kind === ROOFK);
    const sparkState = dots.filter((d) => d.kind === SPARK).map(() => ({ born: 0, life: 0, fx: 0, fy: 0, fz: 0, tx: 0, ty: 0, tz: 0 }));
    const respawn = (s: (typeof sparkState)[number], ms: number) => {
      const t = roofDots[Math.floor(Math.random() * roofDots.length)];
      s.born = ms + rand(0, 2500);
      s.life = rand(1800, 3200);
      s.fx = rand(240, 1260); s.fy = SPINE.y; s.fz = rand(-PAGE_DEPTH, 0);
      s.tx = t.hx; s.ty = t.hy; s.tz = t.hz;
    };

    const swing = (x: number, y: number, angle: number, out: number[]) => {
      const dx = x - SPINE.x, dy = y - SPINE.y, c = Math.cos(angle), s = Math.sin(angle);
      out[0] = SPINE.x + dx * c - dy * s;
      out[1] = SPINE.y + dx * s + dy * c;
    };

    const tmp = [0, 0];
    const target = [0, 0, 0];
    const start = performance.now();
    let last = start;
    let raf = 0;
    let sparksReady = false;
    const lastPage = PAGE_START + (PAGES - 1) * PAGE_GAP + PAGE_DUR;

    const frame = (now: number) => {
      const ms = reduce ? 1e6 : now - start;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;

      // Pointer in raw logo space
      logo.updateMatrixWorld();
      ray.setFromCamera(ndc, camera);
      normal.set(0, 0, 1).transformDirection(logo.matrixWorld);
      origin.setFromMatrixPosition(logo.matrixWorld);
      plane.setFromNormalAndCoplanarPoint(normal, origin);
      if (ndc.x < 5 && ray.ray.intersectPlane(plane, hit)) local.copy(inner.worldToLocal(hit));
      else local.set(9999, 9999, 0);

      const gather = easeOutCubic(phase(ms, T.gather));
      const open = easeInOutCubic(phase(ms, T.open));
      // After the intro, one page turns now and then
      const idleT = ms > INTRO_END ? (ms - INTRO_END) % IDLE_FLIP_EVERY : -1;
      const idleFlip = idleT >= 0 && idleT < IDLE_FLIP_DUR ? easeInOutCubic(idleT / IDLE_FLIP_DUR) : -1;
      if (!sparksReady && ms > INTRO_END - 600) {
        sparkState.forEach((s) => respawn(s, ms));
        sparksReady = true;
      }

      let si = 0;
      for (let i = 0; i < n; i++) {
        const d = dots[i];
        let a = 1, sz = 3.6;
        let r = brand.r, g = brand.g, b = brand.b;
        if (d.kind === LEFT || d.kind === COVER) {
          target[0] = d.hx; target[1] = d.hy; target[2] = d.hz;
          if (d.kind === COVER) { swing(d.hx, d.hy, -Math.PI * (1 - open), tmp); target[0] = tmp[0]; target[1] = tmp[1]; }
          target[0] += d.sx * (1 - gather); target[1] += d.sy * (1 - gather); target[2] += d.sz * (1 - gather);
          a = gather; r = ink.r; g = ink.g; b = ink.b;
        } else if (d.kind === PAGE) {
          let t = clamp01((ms - PAGE_START - d.page * PAGE_GAP) / PAGE_DUR);
          a = ms < PAGE_START ? 0 : 0.42 * (1 - phase(ms, [lastPage - 150, lastPage + 250]));
          if (d.page === 0 && idleFlip >= 0) {
            // The idle page lifts from the right half and lays down on the left
            t = 1 - idleFlip;
            a = 0.4 * Math.sin(Math.PI * idleFlip);
          }
          swing(d.hx, d.hy, -Math.PI * (1 - easeInOutCubic(t)), tmp);
          target[0] = tmp[0]; target[1] = tmp[1]; target[2] = d.hz;
          r = ink.r; g = ink.g; b = ink.b;
        } else if (d.kind === ROOFK) {
          // Born on the pages, rising along an arc, turning from ink to blue
          const f = easeInOutCubic(clamp01((ms - d.delay) / ROOF_FLIGHT));
          const arc = Math.sin(Math.PI * f) * 120;
          target[0] = d.fx + (d.hx - d.fx) * f;
          target[1] = d.fy + (d.hy - d.fy) * f - arc;
          target[2] = d.fz + (d.hz - d.fz) * f;
          a = ms < d.delay ? 0 : Math.min(1, (ms - d.delay) / 250);
          r = ink.r + (brand.r - ink.r) * f; g = ink.g + (brand.g - ink.g) * f; b = ink.b + (brand.b - ink.b) * f;
          sz = 3.6 + 2.4 * Math.sin(Math.PI * f);
          if (ms < d.delay) { d.px = d.fx; d.py = d.fy; d.pz = d.fz; d.vx = d.vy = d.vz = 0; }
        } else {
          // Ambient spark
          const s = sparkState[si++];
          if (!sparksReady || ms < s.born) {
            a = 0;
            target[0] = s.fx; target[1] = s.fy; target[2] = s.fz;
            d.px = s.fx; d.py = s.fy; d.pz = s.fz; d.vx = d.vy = d.vz = 0;
          } else {
            if (ms > s.born + s.life) respawn(s, ms);
            const f = clamp01((ms - s.born) / s.life);
            const e = easeInOutCubic(f);
            target[0] = s.fx + (s.tx - s.fx) * e;
            target[1] = s.fy + (s.ty - s.fy) * e - Math.sin(Math.PI * e) * 160;
            target[2] = s.fz + (s.tz - s.fz) * e;
            a = 0.75 * Math.sin(Math.PI * f);
            sz = 3.2;
          }
        }

        // Pointer: dots on the face shy away, then spring home
        if (d.kind !== SPARK) {
          const dx = d.px - local.x, dy = d.py - local.y;
          const dist2 = dx * dx + dy * dy;
          const R = 140;
          if (dist2 < R * R) {
            const dist = Math.sqrt(dist2) || 1;
            const push = (1 - dist / R) * 2600 * dt;
            d.vx += (dx / dist) * push;
            d.vy += (dy / dist) * push;
            d.vz += push * 0.6;
          }
        }
        if (reduce) { d.px = target[0]; d.py = target[1]; d.pz = target[2]; }
        else {
          d.vx += (target[0] - d.px) * 120 * dt; d.vy += (target[1] - d.py) * 120 * dt; d.vz += (target[2] - d.pz) * 120 * dt;
          const damp = Math.exp(-11 * dt);
          d.vx *= damp; d.vy *= damp; d.vz *= damp;
          d.px += d.vx * dt; d.py += d.vy * dt; d.pz += d.vz * dt;
        }
        pos[i * 3] = d.px; pos[i * 3 + 1] = d.py; pos[i * 3 + 2] = d.pz;
        col[i * 3] = r; col[i * 3 + 1] = g; col[i * 3 + 2] = b;
        alpha[i] = a;
        size[i] = sz;
      }
      geo.attributes.position.needsUpdate = true;
      geo.attributes.aColor.needsUpdate = true;
      geo.attributes.aAlpha.needsUpdate = true;
      geo.attributes.aSize.needsUpdate = true;

      // From a high three-quarter view to a near-frontal rest pose that still shows the depth
      const turn = easeInOutCubic(phase(ms, T.turn));
      tilt.x += (tilt.tx - tilt.x) * 0.05;
      tilt.y += (tilt.ty - tilt.y) * 0.05;
      const idle = ms > T.turn[1] ? Math.sin((ms - T.turn[1]) / 1900) * 0.05 : 0;
      logo.rotation.x = 0.75 * (1 - turn) + turn * (0.18 + tilt.y * 0.12);
      logo.rotation.y = -0.6 * (1 - turn) + turn * (-0.14 + tilt.x * 0.3 + idle);

      renderer.render(scene, camera);
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    // Start every dot at its gather point so nothing flies in from the origin
    for (const d of dots) { d.px = d.hx + d.sx; d.py = d.hy + d.sy; d.pz = d.hz + d.sz; }
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
