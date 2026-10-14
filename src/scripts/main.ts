// Site-wide behaviour: theme, header, smooth scroll and all scroll animations.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);
ScrollTrigger.config({ ignoreMobileResize: true });

const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer: fine)').matches;
const $ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => el.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => [...el.querySelectorAll<T>(s)];

if (!reduce) root.classList.add('motion');

/* ---------------- toast ---------------- */
let toastTimer = 0;
export const toast = (text: string) => {
  const el = $('#toast');
  if (!el) return;
  el.textContent = text;
  el.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el.classList.remove('on'), 3200);
};
(window as any).tblToast = toast;

/* ---------------- theme with circular reveal ---------------- */
const setTheme = (mode: string) => {
  root.setAttribute('data-theme', mode);
  try { localStorage.setItem('tbl-theme', mode); } catch {}
};
const themeBtn = $('#theme-btn');
themeBtn?.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  const doc = document as any;
  if (!doc.startViewTransition || reduce) return setTheme(next);
  const r = themeBtn.getBoundingClientRect();
  const x = r.left + r.width / 2, y = r.top + r.height / 2;
  const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  root.classList.add('theme-switch');
  const t = doc.startViewTransition(() => setTheme(next));
  t.ready.then(() => {
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
      { duration: 800, easing: 'cubic-bezier(.76,0,.24,1)', pseudoElement: '::view-transition-new(root)' },
    );
  });
  t.finished.finally(() => root.classList.remove('theme-switch'));
});

/* ---------------- smooth scroll ---------------- */
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.095, smoothWheel: true, anchors: { offset: -90 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  (window as any).tblLenis = lenis;
}

/* ---------------- remember a chosen treatment or goal for the next page ---------------- */
document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest<HTMLElement>('[data-treatment], [data-goal]');
  if (!a) return;
  try {
    if (a.dataset.treatment) sessionStorage.setItem('tbl-treatment', a.dataset.treatment);
    if (a.dataset.goal) sessionStorage.setItem('tbl-goal', a.dataset.goal);
  } catch {}
});

/* ---------------- header, menu, mobile bar ---------------- */
const head = $('#head');
const mbar = $('#mbar');
let lastY = 0;
const onScroll = () => {
  const y = window.scrollY;
  head?.classList.toggle('scrolled', y > 10);
  head?.classList.toggle('away', y > 600 && y > lastY + 2 && !document.body.classList.contains('menu-open'));
  if (y < lastY - 2) head?.classList.remove('away');
  mbar?.classList.toggle('show', y > 480);
  lastY = y;
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const menuBtn = $('#menu-btn');
const menu = $('#mmenu');
const setMenu = (open: boolean) => {
  document.body.classList.toggle('menu-open', open);
  menuBtn?.setAttribute('aria-expanded', String(open));
  menu?.setAttribute('aria-hidden', String(!open));
  const label = $('#menu-label');
  if (label) label.textContent = open ? 'Close' : 'Menu';
  if (open) lenis?.stop(); else lenis?.start();
};
menuBtn?.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
menu?.addEventListener('click', (e) => { if ((e.target as Element).closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

/* ---------------- before / after sliders ---------------- */
$$('[data-ba]').forEach((ba) => {
  const input = $<HTMLInputElement>('input', ba);
  if (!input) return;
  let scrollTween: gsap.core.Tween | null = null;
  input.addEventListener('input', () => {
    scrollTween?.scrollTrigger?.kill();
    scrollTween?.kill();
    scrollTween = null;
    ba.style.setProperty('--pos', input.value + '%');
  });
  if (!reduce && ba.hasAttribute('data-ba-scroll')) {
    const state = { p: 90 };
    scrollTween = gsap.to(state, {
      p: 12,
      ease: 'none',
      scrollTrigger: { trigger: ba, start: 'top 80%', end: 'bottom 35%', scrub: 0.6 },
      onUpdate: () => { ba.style.setProperty('--pos', state.p + '%'); input.value = String(Math.round(state.p)); },
    });
  }
});

/* ---------------- videos: play only when visible ---------------- */
const vio = new IntersectionObserver((entries) => entries.forEach((e) => {
  const v = e.target as HTMLVideoElement;
  if (e.isIntersecting) { v.muted = true; v.play().catch(() => {}); } else v.pause();
}), { threshold: 0.05 });
$$<HTMLVideoElement>('video[data-autoplay]').forEach((v) => { if (reduce) { v.removeAttribute('autoplay'); v.pause(); } else vio.observe(v); });

if (!reduce) {
  /* ---------------- reveals ---------------- */
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  $$('[data-reveal], [data-clip], .h-card').forEach((el) => io.observe(el));

  /* ---------------- headline line reveals ---------------- */
  const splitAll = () => {
    $$('[data-split]').forEach((el) => {
      const onLoad = el.dataset.split === 'load';
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { opacity: 1 });
          return gsap.from(self.lines, {
            yPercent: 112,
            duration: 1.25,
            ease: 'expo.out',
            stagger: 0.09,
            delay: onLoad ? 0.1 : 0,
            scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 90%', once: true },
          });
        },
      });
    });
  };
  if (document.fonts?.ready) document.fonts.ready.then(splitAll); else splitAll();

  /* ---------------- statement: words light up while scrolling ---------------- */
  $$('[data-words]').forEach((el) => {
    const split = SplitText.create(el, { type: 'words', wordsClass: 'w', tag: 'span', aria: 'none' });
    gsap.set(split.words, { opacity: 0.16 });
    gsap.to(split.words, { opacity: 1, stagger: 0.12, ease: 'none', scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 48%', scrub: true } });
  });

  /* ---------------- hero wordmark ---------------- */
  const wordmark = $('.wordmark');
  if (wordmark) {
    const chars = $$('.ch', wordmark);
    const mid = (chars.length - 1) / 2;
    gsap.to(chars, {
      x: (i: number) => (i - mid) * innerWidth * 0.022,
      yPercent: -14,
      opacity: 0.18,
      ease: 'none',
      scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: 0.6, invalidateOnRefresh: true },
    });
    head?.classList.add('logo-hidden');
    ScrollTrigger.create({
      trigger: wordmark,
      start: 'bottom top+=90',
      onEnter: () => head?.classList.remove('logo-hidden'),
      onLeaveBack: () => head?.classList.add('logo-hidden'),
    });
  }

  /* ---------------- hero: the arch opens into a full-screen film ---------------- */
  const stage = $('[data-stage]');
  if (stage) {
    const frame = $('.stage-frame', stage)!, media = $('.stage-media', stage), bg = $('.stage-bg', stage), over = $('.stage-over', stage);
    const mm = gsap.matchMedia();
    mm.add({ desk: '(min-width: 761px)', mob: '(max-width: 760px)' }, (ctx) => {
      const desk = !!ctx.conditions?.desk;
      let from: () => string;
      if (desk) {
        // Start exactly on the centred portrait arch, then open to the whole screen.
        from = () => {
          const W = stage.offsetWidth, H = stage.offsetHeight;
          const mh = Math.min(H * 0.86, 860), mw = (mh * 9) / 16;
          const t = (H - mh) / 2, sd = (W - mw) / 2;
          return `inset(${t}px ${sd}px ${t}px ${sd}px round ${mw / 2}px ${mw / 2}px 24px 24px)`;
        };
      } else {
        const archW = () => innerWidth * 0.74;
        const side = () => (((innerWidth - archW()) / 2) / innerWidth) * 100;
        from = () => `inset(6% ${side()}% 0% ${side()}% round ${archW() / 2}px ${archW() / 2}px 18px 18px)`;
      }
      const to = desk ? 'inset(0px 0px 0px 0px round 0px 0px 0px 0px)' : 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)';
      if (over) gsap.set(over, { autoAlpha: 0, y: 40 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: stage, start: 'top top', end: `+=${desk ? 140 : 95}%`, pin: true, scrub: 0.7, invalidateOnRefresh: true, anticipatePin: 1 },
      });
      tl.fromTo(frame, { clipPath: from }, { clipPath: to, ease: 'power1.inOut', duration: 1 });
      if (desk) {
        if (media) tl.fromTo(media, { scale: 1 }, { scale: 0.94, ease: 'power1.inOut', duration: 1 }, 0);
        if (bg) tl.fromTo(bg, { scale: 1.3 }, { scale: 1.12, ease: 'power1.inOut', duration: 1 }, 0);
      } else {
        const v = $('video', stage);
        if (v) tl.fromTo(v, { scale: 1.25 }, { scale: 1, ease: 'power1.inOut', duration: 1 }, 0);
      }
      if (over) tl.to(over, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.7);
    });
  }

  /* ---------------- signature facials: pinned horizontal rail ---------------- */
  const hs = $('[data-hscroll]');
  if (hs) {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      const track = $('.h-track', hs)!, bar = $('.h-bar i', hs), count = $('.h-count b', hs), ghost = $('.h-ghost', hs);
      const cards = $$('.h-card', hs);
      const dist = () => Math.max(0, track.scrollWidth - innerWidth);
      const centred = () => {
        let best = 0, gap = Infinity;
        cards.forEach((c, i) => {
          const r = c.getBoundingClientRect();
          const d = Math.abs(r.left + r.width / 2 - innerWidth / 2);
          if (d < gap) { gap = d; best = i; }
        });
        return best;
      };
      const move = gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: hs, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: (self) => {
            if (bar) gsap.set(bar, { scaleX: self.progress });
            if (count) count.textContent = String(centred() + 1).padStart(2, '0');
          },
        },
      });
      // the outlined word drifts the other way, for depth
      if (ghost) gsap.fromTo(ghost, { xPercent: 4 }, { xPercent: -38, ease: 'none', scrollTrigger: { trigger: hs, start: 'top bottom', end: () => `+=${dist() + innerHeight}`, scrub: 1, invalidateOnRefresh: true } });
      cards.forEach((card) => {
        const pic = $('.pic', card), im = $('.pic img', card), text = $$(':scope > h3, :scope > p, :scope > .fc-tech, :scope > .meta', card);
        if (pic) gsap.fromTo(pic, { clipPath: 'inset(14% 0% 14% 42% round 20px)' }, { clipPath: 'inset(0% 0% 0% 0% round 20px)', ease: 'none', scrollTrigger: { trigger: card, containerAnimation: move, start: 'left 104%', end: 'left 52%', scrub: true } });
        if (im) gsap.fromTo(im, { xPercent: 10, scale: 1.32 }, { xPercent: -10, scale: 1.14, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: move, start: 'left right', end: 'right left', scrub: true } });
        if (text.length) gsap.fromTo(text, { x: 60, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.06, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: move, start: 'left 96%', end: 'left 60%', scrub: true } });
      });
    });
  }

  /* ---------------- stacking technology cards ---------------- */
  const cards = $$('.stack-card');
  cards.forEach((card, i) => {
    const next = cards[i + 1];
    if (!next) return;
    gsap.to(card, { scale: 0.93, ease: 'none', scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 30%', scrub: true } });
  });

  /* ---------------- every image: opens from a soft inset and settles from a slow zoom ---------------- */
  const pics = $$<HTMLElement>('main .pic').filter((pic) => !pic.hasAttribute('data-still') && !pic.closest('.h-track, .marquee, .iggrid, .stage, .lcard, .alts, .qresult'));
  // read every position first, then write, so the browser lays the page out once
  const onScreen = pics.map((pic) => pic.getBoundingClientRect().top < innerHeight * 0.85);
  pics.forEach((pic, i) => {
    const media = $('img, video', pic);
    const from = { clipPath: 'inset(13% 9% 13% 9% round 30px)' };
    const to = { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none' };
    if (onScreen[i]) {
      // already visible when the page opens: play once instead of waiting for a scroll
      gsap.fromTo(pic, from, { ...to, duration: 1.5, ease: 'expo.out', delay: 0.2 });
      if (media) gsap.fromTo(media, { scale: 1.2 }, { scale: 1, duration: 1.8, ease: 'expo.out', delay: 0.2 });
      return;
    }
    gsap.fromTo(pic, from, { ...to, scrollTrigger: { trigger: pic, start: 'top 96%', end: 'top 50%', scrub: 0.6 } });
    if (media) gsap.fromTo(media, { scale: 1.24 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: pic, start: 'top 96%', end: 'top 25%', scrub: 0.6 } });
  });

  const igGrid = $('.iggrid');
  if (igGrid) gsap.from($$('a', igGrid), { y: 80, opacity: 0, scale: 0.9, duration: 1.2, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: igGrid, start: 'top 88%', once: true } });

  /* ---------------- image parallax ---------------- */
  $$('[data-parallax]').forEach((fig) => {
    const im = $('img', fig);
    if (im) gsap.fromTo(im, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* ---------------- counters ---------------- */
  $$('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target, duration: 1.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => { el.textContent = String(Math.round(obj.v)); },
    });
  });

  /* ---------------- footer word ---------------- */
  const word = $('.foot-word');
  if (word) gsap.fromTo(word, { yPercent: 40 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.site-foot', start: 'top bottom', end: 'bottom bottom', scrub: true } });

  /* ---------------- desktop cursor and magnetic buttons ---------------- */
  if (fine) {
    const cur = $('#cursor')!, label = $('b', cur)!;
    const xTo = gsap.quickTo(cur, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(cur, 'y', { duration: 0.35, ease: 'power3.out' });
    addEventListener('pointermove', (e) => { xTo(e.clientX); yTo(e.clientY); cur.classList.add('on'); }, { passive: true });
    document.addEventListener('pointerleave', () => cur.classList.remove('on'));
    $$('[data-cursor]').forEach((el) => {
      el.addEventListener('pointerenter', () => { label.textContent = el.dataset.cursor || ''; cur.classList.add('big'); });
      el.addEventListener('pointerleave', () => cur.classList.remove('big'));
    });
    $$('[data-magnetic]').forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        const b = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - b.left - b.width / 2) * 0.22, y: (e.clientY - b.top - b.height / 2) * 0.32, duration: 0.45, ease: 'power3.out' });
      });
      btn.addEventListener('pointerleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1,0.4)' }));
    });
  }

  // one recalculation once images and fonts have settled, instead of one for each
  const loaded = document.readyState === 'complete' ? Promise.resolve() : new Promise((r) => addEventListener('load', r, { once: true }));
  Promise.all([loaded, document.fonts?.ready]).then(() => ScrollTrigger.refresh());
}

// Safety net: if anything above fails, never leave headings hidden.
setTimeout(() => $$('[data-split]').forEach((el) => { if (getComputedStyle(el).opacity === '0') el.style.opacity = '1'; }), 2500);
