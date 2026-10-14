// Booking request: three short steps, then the request is sent as a message on WhatsApp, Instagram or SMS.
// Nothing is stored or sent anywhere else.
type Data = { phone: string; whatsapp: string; ig: string };

const toast = (t: string) => (window as any).tblToast?.(t);

const copyText = (text: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).catch(() => {});
    return true;
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  Object.assign(ta.style, { position: 'fixed', top: '0', left: '0', opacity: '0' });
  document.body.appendChild(ta);
  ta.select();
  ta.setSelectionRange(0, text.length);
  let ok = false;
  try { ok = document.execCommand('copy'); } catch {}
  ta.remove();
  return ok;
};

export function initBooking() {
  const form = document.getElementById('bform') as HTMLFormElement | null;
  const raw = document.getElementById('book-data');
  if (!form || !raw) return;
  const data: Data = JSON.parse(raw.textContent || '{}');
  const steps = [...form.querySelectorAll<HTMLElement>('.bstep')];
  const marks = [...document.querySelectorAll<HTMLElement>('.bsteps li')];
  const sel = form.querySelector<HTMLSelectElement>('#b-treatment')!;
  const days = form.querySelector<HTMLElement>('#b-days')!;
  const summary = form.querySelector<HTMLElement>('#b-summary')!;
  const preview = form.querySelector<HTMLElement>('#b-msg')!;
  const picks = [...form.querySelectorAll<HTMLElement>('[data-pick]')];
  let cur = 0;

  // Next 14 days as tappable chips.
  const today = new Date();
  const label = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const wd = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
  const mo = new Intl.DateTimeFormat('en-US', { month: 'short' });
  let html = '';
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    html += `<label class="chip"><input type="radio" name="day" value="${label.format(d)}" /><span><small>${wd.format(d)}</small><b>${d.getDate()}</b><small>${mo.format(d)}</small></span></label>`;
  }
  days.insertAdjacentHTML('beforeend', html);

  const val = (name: string) => ((form.elements.namedItem(name) as HTMLInputElement | null)?.value || '').trim();
  const checked = (name: string) => (form.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)?.value || '').trim();

  const treatment = () => {
    const o = sel.selectedOptions[0];
    if (!o || !o.value) return { name: '', detail: '' };
    const name = o.dataset.name || o.textContent || '';
    const detail = [o.dataset.min, o.dataset.price].filter(Boolean).join(' · ');
    return { name, detail };
  };

  const message = () => {
    const t = treatment();
    const lines = [
      "Hi Tatiana! I'd like to book an appointment.",
      '',
      `Treatment: ${t.name}${t.detail ? ` (${t.detail})` : ''}`,
      `Preferred day: ${checked('day') || 'Any day'}`,
      `Time of day: ${checked('time') || 'Any time'}`,
      `Name: ${val('name')}`,
    ];
    if (val('phone')) lines.push(`Phone: ${val('phone')}`);
    if (val('notes')) lines.push(`Notes: ${val('notes')}`);
    return lines.join('\n');
  };

  const update = () => {
    picks.forEach((p) => {
      const on = p.dataset.pick === sel.value;
      p.classList.toggle('on', on);
      p.setAttribute('aria-pressed', String(on));
    });
    const t = treatment();
    summary.innerHTML = '';
    if (t.name) {
      const b = document.createElement('b');
      b.textContent = t.name;
      summary.append(b, document.createTextNode(`${t.detail ? ` · ${t.detail}` : ''}`), document.createElement('br'), document.createTextNode(`${checked('day') || 'Any day'}, ${(checked('time') || 'Any time').toLowerCase()}`));
    }
    preview.textContent = message();
  };

  const valid = (i: number) => {
    const ok = i === 0 ? !!sel.value : i === 2 ? !!val('name') : true;
    const err = steps[i].querySelector<HTMLElement>('.err');
    if (err) err.hidden = ok;
    if (!ok) (i === 0 ? sel : (form.elements.namedItem('name') as HTMLInputElement)).focus();
    return ok;
  };

  const go = (i: number) => {
    cur = Math.max(0, Math.min(steps.length - 1, i));
    steps.forEach((s, k) => (s.hidden = k !== cur));
    marks.forEach((m, k) => m.classList.toggle('on', k <= cur));
    update();
    steps[cur].querySelector<HTMLElement>('h3')?.focus({ preventScroll: true });
    const top = form.getBoundingClientRect().top;
    if (top < 90) {
      const lenis = (window as any).tblLenis;
      if (lenis) lenis.scrollTo(form, { offset: -160 });
      else window.scrollTo({ top: scrollY + top - 160, behavior: 'smooth' });
    }
  };

  const send = (how: string) => {
    if (!valid(2)) return;
    const text = message();
    if (how === 'wa') window.open(`https://wa.me/${data.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    else if (how === 'sms') location.href = `sms:${data.phone}?&body=${encodeURIComponent(text)}`;
    else if (how === 'ig') {
      const copied = copyText(text);
      window.open(data.ig, '_blank', 'noopener');
      toast(copied ? 'Message copied. Paste it into the Instagram chat.' : 'Opening Instagram. Copy your message from this page.');
    }
  };

  form.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const pick = t.closest<HTMLElement>('[data-pick]');
    const sendBtn = t.closest<HTMLElement>('[data-send]');
    if (t.closest('[data-next]')) { if (valid(cur)) go(cur + 1); }
    else if (t.closest('[data-prev]')) go(cur - 1);
    else if (pick) { sel.value = pick.dataset.pick!; valid(0); update(); }
    else if (sendBtn) send(sendBtn.dataset.send!);
  });
  form.addEventListener('submit', (e) => e.preventDefault());
  const clearErrors = () => {
    if (sel.value) steps[0].querySelector<HTMLElement>('.err')!.hidden = true;
    if (val('name')) steps[2].querySelector<HTMLElement>('.err')!.hidden = true;
  };
  form.addEventListener('input', () => { clearErrors(); update(); });
  form.addEventListener('change', () => { clearErrors(); update(); });

  // Pre-select a treatment chosen on another page (?treatment=… or the last "Book" button clicked).
  let pre = new URLSearchParams(location.search).get('treatment');
  try {
    if (!pre) pre = sessionStorage.getItem('tbl-treatment');
    sessionStorage.removeItem('tbl-treatment');
  } catch {}
  if (pre && [...sel.options].some((o) => o.value === pre)) sel.value = pre;
  update();
}
