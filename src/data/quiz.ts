// Skin quiz: questions, answers and how each answer scores every treatment.
import type { IconName } from './content';

export type QuizOption = { id: string; label: string; hint: string; icon?: IconName; badge?: string };
export type QuizQuestion = { key: 'goal' | 'skin' | 'time' | 'style'; title: string; options: QuizOption[] };

export const QUESTIONS: QuizQuestion[] = [
  {
    key: 'goal',
    title: 'What would you love to change first?',
    options: [
      { id: 'glow', label: 'Glow and hydration', hint: 'Dull, dry or tired-looking skin', icon: 'hydro' },
      { id: 'lift', label: 'Lift and contour', hint: 'A softer jawline or flatter cheeks', icon: 'micro' },
      { id: 'texture', label: 'Texture and pores', hint: 'Rough patches, congestion, uneven tone', icon: 'diamond' },
      { id: 'puffy', label: 'Puffiness and tension', hint: 'Morning puffiness or a tight jaw', icon: 'hands' },
      { id: 'eyes', label: 'Eyes and fine lines', hint: 'Crepey skin, fine lines, dark circles', icon: 'eye' },
      { id: 'renew', label: 'Firmness and renewal', hint: 'Early signs of aging, loss of bounce', icon: 'peel' },
    ],
  },
  {
    key: 'skin',
    title: 'How does your skin usually feel?',
    options: [
      { id: 'dry', label: 'Dry or dehydrated', hint: 'Tight after cleansing, flaky in places', icon: 'infusion' },
      { id: 'oily', label: 'Oily or congested', hint: 'Shine and visible pores by midday', icon: 'vacuum' },
      { id: 'sensitive', label: 'Sensitive or reactive', hint: 'Flushes easily, reacts to new products', icon: 'cryo' },
      { id: 'normal', label: 'Balanced or combination', hint: 'Mostly comfortable, a little of both', icon: 'oxygen' },
    ],
  },
  {
    key: 'time',
    title: 'How much time would you like to spend?',
    options: [
      { id: '60', label: 'About an hour', hint: 'An express glow, lunch-break friendly', badge: '60' },
      { id: '90', label: 'Around 90 minutes', hint: 'The classic, complete facial', badge: '90' },
      { id: '120', label: 'Two hours, treat me', hint: 'The full ritual, forehead to collarbone', badge: '120' },
      { id: 'any', label: 'No preference', hint: 'Just show me the best match', badge: 'Any' },
    ],
  },
  {
    key: 'style',
    title: 'Which experience sounds most like you?',
    options: [
      { id: 'tech', label: 'Advanced technology', hint: 'Devices, efficiency, visible results', icon: 'rf' },
      { id: 'hands', label: 'Hands-on massage', hint: 'Slow, relaxing, sculpting touch', icon: 'hands' },
      { id: 'both', label: 'A bit of both', hint: 'Technology plus a sculpting massage', icon: 'infusion' },
      { id: 'peel', label: 'A professional peel', hint: 'Renewal that builds over a series', icon: 'peel' },
    ],
  },
];

// Points per answer. Treatments not listed for an answer get 0.
export type Scores = Partial<Record<string, number>>;
export type QuizPick = { id: string; img: string; tagline: string; why: string; score: Record<string, Scores> };

export const PICKS: QuizPick[] = [
  {
    id: 'glass-skin-glow-up', img: 'glass-skin',
    tagline: 'HydroFacial, microcurrent, cryotherapy and serum infusion.',
    why: 'It deep-cleans, lifts and floods the skin with hydration in one visit, for the smooth, glassy glow it is named after.',
    score: { goal: { glow: 4, lift: 1, texture: 1 }, skin: { dry: 2, normal: 1, sensitive: 1 }, time: { '90': 2 }, style: { tech: 2, both: 1 } },
  },
  {
    id: 'sculpt-and-glow', img: 'sculpt-glow',
    tagline: '40 minutes of lymphatic drainage, then HydroFacial and RF tightening.',
    why: 'It is the most complete ritual in the studio: hands-on sculpting first, then technology to tighten and hydrate, from forehead to collarbone.',
    score: { goal: { lift: 3, puffy: 2, renew: 2, glow: 1 }, skin: { dry: 1, normal: 1, oily: 1, sensitive: 1 }, time: { '120': 3 }, style: { both: 3, hands: 1 } },
  },
  {
    id: 'oxygen-sculpt-and-glow', img: 'oxygen-sculpt',
    tagline: 'Carboxytherapy, microcurrent and cryotherapy.',
    why: 'It is built for an instant lift: oxygen and circulation from carboxytherapy, then microcurrent to tone and define.',
    score: { goal: { lift: 3, puffy: 2, glow: 1 }, skin: { normal: 1, sensitive: 1 }, time: { '60': 1, '90': 2 }, style: { tech: 2 } },
  },
  {
    id: 'oxygen-lymphatic-glow', img: 'oxygen-lymph',
    tagline: 'A long drainage massage with an oxygenating finish.',
    why: 'It is the most relaxing way to de-puff and define: a long, slow drainage massage, then oxygen and a cooling finish.',
    score: { goal: { puffy: 4, lift: 1 }, skin: { sensitive: 2, dry: 1 }, time: { '120': 3 }, style: { hands: 3, both: 1 } },
  },
  {
    id: 'diamond-hydrosculpt-deluxe-glow', img: 'diamond',
    tagline: 'Diamond resurfacing, HydroFacial, infusion and cryotherapy.',
    why: 'It polishes away rough, dull cells and clears congested pores, so texture and tone look smoother and more even.',
    score: { goal: { texture: 4, glow: 1 }, skin: { oily: 3, normal: 1, sensitive: -2 }, time: { '90': 2 }, style: { tech: 2 } },
  },
  {
    id: 'hydro-glow-freeze-facial', img: 'freeze',
    tagline: 'The express glow: cleanse, hydrate, chill.',
    why: 'It is quick, gentle and the perfect introduction to professional facials: clean, plump, glowing skin in one hour.',
    score: { goal: { glow: 2, texture: 1 }, skin: { oily: 1, dry: 1, normal: 1, sensitive: 1 }, time: { '60': 4 }, style: { tech: 1 } },
  },
  {
    id: 'oxygen-renewal-therapy', img: 'renewal',
    tagline: 'Vacuum massage, HydroFacial, oxygen, microcurrent and cryotherapy.',
    why: 'Five steps that wake up tired, stressed skin: circulation, cleansing, oxygen, lift and a calming finish.',
    score: { goal: { glow: 2, renew: 2, lift: 1 }, skin: { dry: 1, normal: 1 }, time: { '90': 2 }, style: { tech: 2, both: 1 } },
  },
  {
    id: 'let-eye-peel', img: 'peels',
    tagline: 'A delicate peel for the skin around the eyes and lips.',
    why: 'It is made for the thin skin around the eyes: it softens fine lines and crepey texture and brightens dark circles, with no downtime.',
    score: { goal: { eyes: 6, renew: 1 }, skin: { dry: 1, normal: 1, sensitive: 1, oily: 1 }, time: { '60': 1 }, style: { peel: 3, tech: 1 } },
  },
  {
    id: 'esabiopeel', img: 'esabiopeel',
    tagline: 'A biorevitalizing peel with a smoothing, Botox-like effect.',
    why: 'It activates renewal and supports collagen and elastin for smoother, firmer-looking skin, without needles.',
    score: { goal: { renew: 4, texture: 1, eyes: 1 }, skin: { dry: 1, normal: 1 }, time: {}, style: { peel: 4 } },
  },
  {
    id: 'aha-bha-peel', img: 'ig-4',
    tagline: 'A classic acid peel for pores, tone and congestion.',
    why: 'It refines pores, clears congestion and evens out tone, and it is a great first peel.',
    score: { goal: { texture: 3 }, skin: { oily: 3, normal: 1, sensitive: -2 }, time: { '60': 1 }, style: { peel: 3 } },
  },
  {
    id: 'lymphatic-buccal', img: 'massage-2',
    tagline: 'The signature sculpting pairing, in a single session.',
    why: 'Drainage takes down puffiness while buccal massage releases the deep cheek and jaw muscles, for a lifted, defined face.',
    score: { goal: { puffy: 3, lift: 3 }, skin: { sensitive: 1, normal: 1, dry: 1, oily: 1 }, time: { '60': 2, '90': 1 }, style: { hands: 4, both: 1 } },
  },
];
