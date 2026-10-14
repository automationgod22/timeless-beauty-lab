// Desktop cursor: a skincare serum dropper at the pointer, trailing a ribbon of liquid gold
// that sheds small serum drops as it moves. Touch devices and reduced-motion users keep the normal cursor.

type Pt = { x: number; y: number; t: number };
type Drop = { x: number; y: number; vx: number; vy: number; r: number; t: number };

const TRAIL_LIFE = 560; // ms a point of the ribbon stays visible
const DROP_LIFE = 950; // ms a falling drop stays visible
const DROP_EVERY = 85; // px of travel between drops

const hexToRgb = (hex: string) => {
  const h = hex.replace('#', '').trim();
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

export function initCursor(root: HTMLElement) {
  const cur = document.getElementById('cursor');
  const label = cur?.querySelector('b');
  const canvas = document.getElementById('cursor-trail') as HTMLCanvasElement | null;
  const ctx = canvas?.getContext('2d');
  if (!cur || !label || !canvas || !ctx) return;
  root.classList.add('has-cursor');

  let W = 0, H = 0;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const size = () => {
    W = innerWidth; H = innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  size();
  addEventListener('resize', size);

  let rgb = [165, 130, 74];
  const readGold = () => {
    const g = getComputedStyle(root).getPropertyValue('--gold');
    if (g) rgb = hexToRgb(g);
  };
  readGold();
  new MutationObserver(() => requestAnimationFrame(readGold)).observe(root, { attributes: true, attributeFilter: ['data-mode'] });
  const gold = (a: number) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;

  const pts: Pt[] = [];
  const drops: Drop[] = [];
  let running = false, lastX = -1, lastY = -1, travel = 0;

  const frame = (now: number) => {
    ctx.clearRect(0, 0, W, H);
    while (pts.length && now - pts[0].t > TRAIL_LIFE) pts.shift();

    // the ribbon: smooth curve through midpoints, thick and opaque at the dropper, fading to a hairline
    ctx.lineCap = 'round';
    for (let i = 1; i < pts.length; i++) {
      const p0 = pts[i - 1], p1 = pts[i], p2 = pts[i + 1] ?? p1;
      const k = Math.max(0, 1 - (now - p1.t) / TRAIL_LIFE);
      const sx = (p0.x + p1.x) / 2, sy = (p0.y + p1.y) / 2;
      const ex = (p1.x + p2.x) / 2, ey = (p1.y + p2.y) / 2;
      ctx.strokeStyle = gold(0.8 * k);
      ctx.lineWidth = 0.6 + 5.2 * k * k;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.quadraticCurveTo(p1.x, p1.y, ex, ey);
      ctx.stroke();
    }

    // serum drops: fall under a little gravity, with a glint so they read as liquid
    for (let i = drops.length - 1; i >= 0; i--) {
      const d = drops[i];
      const age = now - d.t;
      if (age > DROP_LIFE) { drops.splice(i, 1); continue; }
      d.vy += 0.11; d.x += d.vx; d.y += d.vy;
      const k = 1 - age / DROP_LIFE;
      const r = d.r * (0.55 + 0.45 * k);
      ctx.fillStyle = gold(0.9 * k);
      ctx.beginPath();
      ctx.ellipse(d.x, d.y, r * 0.86, r * 1.12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(255,255,255,${0.75 * k})`;
      ctx.beginPath();
      ctx.arc(d.x - r * 0.3, d.y - r * 0.35, r * 0.28, 0, Math.PI * 2);
      ctx.fill();
    }

    if (pts.length > 1 || drops.length) requestAnimationFrame(frame);
    else { running = false; ctx.clearRect(0, 0, W, H); }
  };
  const kick = () => { if (!running) { running = true; requestAnimationFrame(frame); } };

  addEventListener('pointermove', (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const x = e.clientX, y = e.clientY;
    cur.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    cur.classList.add('on');
    const now = performance.now();
    pts.push({ x, y, t: now });
    if (pts.length > 70) pts.shift();
    if (lastX >= 0) travel += Math.hypot(x - lastX, y - lastY);
    lastX = x; lastY = y;
    if (travel > DROP_EVERY) {
      travel = 0;
      drops.push({ x, y, vx: (Math.random() - 0.5) * 0.9, vy: 0.3 + Math.random() * 0.7, r: 1.7 + Math.random() * 1.8, t: now });
    }
    kick();
  }, { passive: true });

  // what the pointer is over decides the cursor's state
  document.addEventListener('pointerover', (e) => {
    const t = e.target as Element | null;
    if (!t || !t.closest) return;
    const tagged = t.closest<HTMLElement>('[data-cursor]');
    const field = t.closest('input:not([type=range]):not([type=radio]):not([type=checkbox]), textarea, select');
    const clickable = t.closest('a, button, summary, label, [role="button"], .qopt');
    cur.classList.toggle('hide', !!field);
    cur.classList.toggle('big', !!tagged && !field);
    cur.classList.toggle('link', !!clickable && !tagged && !field);
    if (tagged) label.textContent = tagged.dataset.cursor || '';
  });
  document.addEventListener('pointerdown', () => cur.classList.add('press'));
  document.addEventListener('pointerup', () => cur.classList.remove('press'));
  document.documentElement.addEventListener('mouseleave', () => { cur.classList.remove('on'); pts.length = 0; });
  addEventListener('blur', () => cur.classList.remove('on'));
}
