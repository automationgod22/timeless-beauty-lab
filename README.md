# Timeless Beauty Lab website

A fast, multi-page site for Timeless Beauty Lab (Jersey City, NJ), built with [Astro](https://astro.build), GSAP and Lenis. It deploys to Vercel as a static site.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Where to edit things

| What | File |
| --- | --- |
| Name, phone, WhatsApp, address, hours, Instagram | `src/data/site.ts` |
| Facials, peels, massages, prices, FAQs, results captions | `src/data/content.ts` |
| Client quotes (home wall, page quotes, results “inbox”) | `src/data/reviews.ts` |
| Lymphatic drainage and buccal massage pages | `src/data/massage.ts` |
| Skin quiz questions and scoring | `src/data/quiz.ts` |
| Colors, type, spacing, dark mode | `src/styles/global.css` |
| Animations, smooth scroll, theme switch | `src/scripts/main.ts` |
| Booking form | `src/pages/book.astro`, `src/scripts/book.ts` |

**Prices.** Give a treatment `price: 250` and every page shows "From $250": cards, the price menu, the booking form, the quiz and the structured data Google reads. Without a price it shows "Price on request".

**Reviews.** Real quotes from the studio's Instagram highlights live in `src/data/reviews.ts`, quoted as written. Add a `shot` (a cropped screenshot in `src/assets/img`) to show the original on the results page, or a `photo` for a before/after pair. Before launch, confirm with Tatiana that each client is happy to be quoted.

**Hours.** Set `hours` in `site.ts` (for example `'Tue–Sat, 10am–7pm'`) and it shows on the site and in Google's business data.

**Images.** Photos live in `src/assets/img/` as `.webp` and are referenced by file name (for example `img: 'glass-skin'`). Astro resizes and compresses them at build time. Videos and their posters are in `public/video/`. Share images for social media are in `public/og/`.

## Deploying on Vercel

Import the GitHub repository in Vercel. It detects Astro automatically; no settings are needed for the demo.

The demo is hidden from Google on purpose (every page has `noindex`). When the site moves to Tatiana's own domain, add these environment variables in Vercel, then redeploy:

| Variable | Value |
| --- | --- |
| `PUBLIC_ALLOW_INDEXING` | `true` |
| `SITE_URL` | `https://her-domain.com` |

That switches on indexing, puts the sitemap in `robots.txt` and makes every canonical URL, share image and structured-data link use the real domain.

## SEO already built in

- A unique title, description and canonical URL on every page, with Open Graph and Twitter share images.
- Structured data: BeautySalon (address, phone, services and prices), Service pages, breadcrumbs and FAQs.
- One page per facial and per massage technique, each written for its own Google searches.
- Sitemap at `/sitemap-index.xml`, `robots.txt`, image alt text, fast loading (self-hosted fonts, responsive WebP images).
