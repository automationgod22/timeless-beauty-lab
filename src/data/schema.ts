// Structured data (JSON-LD) that helps Google understand the business, services, prices and FAQs.
import { SITE } from './site';
import { FACIALS, PEELS, type Facial } from './content';

const abs = (site: URL, path: string) => new URL(path, site).toString();

export const businessId = (site: URL) => abs(site, '/#business');

const address = {
  '@type': 'PostalAddress',
  streetAddress: SITE.address.street,
  addressLocality: SITE.address.city,
  addressRegion: SITE.address.region,
  postalCode: SITE.address.postalCode,
  addressCountry: SITE.address.country,
};

const offer = (price?: number) =>
  price ? { '@type': 'Offer', priceCurrency: 'USD', price: String(price), priceSpecification: { '@type': 'PriceSpecification', minPrice: price, priceCurrency: 'USD' } } : undefined;

export const business = (site: URL) => ({
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  '@id': businessId(site),
  name: SITE.name,
  description:
    'Non-invasive advanced facials, professional peels and facial sculpting massage in Jersey City, NJ. HydroFacial, microcurrent, RF skin tightening, cryotherapy, carboxytherapy, lymphatic drainage and buccal massage.',
  url: abs(site, '/'),
  telephone: '+1-551-375-0997',
  image: [abs(site, '/og/default.jpg')],
  logo: abs(site, '/icon-512.png'),
  priceRange: SITE.priceRange,
  address,
  areaServed: SITE.areaServed.map((name) => ({ '@type': 'City', name })),
  sameAs: [SITE.instagram],
  hasMap: SITE.mapsUrl,
  founder: { '@type': 'Person', name: SITE.owner, jobTitle: SITE.ownerTitle },
  ...(SITE.hours ? { openingHours: SITE.hours } : {}),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Facial treatments',
    itemListElement: [
      ...FACIALS.map((f) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: f.name, url: abs(site, `/facials/${f.slug}/`) },
        ...(f.price ? { priceCurrency: 'USD', price: String(f.price) } : {}),
      })),
      ...PEELS.map((p) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: p.name, url: abs(site, '/peels/') },
        ...(p.price ? { priceCurrency: 'USD', price: String(p.price) } : {}),
      })),
    ],
  },
});

export const provider = (site: URL) => ({ '@type': 'BeautySalon', '@id': businessId(site), name: SITE.name, telephone: '+1-551-375-0997', address });

export const service = (site: URL, f: Facial, image: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: f.name,
  serviceType: 'Facial treatment',
  description: f.seoDescription,
  url: abs(site, `/facials/${f.slug}/`),
  image: abs(site, image),
  provider: provider(site),
  areaServed: { '@type': 'City', name: 'Jersey City' },
  ...(f.price ? { offers: offer(f.price) } : {}),
});

export const simpleService = (site: URL, name: string, description: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  url: abs(site, path),
  provider: provider(site),
  areaServed: { '@type': 'City', name: 'Jersey City' },
});

export const breadcrumbs = (site: URL, items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(site, path) })),
});

export const faqPage = (faqs: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

// A service with a catalog of priced items (peels, massages).
export const catalogService = (
  site: URL,
  opts: { name: string; serviceType: string; description: string; path: string; items: { name: string; text: string; price?: number }[] },
) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: opts.name,
  serviceType: opts.serviceType,
  description: opts.description,
  url: abs(site, opts.path),
  provider: provider(site),
  areaServed: { '@type': 'City', name: 'Jersey City' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: opts.name,
    itemListElement: opts.items.map((it) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: it.name, description: it.text },
      ...(it.price ? { priceCurrency: 'USD', price: String(it.price) } : {}),
    })),
  },
});
