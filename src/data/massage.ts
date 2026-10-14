// Copy for the two dedicated facial massage pages. Each page targets its own Google search.
import type { Step } from './content';

export type MassagePage = {
  slug: string;
  name: string;
  h1: string;
  eyebrow: string;
  lede: string;
  img: string;
  imgAlt: string;
  what: string[];
  benefits: string[];
  idealFor: string[];
  visit: Step[];
  results: string[];
  bookId: string;
  faqs: [string, string][];
  seoTitle: string;
  seoDescription: string;
};

export const MASSAGE_PAGES: MassagePage[] = [
  {
    slug: 'lymphatic-drainage-facial',
    name: 'Lymphatic drainage facial massage',
    h1: 'Lymphatic drainage *facial massage*',
    eyebrow: 'Facial massage',
    lede: 'Slow, rhythmic, hands-on drainage that de-puffs the face, releases tension and brings back a defined contour, often visible after a single session.',
    img: 'massage',
    imgAlt: 'Lymphatic drainage facial massage along the cheekbones in a calm treatment room',
    what: [
      'Lymphatic drainage is a gentle manual technique that follows the natural pathways of the lymphatic system. Light, rhythmic movements encourage excess fluid to move toward the lymph nodes, so the face looks less puffy, more rested and more sculpted.',
      'Tatiana works across the neck, jaw, cheeks and eye area, adapting every movement to your face on the day. It can be booked on its own, as a five-session program, or paired with buccal massage, carboxytherapy or RF skin tightening.',
    ],
    benefits: ['Less puffiness and fluid retention', 'A more defined jawline and cheekbones', 'Released tension in the jaw, forehead and neck', 'A rested, healthy-looking glow'],
    idealFor: ['Morning puffiness or under-eye bags', 'Jaw tension or clenching', 'The days before an event or photos', 'Anyone who wants a deeply relaxing ritual'],
    visit: [
      { icon: 'eye', name: 'A short consultation', text: 'Your goals, your skin and anything relevant, like recent injectables or medical conditions.' },
      { icon: 'hands', name: 'The drainage massage', text: 'Slow, rhythmic movements from the neck to the forehead. Most clients drift off.' },
      { icon: 'infusion', name: 'Back to your day', text: 'No downtime. Drink plenty of water, and let the contour keep settling over the next hours.' },
    ],
    results: ['r-2', 'r-4', 'r-9'],
    bookId: 'lymphatic-drainage',
    faqs: [
      ['How many sessions do I need?', 'You will usually see less puffiness after one session. For a longer-lasting, more defined contour, a program of five sessions works best, like several of the results on this page.'],
      ['Does lymphatic drainage hurt?', 'No. The pressure is light and rhythmic. Most clients find it one of the most relaxing treatments on the menu.'],
      ['How long do the results last?', 'The first de-puffing effect lasts a few days. A regular program, good hydration and sleep keep the contour defined for longer.'],
      ['Is it right for everyone?', 'If you are pregnant, have an active infection, a heart or kidney condition or a clotting disorder, check with your doctor first and mention it when you book.'],
    ],
    seoTitle: 'Lymphatic Drainage Facial Massage in Jersey City | Timeless Beauty Lab',
    seoDescription:
      'Manual lymphatic drainage facial massage in Jersey City to reduce puffiness, release tension and define your contour. Single sessions and 5-session programs.',
  },
  {
    slug: 'buccal-massage',
    name: 'Buccal massage',
    h1: 'Buccal *facial massage*',
    eyebrow: 'Facial sculpting',
    lede: 'A sculpting massage performed partly from inside the mouth, to reach the deep muscles of the cheeks and jaw that ordinary facials cannot.',
    img: 'massage-2',
    imgAlt: 'Sculpting facial massage along the cheek and jaw',
    what: [
      'Buccal massage is an advanced, non-invasive facial sculpting technique. Wearing new medical gloves, Tatiana works on the muscles of the cheeks and jaw from inside the mouth as well as from the outside.',
      'Releasing these deep muscles relaxes tension, improves tone and gives the face a more lifted, defined look. It pairs beautifully with lymphatic drainage, which is why the combination is one of the most booked treatments in the studio.',
    ],
    benefits: ['More defined cheekbones', 'A smoother, more lifted lower face', 'Relief from jaw tension and clenching', 'A more balanced, symmetrical look over time'],
    idealFor: ['A tired or heavy-looking lower face', 'Clenching or grinding tension', 'Anyone who wants a natural lift without needles'],
    visit: [
      { icon: 'eye', name: 'A short consultation', text: 'Your goals, any jaw tension and anything relevant, like recent injectables or dental work.' },
      { icon: 'hands', name: 'Warm-up and drainage', text: 'The face and neck are prepared from the outside with lymphatic and sculpting movements.' },
      { icon: 'micro', name: 'Intraoral sculpting', text: 'Gloved, focused work on the deep cheek and jaw muscles. Firm but never painful, and you can pause at any time.' },
    ],
    results: ['r-1', 'r-3', 'r-8'],
    bookId: 'buccal-massage',
    faqs: [
      ['Is buccal massage uncomfortable?', 'It can feel intense in tight areas, but it should never be painful. Tatiana adjusts the pressure throughout and you can pause at any time.'],
      ['Is it hygienic?', 'Yes. The intraoral part is always performed with new medical gloves.'],
      ['How often should I book?', 'A course of sessions a few weeks apart gives the most lasting result. Many clients pair it with lymphatic drainage in a single visit.'],
      ['Can I have it after fillers or Botox?', 'Please wait and check with the practitioner who treated you, and mention any injectables when you book.'],
    ],
    seoTitle: 'Buccal Massage in Jersey City | Intraoral Facial Sculpting',
    seoDescription:
      'Buccal (intraoral) facial massage in Jersey City releases the deep cheek and jaw muscles for a lifted, sculpted look. Often paired with lymphatic drainage.',
  },
];
