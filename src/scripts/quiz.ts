// Skin quiz: four questions, a weighted score per treatment, one match and two alternatives.
type Pick = {
  id: string; name: string; href: string; minutes: string; price: string; tagline: string; why: string; img: string;
  score: Record<string, Record<string, number>>;
};
type Data = { picks: Pick[]; labels: Record<string, Record<string, string>>; whatsapp: string; order: string[]; book: string };

const arrow = '<svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export function initQuiz() {
  const root = document.getElementById('quiz');
  const raw = document.getElementById('quiz-data');
  const result = document.getElementById('qresult');
  if (!root || !raw || !result) return;
  const data: Data = JSON.parse(raw.textContent || '{}');
  const steps = [...root.querySelectorAll<HTMLElement>('.qstep')];
  const bar = root.querySelector<HTMLElement>('.qbar i');
  const answers: Record<string, string> = {};
  let current = 0;

  steps.forEach((s) => s.querySelector('h2')?.setAttribute('tabindex', '-1'));

  const bringIntoView = () => {
    const top = root.getBoundingClientRect().top;
    if (top < 90 || top > innerHeight * 0.6) {
      const lenis = (window as any).tblLenis;
      if (lenis) lenis.scrollTo(root, { offset: -110 });
      else window.scrollTo({ top: scrollY + top - 110, behavior: 'smooth' });
    }
  };

  const mark = (step: HTMLElement, value?: string) => {
    step.querySelectorAll<HTMLElement>('.qopt').forEach((b) => {
      const on = b.dataset.v === value;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', String(on));
    });
  };

  const show = (i: number, focus = true) => {
    current = i;
    steps.forEach((s, k) => (s.hidden = k !== i));
    result.hidden = true;
    if (bar) bar.style.width = `${(i / steps.length) * 100}%`;
    if (focus) {
      steps[i].querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
      bringIntoView();
    }
  };

  const rank = () =>
    data.picks
      .map((p, idx) => ({ p, idx, s: data.order.reduce((sum, k) => sum + (p.score[k]?.[answers[k]] ?? 0), 0) }))
      .sort((a, b) => b.s - a.s || a.idx - b.idx)
      .map((x) => x.p);

  const finish = () => {
    const [top, ...rest] = rank();
    const alts = rest.slice(0, 2);
    const chosen = data.order.map((k) => data.labels[k]?.[answers[k]]).filter(Boolean);
    const msg = `Hi Tatiana! I took the skin quiz on your website and my match was the ${top.name}. My answers: ${chosen.join(', ')}. Could you help me book?`;
    const wa = `https://wa.me/${data.whatsapp}?text=${encodeURIComponent(msg)}`;
    const book = `${data.book}?treatment=${encodeURIComponent(top.id)}`;
    try { sessionStorage.setItem('tbl-treatment', top.id); } catch {}

    result.innerHTML = `
      <div class="card">
        <figure class="pic"><img src="${top.img}" alt="${esc(top.name)}" decoding="async" /></figure>
        <div>
          <p class="k">Your match</p>
          <h2>${esc(top.name)}</h2>
          <p class="body-2">${esc(top.tagline)}</p>
          <div class="meta"><span class="price${top.price.startsWith('From') ? '' : ' req'}">${esc(top.price)}</span>${top.minutes ? `<span>${esc(top.minutes)}</span>` : ''}</div>
          <div class="chips">${chosen.map((c) => `<span class="chip-s">${esc(c)}</span>`).join('')}</div>
          <p class="why"><b>Why it suits you:</b> ${esc(top.why)}</p>
          <div class="btns">
            <a class="btn btn-primary" href="${book}" data-treatment="${esc(top.id)}"><span>Book this treatment</span></a>
            <a class="link" href="${top.href}"><span>See details</span>${arrow}</a>
          </div>
        </div>
      </div>
      <p class="qalts-h">Also a great fit</p>
      <div class="alts">
        ${alts
          .map(
            (a) => `<a class="alt" href="${a.href}"><figure class="pic"><img src="${a.img}" alt="" loading="lazy" decoding="async" /></figure><span><b>${esc(a.name)}</b><span>${esc(a.price)}${a.minutes ? ` · ${esc(a.minutes)}` : ''}</span></span></a>`,
          )
          .join('')}
      </div>
      <div class="qnav">
        <button type="button" class="link" data-restart><span>Start again</span></button>
        <a class="link" href="${wa}" target="_blank" rel="noopener"><span>Ask Tatiana on WhatsApp</span>${arrow}</a>
      </div>`;
    steps.forEach((s) => (s.hidden = true));
    result.hidden = false;
    if (bar) bar.style.width = '100%';
    result.focus({ preventScroll: true });
    bringIntoView();
  };

  root.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const opt = t.closest<HTMLElement>('.qopt');
    if (opt) {
      const step = opt.closest<HTMLElement>('.qstep')!;
      answers[step.dataset.q!] = opt.dataset.v!;
      mark(step, opt.dataset.v);
      const i = steps.indexOf(step);
      window.setTimeout(() => (i < steps.length - 1 ? show(i + 1) : finish()), 280);
      return;
    }
    if (t.closest('[data-back]')) show(Math.max(0, current - 1));
    if (t.closest('[data-restart]')) {
      Object.keys(answers).forEach((k) => delete answers[k]);
      steps.forEach((s) => mark(s));
      show(0);
    }
  });

  // A goal picked on the home page (?goal=lift) answers the first question.
  let goal = new URLSearchParams(location.search).get('goal');
  try {
    if (!goal) goal = sessionStorage.getItem('tbl-goal');
    sessionStorage.removeItem('tbl-goal');
  } catch {}
  if (goal && data.labels.goal?.[goal]) {
    answers.goal = goal;
    mark(steps[0], goal);
    show(1, false);
  } else show(0, false);
}
