// Real words from real clients, taken from the "Reviews" and "Results" highlights on @timeless_beauty_lab.
// Quotes are as written (emoji left out, spelling kept). One story was translated from Russian; its original is kept too.
// Before launch: ask Tatiana to confirm each client is happy to be quoted on the website.

export type Review = {
  id: string;
  quote: string;
  /** a shorter, verbatim excerpt for big type */
  short?: string;
  name?: string;
  source: 'Instagram comment' | 'Instagram message' | 'Instagram story';
  date: string;
  context?: string;
  original?: { lang: string; label: string; text: string };
  /** before/after pair that came with the message (left = before) */
  photo?: string;
  /** cropped screenshot of the original message, shown on the results page */
  shot?: string;
};

export const REVIEWS: Review[] = [
  {
    id: 'brand-new',
    quote: 'Thank you so much Tetiana you are amazing. My face feels like brand new',
    short: 'My face feels like brand new.',
    name: 'Szimonetta',
    source: 'Instagram comment',
    date: 'Apr 2026',
    shot: 'msg-comment',
  },
  {
    id: 'best-at-this',
    quote: 'Thank you for such an Amazing facial today! You are the best at this',
    short: 'You are the best at this.',
    source: 'Instagram message',
    date: 'Jan 2026',
    context: 'After her facial',
    shot: 'msg-facial',
  },
  {
    id: 'worth-it',
    quote: 'Highly recommend!!! I finally booked an appointment which was yesterday and am already seeing the results: fuller lips, less wrinkles, more skin elasticity. Worth it.',
    short: 'Already seeing the results. Worth it.',
    source: 'Instagram comment',
    date: 'Sep 2025',
    context: 'The day after her visit',
    shot: 'msg-recommend',
  },
  {
    id: 'chin',
    quote: 'Hi Tatiana! My chin looks so much better today! Thank you!',
    source: 'Instagram message',
    date: 'Nov 2025',
    context: 'The morning after her visit',
    shot: 'msg-chin',
  },
  {
    id: 'loved-massage',
    quote: 'Thankyouuu. I loved the massage',
    source: 'Instagram message',
    date: 'Sep 2025',
    context: 'Facial massage',
    photo: 'pair-sep',
  },
  {
    id: 'business-meetings',
    quote: 'My cosmetologist @timeless_beauty_lab does such a cleansing facial that you can go straight from her treatment room to business meetings.',
    source: 'Instagram story',
    date: 'May 2026',
    context: 'Translated from Russian',
    original: { lang: 'ru', label: 'Original in Russian', text: 'Ну или просто мой косметолог @timeless_beauty_lab делает такую чистку, что сразу из кабинета можно на бизнес встречи ходить' },
  },
  {
    id: 'pampering',
    quote: 'Thank you so much tattiana. It’s always a great pampering time visiting you',
    short: 'Always a great pampering time.',
    source: 'Instagram message',
    date: 'Feb 2026',
    context: 'A regular client',
    shot: 'msg-pamper',
  },
  {
    id: 'coolest-master',
    quote: 'Thank you so much to the COOLEST MASTER for the wonderful work on my skin. I highly recommend it',
    name: 'Nataliia',
    source: 'Instagram story',
    date: 'Nov 2025',
  },
  {
    id: 'book-another',
    quote: 'That was amazing thank you so much. I’ll be in touch to book another appt',
    source: 'Instagram message',
    date: 'Aug 2025',
    photo: 'pair-aug',
  },
  {
    id: 'relaxed',
    quote: 'Yessss, thank you for today! I really so relaxed today',
    source: 'Instagram message',
    date: 'Jan 2026',
    shot: 'msg-relaxed',
  },
  {
    id: 'found-you',
    quote: 'Amazing, so happy I found you',
    name: 'Melissa',
    source: 'Instagram comment',
    date: '2026',
  },
  {
    id: 'did-this',
    quote: 'I did this and it is amazing',
    source: 'Instagram comment',
    date: 'Sep 2025',
  },
];

export const review = (id: string) => {
  const r = REVIEWS.find((x) => x.id === id);
  if (!r) throw new Error(`Unknown review: ${id}`);
  return r;
};

/** "Szimonetta · Instagram comment · Apr 2026" without the name when there is none */
export const byline = (r: Review) => [r.name, r.source, r.date].filter(Boolean).join(' · ');
