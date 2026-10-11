"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

/* The Tealis mark in 3D, built from the exact logo paths (raw logo coordinates, 1263 × 541).
   Intro: the outlines draw in, the faces fill, the book opens on its spine, the roof lands on it,
   and the mark turns to face the visitor. Afterwards it tilts gently towards the pointer. */

const ROOF =
  "M 297.089844 616.949219 L 688.203125 342.449219 C 729.375 319.574219 770.542969 319.574219 811.710938 342.449219 L 1202.824219 616.949219 L 1106.761719 616.949219 L 832.296875 493.425781 C 777.40625 470.550781 722.511719 470.550781 667.617188 493.425781 L 393.152344 616.949219 Z";
// The book split on its spine (x = 749.957), so the cover can swing open around it
const BOOK_LEFT =
  "M 228.476562 713.023438 L 708.789062 713.023438 C 727.085938 713.023438 738.523438 724.460938 743.097656 747.335938 L 749.957031 795.375 L 749.957031 850.28 C 731.66 850.28 713.365 841.125 695.066406 822.824219 C 676.765625 804.523438 644.746094 795.375 599.003906 795.375 L 118.6875 795.375 Z";
const BOOK_RIGHT =
  "M 749.957031 795.375 L 756.820312 747.335938 C 761.394531 724.460938 772.832031 713.023438 791.128906 713.023438 L 1271.441406 713.023438 L 1381.226562 795.375 L 900.914062 795.375 C 855.167969 795.375 823.148438 804.523438 804.851562 822.824219 C 786.55 841.125 768.25 850.28 749.957031 850.28 Z";

const RAW = { cx: 749.957, cy: 589.5, w: 1263 };
const SPINE = { x: 749.957, y: 713.023 };
const ROOF_CENTER = { x: 749.957, y: 470 };
const DEPTH = 70; // extrusion, raw units
const MAX_LOGO_W = 820;
const EDGE_MARGIN = 48;
const TEXT_GAP = 56;

// Intro timeline (ms)
const T = { lines: [0, 1100], faces: [700, 1700], open: [900, 2200], roof: [1700, 2800], turn: [600, 3400] };

const clamp01 = (t: number) => Math.min(Math.max(t, 0), 1);
const phase = (ms: number, [a, b]: number[]) => clamp01((ms - a) / (b - a));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutBack = (t: number) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);

function shapesOf(d: string) {
  const data = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`);
  return data.paths.flatMap((p) => SVGLoader.createShapes(p));
}

function cssColor(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

/** One extruded logo piece: flat exact colour on the face, lit sides for depth, and its outline. */
function piece(d: string, faceMat: THREE.Material, sideMat: THREE.Material, lineMat: THREE.LineBasicMaterial) {
  const geo = new THREE.ExtrudeGeometry(shapesOf(d), { depth: DEPTH, bevelEnabled: false, curveSegments: 24 });
  const mesh = new THREE.Mesh(geo, [faceMat, sideMat]);
  const edges = new THREE.EdgesGeometry(geo, 25);
  const lines = new THREE.LineSegments(edges, lineMat);
  const group = new THREE.Group();
  group.add(mesh, lines);
  return { group, edges, total: edges.attributes.position.count };
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
    scene.add(new THREE.AmbientLight(0xffffff, 1.1));
    const sun = new THREE.DirectionalLight(0xffffff, 1.6);
    sun.position.set(-0.6, 1, 1.2);
    scene.add(sun);

    // Materials (recoloured on theme change)
    const roofFace = new THREE.MeshBasicMaterial({ transparent: true });
    const roofSide = new THREE.MeshLambertMaterial({ transparent: true });
    const bookFace = new THREE.MeshBasicMaterial({ transparent: true });
    const bookSide = new THREE.MeshLambertMaterial({ transparent: true });
    const roofLine = new THREE.LineBasicMaterial({ transparent: true });
    const bookLine = new THREE.LineBasicMaterial({ transparent: true });
    const applyTheme = () => {
      const brand = new THREE.Color(cssColor("--color-brand", "#4A86E8"));
      const ink = new THREE.Color(cssColor("--text-primary", "#22252A"));
      const dark = document.documentElement.getAttribute("data-theme") === "dark" ||
        (!document.documentElement.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
      roofFace.color.copy(brand);
      roofSide.color.copy(brand).multiplyScalar(0.62);
      bookFace.color.copy(ink);
      bookSide.color.copy(ink).multiplyScalar(dark ? 0.55 : 1.9);
      roofLine.color.copy(brand).multiplyScalar(dark ? 1 : 0.8);
      bookLine.color.copy(ink);
    };
    applyTheme();

    // Logo in raw coordinates: y flipped (SVG grows downward), centred on the mark
    const logo = new THREE.Group();
    const inner = new THREE.Group();
    inner.scale.set(1, -1, 1);
    inner.position.set(-RAW.cx, RAW.cy, -DEPTH / 2);
    logo.add(inner);

    const left = piece(BOOK_LEFT, bookFace, bookSide, bookLine);
    const right = piece(BOOK_RIGHT, bookFace, bookSide, bookLine);
    const roof = piece(ROOF, roofFace, roofSide, roofLine);
    inner.add(left.group);
    // The cover swings around the spine axis (perpendicular to the face, through the book's top edge)
    const cover = new THREE.Group();
    cover.position.set(SPINE.x, SPINE.y, 0);
    right.group.position.set(-SPINE.x, -SPINE.y, 0);
    cover.add(right.group);
    inner.add(cover);
    const roofPivot = new THREE.Group();
    roofPivot.position.set(ROOF_CENTER.x, ROOF_CENTER.y, 0);
    roof.group.position.set(-ROOF_CENTER.x, -ROOF_CENTER.y, 0);
    roofPivot.add(roof.group);
    inner.add(roofPivot);
    scene.add(logo);

    // Layout: right of the hero text, as large as fits
    let w = 0, h = 0;
    const layout = () => {
      w = host.clientWidth;
      h = host.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // 1 world unit = 1 CSS pixel on the z = 0 plane
      camera.position.set(0, 0, h / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
      camera.updateProjectionMatrix();
      const text = document.querySelector("[data-particle-avoid]")?.getBoundingClientRect();
      const hostBox = host.getBoundingClientRect();
      const textRight = text ? text.right - hostBox.left + TEXT_GAP : 0;
      const targetW = Math.max(320, Math.min(MAX_LOGO_W, w - EDGE_MARGIN - textRight, w * 0.62));
      const s = targetW / RAW.w;
      logo.scale.setScalar(s);
      const cx = w - EDGE_MARGIN - targetW / 2;
      logo.position.set(cx - w / 2, -h * 0.02, 0);
    };
    layout();

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onLeave = () => { pointer.tx = 0; pointer.ty = 0; };

    const start = performance.now();
    let raf = 0;
    const frame = (now: number) => {
      const ms = reduce ? 1e6 : now - start;

      // 1. Outlines draw in
      const lp = easeOutCubic(phase(ms, T.lines));
      for (const p of [left, right, roof]) p.edges.setDrawRange(0, Math.floor(p.total * lp));
      // 2. Faces fill in behind the lines
      const fp = easeInOutCubic(phase(ms, T.faces));
      for (const m of [roofFace, roofSide, bookFace, bookSide]) m.opacity = fp;
      for (const m of [roofLine, bookLine]) m.opacity = 1 - 0.65 * fp;
      // 3. The book opens: the cover swings 180° around the spine
      const op = easeInOutCubic(phase(ms, T.open));
      cover.rotation.z = Math.PI * (1 - op);
      cover.position.z = 6 * (1 - op); // keeps the closed cover off the page's plane (no z-fighting)
      // 4. The roof lands on the open book
      const rp = phase(ms, T.roof);
      roofPivot.position.y = ROOF_CENTER.y - 420 * (1 - easeOutBack(rp));
      roofPivot.rotation.x = 0.9 * (1 - easeOutCubic(rp));
      roof.group.visible = rp > 0;
      // 5. The whole mark turns from a three-quarter view to face the visitor, then follows the pointer
      const tp = easeInOutCubic(phase(ms, T.turn));
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const idle = ms > T.turn[1] ? Math.sin((ms - T.turn[1]) / 1800) * 0.04 : 0;
      // Rest pose stays slightly three-quarter so the depth of the mark remains visible
      logo.rotation.y = -0.75 * (1 - tp) + tp * (-0.24 + pointer.x * 0.28 + idle);
      logo.rotation.x = 0.55 * (1 - tp) + tp * (0.16 + pointer.y * 0.16);

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
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.LineSegments) o.geometry.dispose();
      });
      [roofFace, roofSide, bookFace, bookSide, roofLine, bookLine].forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}
