// The website offer shown in the corner card. Change `key` to show a new offer to visitors who closed the old one.
export const OFFER = {
  enabled: true,
  key: 'glass-skin-web5',
  treatment: 'glass-skin-glow-up',
  percent: 5,
  code: 'WEBSITE5',
  /** seconds on the site (counted across pages) before the card appears */
  afterSeconds: 30,
  /** or once the visitor has scrolled this share of a long page… */
  atScroll: 0.6,
  /** …but never in the first seconds of a visit */
  minSeconds: 8,
  /** how long "Not now" keeps it away */
  snoozeDays: 7,
};
