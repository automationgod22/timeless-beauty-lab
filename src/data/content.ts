// All treatment content, prices and FAQs. Edit text and prices here.
// price: a number shows as "From $X"; leave it out to show "Price on request".

export type IconName =
  | 'hydro' | 'micro' | 'rf' | 'cryo' | 'carboxy' | 'diamond' | 'infusion' | 'hands' | 'vacuum' | 'peel' | 'eye' | 'oxygen';

export type Step = { icon: IconName; name: string; text: string };

export type Facial = {
  slug: string;
  name: string;
  minutes: string;
  price?: number;
  img: string;
  imgAlt: string;
  flag?: string;
  tagline: string;
  intro: string;
  steps: Step[];
  benefits: string[];
  idealFor: string[];
  faqs: [string, string][];
  seoTitle: string;
  seoDescription: string;
};

const S = {
  hydro: { icon: 'hydro', name: 'HydroFacial', text: 'Hydro-exfoliation and gentle suction clear pores, lift away dead cells and refine texture.' },
  micro: { icon: 'micro', name: 'Microcurrent', text: 'A gentle current tones the facial muscles for higher cheekbones and a sharper jawline.' },
  cryo: { icon: 'cryo', name: 'Cryotherapy', text: 'Chilled globes glide over the face to tighten pores, calm redness and seal in the glow.' },
  infusion: { icon: 'infusion', name: 'Serum infusion', text: 'Professional serums are pressed deep into the skin for lasting hydration.' },
  carboxy: { icon: 'carboxy', name: 'Carboxytherapy', text: 'A CO₂ treatment applied to the skin that draws oxygen and fresh circulation to the surface.' },
  lymph: { icon: 'hands', name: 'Lymphatic drainage massage', text: 'Slow, rhythmic strokes reduce puffiness, release tension and define the contour.' },
  lymph40: { icon: 'hands', name: 'Lymphatic drainage, 40 minutes', text: 'A full hands-on drainage massage that de-puffs and sculpts before any device touches the skin.' },
  rf: { icon: 'rf', name: 'RF skin tightening', text: 'Radiofrequency warms the deeper layers of the face and décolleté to support firmness.' },
  diamond: { icon: 'diamond', name: 'Diamond microdermabrasion', text: 'A diamond-tip handpiece polishes away rough, dull surface cells.' },
  vacuum: { icon: 'vacuum', name: 'Vacuum massage', text: 'Gentle rhythmic suction wakes up circulation and relieves tension.' },
  oxy: { icon: 'oxygen', name: 'Oxygen infusion', text: 'A fine oxygen mist delivers nourishing serums to tired, stressed skin.' },
} satisfies Record<string, Step>;

export const FACIALS: Facial[] = [
  {
    slug: 'glass-skin-glow-up',
    name: 'Glass Skin Glow Up',
    minutes: '90 min',
    price: 295,
    img: 'glass-skin',
    imgAlt: 'LED and HydroFacial handpiece on glowing skin during a Glass Skin Glow Up facial',
    flag: 'Most requested',
    tagline: 'Deep cleanse, lift and hydration for a smooth, glass-like glow.',
    intro:
      'Our most requested treatment, and the one clients book before every big moment. Glass Skin Glow Up layers four professional technologies into one 90-minute ritual that deep-cleanses, lifts and floods the skin with hydration. You leave with a smooth, luminous finish and no downtime.',
    steps: [S.hydro, S.micro, S.cryo, S.infusion],
    benefits: ['Instantly smoother, more even texture', 'A visible glow that lasts for days', 'Lifted, refreshed contours', 'Deep hydration without heaviness'],
    idealFor: ['Dull, dehydrated or tired-looking skin', 'The week before an event or photos', 'Anyone who wants results with no downtime'],
    faqs: [
      ['How long do the results last?', 'Most clients enjoy their glow for several days. For lasting change in texture and tone, a monthly Glass Skin Glow Up works best.'],
      ['Is it suitable for sensitive skin?', 'Yes. Every step is adjusted to your skin on the day, and the cryotherapy finish helps calm redness.'],
      ['Can I go back to work afterwards?', 'Absolutely. There is no downtime, just fresh, glowing skin.'],
    ],
    seoTitle: 'Glass Skin Glow Up Facial in Jersey City | HydroFacial + Microcurrent',
    seoDescription:
      'Our most requested 90-minute facial: HydroFacial, microcurrent lift, cryotherapy and serum infusion for smooth, glass-like skin. From $295 in Jersey City, NJ.',
  },
  {
    slug: 'sculpt-and-glow',
    name: 'Sculpt & Glow',
    minutes: '120 min',
    price: 335,
    img: 'sculpt-glow',
    imgAlt: 'Lymphatic drainage facial massage along the jaw and neck during Sculpt & Glow',
    flag: 'Most complete',
    tagline: 'Forty minutes of sculpting massage, then HydroFacial and RF tightening.',
    intro:
      'The most complete ritual in the studio. Sculpt & Glow begins with 40 minutes of hands-on lymphatic drainage to de-puff and define, then moves to a HydroFacial, radiofrequency tightening across the face and décolleté, cryotherapy and a hydrating infusion. Two hours, from forehead to collarbone.',
    steps: [S.lymph40, S.hydro, S.rf, S.cryo, S.infusion],
    benefits: ['Sculpted cheekbones and a defined jawline', 'Less puffiness and fluid retention', 'Firmer-looking skin on the face and décolleté', 'A deeply relaxed, rested look'],
    idealFor: ['A full reset before a wedding or event', 'Puffiness or a tired contour', 'Clients who love both massage and technology'],
    faqs: [
      ['Why does it take two hours?', 'The first 40 minutes are a full lymphatic drainage massage that prepares the skin and contours before the device steps. Nothing is rushed.'],
      ['Does RF skin tightening hurt?', 'No. Radiofrequency feels like a gentle, comfortable warmth.'],
      ['How often should I book it?', 'Once a month keeps the contour defined. Before an event, book it a few days ahead.'],
    ],
    seoTitle: 'Sculpt & Glow Facial: Lymphatic Drainage, HydroFacial & RF | Jersey City',
    seoDescription:
      'A 2-hour sculpting facial in Jersey City: 40 minutes of lymphatic drainage, HydroFacial, RF skin tightening for face and décolleté, cryotherapy and infusion. From $335.',
  },
  {
    slug: 'oxygen-sculpt-and-glow',
    name: 'Oxygen Sculpt & Glow',
    minutes: '75–90 min',
    img: 'oxygen-sculpt',
    imgAlt: 'Glowing, hydrated skin after an oxygen facial',
    tagline: 'Instant lift, de-puffing and a radiant glow.',
    intro:
      'A focused lifting facial built around oxygen and muscle tone. Carboxytherapy boosts oxygen and circulation, microcurrent lifts and tones the facial muscles, and a cryotherapy finish calms and tightens, for an instantly fresher, more sculpted face.',
    steps: [S.carboxy, S.micro, S.cryo],
    benefits: ['An instant, natural lift', 'Less puffiness around the eyes and jaw', 'Brighter, more even tone', 'Calm, refined pores'],
    idealFor: ['Puffy or tired-looking skin', 'A quick lift before plans', 'Dull or uneven tone'],
    faqs: [
      ['What is carboxytherapy?', 'A CO₂ treatment applied to the skin that encourages oxygen and circulation at the surface, leaving it brighter and less puffy.'],
      ['Will I look red afterwards?', 'Usually not. Most clients leave with a fresh glow and go straight back to their day.'],
      ['Can I combine it with a peel?', 'Yes. Mention it when booking and Tatiana will plan the right combination for your skin.'],
    ],
    seoTitle: 'Oxygen Sculpt & Glow: Carboxytherapy + Microcurrent Facial | Jersey City',
    seoDescription:
      'Carboxytherapy, microcurrent and cryotherapy in one 75–90 minute facial for an instant lift, less puffiness and a radiant glow. Non-invasive facials in Jersey City, NJ.',
  },
  {
    slug: 'oxygen-lymphatic-glow',
    name: 'Oxygen Lymphatic Glow',
    minutes: '120 min',
    img: 'oxygen-lymph',
    imgAlt: 'Relaxing lymphatic drainage facial massage in a calm treatment room',
    tagline: 'Hands-on drainage massage with an oxygenating finish.',
    intro:
      'For clients who come for the hands. A long, slow lymphatic drainage facial massage de-puffs, releases tension and defines the contour. Then carboxytherapy brings oxygen and circulation back to the skin, and a cryotherapy finish seals the glow.',
    steps: [S.lymph, S.carboxy, S.cryo],
    benefits: ['Visibly less puffiness and fluid retention', 'A more sculpted, defined face', 'Deep relaxation and released tension', 'Fresh, oxygenated color'],
    idealFor: ['Morning puffiness', 'Jaw and facial tension', 'Anyone who wants the most relaxing ritual'],
    faqs: [
      ['Is lymphatic drainage relaxing?', 'Very. The strokes are slow, rhythmic and gentle, and many clients drift off.'],
      ['How soon will I see a difference?', 'Puffiness usually reduces after the first session. A course of sessions gives longer-lasting definition.'],
      ['Should I drink more water afterwards?', 'Yes. Staying well hydrated after drainage massage helps the results.'],
    ],
    seoTitle: 'Oxygen Lymphatic Glow: Lymphatic Drainage Facial + Carboxy | Jersey City',
    seoDescription:
      'A 2-hour lymphatic drainage facial massage with carboxytherapy and cryotherapy to de-puff, sculpt and restore glow. Book in Jersey City, NJ.',
  },
  {
    slug: 'diamond-hydrosculpt-deluxe-glow',
    name: 'Diamond HydroSculpt Deluxe Glow',
    minutes: '90 min',
    img: 'diamond',
    imgAlt: 'Professional handpiece used during a resurfacing facial',
    tagline: 'Diamond resurfacing and HydroFacial for smooth, even skin.',
    intro:
      'A resurfacing facial for texture and tone. A diamond-tip handpiece polishes away dead skin cells, a HydroFacial clears congested pores, and an infusion with a cryotherapy finish leaves skin smooth, even and bright.',
    steps: [S.diamond, S.hydro, S.cryo, S.infusion],
    benefits: ['Softer, smoother texture', 'Clearer, refined pores', 'More even, brighter tone', 'Better absorption of your skincare'],
    idealFor: ['Rough or uneven texture', 'Congested pores and dullness', 'A reset between peels'],
    faqs: [
      ['Is diamond microdermabrasion harsh?', 'No. The intensity is adjusted to your skin, and it feels like a light, polishing pressure.'],
      ['Is there downtime?', 'Skin may look slightly pink for a short while, then smooth and bright.'],
      ['How many sessions do I need?', 'One session gives instant smoothness. A series of sessions works best for texture and tone.'],
    ],
    seoTitle: 'Diamond Microdermabrasion + HydroFacial in Jersey City | Deluxe Glow',
    seoDescription:
      'Diamond microdermabrasion, HydroFacial, infusion and cryotherapy in one 90-minute facial for smoother texture, clearer pores and brighter tone. Jersey City, NJ.',
  },
  {
    slug: 'hydro-glow-freeze-facial',
    name: 'Hydro Glow Freeze Facial',
    minutes: '60 min',
    img: 'freeze',
    imgAlt: 'Cryotherapy globe gliding over the cheek for a calm, cool finish',
    flag: 'Great first visit',
    tagline: 'The express glow: cleanse, hydrate, chill.',
    intro:
      'Our express facial and the perfect first visit. A deep hydro-cleanse, a hydrating serum infusion and an icy cryotherapy finish leave skin clean, plump and glowing in just one hour.',
    steps: [S.hydro, S.infusion, S.cryo],
    benefits: ['Deeply clean pores', 'Instant hydration and plumpness', 'Tighter-looking pores', 'A fresh glow in 60 minutes'],
    idealFor: ['First-time clients', 'A lunchtime refresh', 'Dehydrated or congested skin'],
    faqs: [
      ['Is this a good first facial?', 'Yes. It is gentle, quick and shows you how your skin responds to professional treatments.'],
      ['Can I go back to work after?', 'Absolutely. There is no downtime.'],
      ['How often can I book it?', 'Every few weeks keeps skin clear and hydrated.'],
    ],
    seoTitle: 'Hydro Glow Freeze Facial in Jersey City | 60-Minute HydroFacial',
    seoDescription:
      'A 60-minute express HydroFacial with serum infusion and cryotherapy for clean, plump, glowing skin. The perfect first facial in Jersey City, NJ.',
  },
  {
    slug: 'oxygen-renewal-therapy',
    name: 'Oxygen Renewal Therapy',
    minutes: '90 min',
    img: 'renewal',
    imgAlt: 'HydroFacial tip on dewy skin during Oxygen Renewal Therapy',
    tagline: 'Five steps that revive stressed, tired skin.',
    intro:
      'A complete revival for stressed, tired or sluggish skin. Vacuum massage wakes up circulation, a HydroFacial cleanses, an oxygen infusion nourishes, microcurrent lifts and cryotherapy seals in the result.',
    steps: [S.vacuum, S.hydro, S.oxy, S.micro, S.cryo],
    benefits: ['A brighter, more awake complexion', 'Boosted circulation and color', 'Lifted, toned contours', 'Calm, hydrated skin'],
    idealFor: ['Stressed or tired-looking skin', 'Busy seasons and travel', 'Dull skin that needs energy'],
    faqs: [
      ['What does vacuum massage feel like?', 'A gentle, rhythmic suction that stimulates circulation. Most clients find it very relaxing.'],
      ['Is it good after travel?', 'Yes. It is one of the best treatments for skin that looks tired after flights or long weeks.'],
      ['How long is the visit?', 'About 90 minutes, in a calm, private suite.'],
    ],
    seoTitle: 'Oxygen Renewal Therapy: Oxygen Facial + Microcurrent | Jersey City',
    seoDescription:
      'A 90-minute oxygen facial with vacuum massage, HydroFacial, oxygen infusion, microcurrent and cryotherapy to revive tired, stressed skin. Jersey City, NJ.',
  },
];

export const TECH: { icon: IconName; img: string; name: string; text: string; notice: string }[] = [
  { icon: 'hydro', img: 'tech-hydro', name: 'HydroFacial', text: 'Hydro-exfoliation with gentle suction lifts out congestion and smooths texture while it hydrates.', notice: 'Clearer pores and an instant glow.' },
  { icon: 'micro', img: 'ig-2', name: 'Microcurrent', text: 'A low-level current that tones the facial muscles, like a workout for your contours.', notice: 'Lifted cheeks and a sharper jawline.' },
  { icon: 'rf', img: 'tech-rf', name: 'RF skin tightening', text: 'Radiofrequency gently warms the deeper layers of the skin to support collagen and firmness.', notice: 'Firmer, smoother skin over a course.' },
  { icon: 'cryo', img: 'tech-cryo', name: 'Cryotherapy', text: 'Chilled globes calm the skin, tighten pores and take down redness and puffiness.', notice: 'A calm, tight, glassy finish.' },
  { icon: 'carboxy', img: 'tech-carboxy', name: 'Carboxytherapy', text: 'A CO₂ treatment applied to the skin that draws oxygen and fresh circulation to the surface.', notice: 'A brighter tone and less puffiness.' },
  { icon: 'diamond', img: 'tech-diamond', name: 'Diamond microdermabrasion', text: 'A diamond-coated tip polishes away dead skin cells for a smoother, more even surface.', notice: 'Softer texture and better serum absorption.' },
];

export type Item = { id: string; name: string; by?: string; price?: number; text: string; minutes?: string };

export const PEELS: Item[] = [
  { id: 'let-eye-peel', name: 'LET Eye Peel', by: 'by Aesthetical', price: 200, text: 'A delicate peel made for the thin skin around the eyes and lips. Softens fine lines and crepey texture, brightens dark circles and improves hydration and elasticity, with no downtime.' },
  { id: 'esabiopeel', name: 'ESABIOPEEL', by: 'Biorevitalizing peel by Aesthetical', text: 'Activates skin renewal and supports collagen and elastin for a smoothing, Botox-like effect, without needles.' },
  { id: 'oenanthe-peel', name: 'OENANTHE', by: 'Biorevitalizing peel', text: 'A renewing peel with a lifting effect, for skin that looks firmer and more toned.' },
  { id: 'lami-glass-skin-renewal', name: 'LAMI Glass Skin Renewal', by: 'Peel ritual', text: 'The LAMI peel, followed by an intensive hydrating and calming treatment and a cryotherapy finish.' },
  { id: 'aha-bha-peel', name: 'AHA/BHA facial peel', by: 'Classic acid peel', text: 'Refines pores, evens out tone and clears congestion. A great first peel.' },
];

export const MASSAGES: (Item & { href?: string })[] = [
  { id: 'lymphatic-drainage', name: 'Lymphatic drainage', text: 'Gentle, rhythmic strokes that reduce puffiness and fluid retention.', href: '/facial-massage/lymphatic-drainage-facial/' },
  { id: 'myofascial-massage', name: 'Myofascial massage', text: 'Deep work on the facial fascia to release tension and restore contour.' },
  { id: 'buccal-massage', name: 'Buccal massage', text: 'Massage from inside the mouth that releases the deep muscles of the cheeks and jaw.', href: '/facial-massage/buccal-massage/' },
  { id: 'lymphatic-buccal', name: 'Lymphatic drainage + buccal', text: 'The signature pairing for a lifted, defined face in a single session.' },
  { id: 'lymphatic-buccal-rf', name: 'Lymphatic + buccal + RF skin tightening', text: 'The signature pairing, finished with RF tightening for extra firmness.' },
  { id: 'lymphatic-carboxy', name: 'Lymphatic drainage + carboxytherapy', text: 'Drainage massage followed by an oxygenating carboxy treatment.' },
];

export const FAQ_GENERAL: [string, string][] = [
  ['Are any of the treatments injectable?', 'No. Every treatment at Timeless Beauty Lab is non-invasive: professional devices, peels and manual facial sculpting. No needles and no fillers.'],
  ['Is there any downtime?', 'Most treatments have no downtime, so you can go straight back to your day. Most peels leave little or no visible peeling, and you get personal aftercare advice for your skin.'],
  ['Which treatment should I start with?', 'New clients love the Hydro Glow Freeze Facial or Glass Skin Glow Up. Not sure? Take the 30-second skin quiz or send a message with your skin goals for a personal recommendation.'],
  ['How often should I come?', 'Most facials work best every 3 to 5 weeks. Lymphatic drainage and buccal sculpting give the most lasting contour as a course of sessions. Tatiana will suggest a plan for your goals.'],
  ['How should I prepare for my visit?', 'Arrive with clean skin if you can. Let us know about any recent injectables, peels, retinoids or skin conditions when you book so your treatment can be adapted.'],
  ['Is every treatment right for everyone?', 'Some treatments are not suitable during pregnancy, right after injectables or with certain medical devices or skin conditions. Mention anything relevant when booking and Tatiana will recommend a safe alternative.'],
  ['Where is the studio?', 'Suite 113 at Phenix Salon Suites, 611 Washington Blvd, Jersey City, NJ 07310. A calm, private suite with one client at a time.'],
  ['How do I book?', 'Use the booking form, send a DM on Instagram, or message on WhatsApp. Your exact time is confirmed personally.'],
];

export const FAQ_PEELS: [string, string][] = [
  ['Will my skin peel?', 'Most of our peels leave little or no visible peeling. You will know exactly what to expect for your peel before you start.'],
  ['How many peels do I need?', 'Many skin goals respond best to a series of peels spaced a few weeks apart. Tatiana will recommend a plan after a short consultation.'],
  ['Can I have a peel in summer?', 'Several of our peels are suitable year-round. Daily SPF is essential after any peel.'],
];

export const BA = [
  { n: 1, title: 'Lymphatic drainage + buccal massage', note: 'One session' },
  { n: 2, title: 'Sculpting, resurfacing peels and collagen renewal', note: 'Treatment series' },
  { n: 3, title: 'LET Eye Peel by Aesthetical', note: 'Eye area' },
  { n: 4, title: 'Facial sculpting massage', note: 'One session' },
];

export const GALLERY: { img: string; title: string; note: string }[] = [
  { img: 'r-1', title: 'Buccal and lymphatic facial massage', note: 'One session' },
  { img: 'r-3', title: 'Combined lymphatic and buccal massage', note: 'One session' },
  { img: 'r-6', title: 'ESABIOPEEL and LET Peel combination', note: 'Peel results' },
  { img: 'r-2', title: 'Lymphatic drainage program', note: 'After 5 sessions' },
  { img: 'r-7', title: 'LET Peel, eye area', note: 'One session' },
  { img: 'r-4', title: 'Lymphatic drainage massage', note: 'One session' },
  { img: 'r-5', title: 'Facial sculpting massage', note: 'Contour and lift' },
  { img: 'r-8', title: 'Lymphatic drainage + buccal', note: 'Combined massage' },
  { img: 'r-9', title: 'Lymphatic drainage program', note: 'After 5 sessions' },
];

// Add real reviews here (from her Instagram highlight or Google). The section stays hidden until this has entries.
export const REVIEWS: { quote: string; name: string; treatment: string }[] = [];

export const priceLabel = (p?: number) => (p ? `From $${p}` : 'Price on request');

// One list of everything that can be booked. Used by the booking form, the skin quiz and the price menu.
export type Bookable = { id: string; name: string; group: 'Signature facials' | 'Professional peels' | 'Facial massage'; minutes?: string; price?: number; href: string };
export const BOOKABLE: Bookable[] = [
  ...FACIALS.map((f) => ({ id: f.slug, name: f.name, group: 'Signature facials' as const, minutes: f.minutes, price: f.price, href: `/facials/${f.slug}/` })),
  ...PEELS.map((p) => ({ id: p.id, name: p.name, group: 'Professional peels' as const, minutes: p.minutes, price: p.price, href: '/peels/' })),
  ...MASSAGES.map((m) => ({ id: m.id, name: m.name, group: 'Facial massage' as const, minutes: m.minutes, price: m.price, href: m.href ?? '/facial-massage/' })),
];

export const PEEL_VISIT: Step[] = [
  { icon: 'eye', name: 'Skin consultation', text: 'Your skin, goals, routine and any recent treatments are reviewed so the right peel and strength are chosen.' },
  { icon: 'hydro', name: 'Cleanse and prep', text: 'The skin is deeply cleansed and prepared so the peel works evenly.' },
  { icon: 'peel', name: 'Peel application', text: 'The peel is applied and closely watched, layer by layer, for a controlled result.' },
  { icon: 'cryo', name: 'Calming finish', text: 'A soothing, hydrating finish and SPF protect the fresh skin.' },
  { icon: 'infusion', name: 'Personal aftercare', text: 'You leave with simple aftercare for the next few days to protect and boost the result.' },
];
