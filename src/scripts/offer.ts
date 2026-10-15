// The website offer card: appears after 30 seconds on the site (counted across pages) or 60% down a long page,
// whichever comes first. "Not now" hides it for a week; claiming it carries the code into the booking form.
// The deadline is always the real last day of the current month.

const STORE = 'tbl-offer';
const TIME = 'tbl-offer-t';

type Saved = { key?: string; until?: number; claimed?: boolean; code?: string; treatment?: string };

const read = (): Saved => { try { return JSON.parse(localStorage.getItem(STORE) || '{}'); } catch { return {}; } };
const save = (s: Saved) => { try { localStorage.setItem(STORE, JSON.stringify(s)); } catch {} };

export const monthEnd = (now = new Date()) => new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
export const monthEndLabel = (now = new Date()) => monthEnd(now).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

/** Remember that this visitor claimed the offer (until the end of the month). */
export const claimOffer = (key: string, code: string, treatment: string) => save({ key, claimed: true, code, treatment, until: monthEnd().getTime() });

/** The claimed offer, if this visitor claimed it and it has not expired. */
export const claimedOffer = (): Saved | null => {
  const s = read();
  return s.claimed && s.until && s.until > Date.now() ? s : null;
};

export function initOffer() {
  const el = document.getElementById('offer');
  if (!el) return;
  const d = el.dataset;
  const saved = read();
  const end = monthEnd();
  el.querySelectorAll<HTMLTimeElement>('[data-offer-end]').forEach((t) => {
    t.textContent = monthEndLabel();
    t.dateTime = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}`;
  });
  if (saved.key === d.key && (saved.claimed || (saved.until && saved.until > Date.now()))) return;

  const after = Number(d.after) || 30, min = Number(d.min) || 8, share = Number(d.scroll) || 0.6;
  let secs = 0;
  try { secs = Number(sessionStorage.getItem(TIME)) || 0; } catch {}
  let shown = false;

  const busy = () => document.body.classList.contains('menu-open') || !!document.querySelector('dialog[open]')
    || !!document.activeElement?.matches('input, textarea, select');
  const show = () => {
    if (shown || busy()) return;
    shown = true;
    clearInterval(tick);
    removeEventListener('scroll', onScroll);
    el.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));
    document.documentElement.classList.add('offer-open');
  };
  const hide = () => {
    el.classList.remove('show');
    document.documentElement.classList.remove('offer-open');
    setTimeout(() => { el.hidden = true; }, 600);
  };

  const tick = window.setInterval(() => {
    if (document.hidden) return;
    secs += 1;
    try { sessionStorage.setItem(TIME, String(secs)); } catch {}
    if (secs >= after) show();
  }, 1000);
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (secs >= min && max > innerHeight * 1.5 && scrollY / max >= share) show();
  };
  addEventListener('scroll', onScroll, { passive: true });

  el.addEventListener('click', (e) => {
    const t = e.target as Element;
    if (t.closest('[data-offer-close]')) {
      save({ key: d.key, until: Date.now() + (Number(d.snooze) || 7) * 864e5 });
      hide();
    } else if (t.closest('[data-offer-claim]')) {
      claimOffer(d.key || '', d.code || '', d.treatment || '');
    }
  });
  addEventListener('keydown', (e) => {
    // Escape closes the card, unless it was meant for an open photo viewer
    if (e.key === 'Escape' && el.classList.contains('show') && !document.querySelector('dialog[open]')) {
      save({ key: d.key, until: Date.now() + (Number(d.snooze) || 7) * 864e5 });
      hide();
    }
  });
}
