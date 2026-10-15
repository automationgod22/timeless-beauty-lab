// Business details used everywhere: header, footer, schema, booking links.
// Edit here once and every page updates.

export const SITE = {
  name: 'Timeless Beauty Lab',
  owner: 'Tatiana',
  ownerTitle: 'Licensed cosmetologist',
  tagline: 'Advanced facials, professional peels and facial sculpting in Jersey City, NJ.',
  phone: '+15513750997',
  phoneDisplay: '(551)\u00a0375\u20110997', // non-breaking, so the number never splits across lines
  whatsapp: '15513750997', // confirm this number is on WhatsApp
  instagram: 'https://www.instagram.com/timeless_beauty_lab/',
  instagramHandle: '@timeless_beauty_lab',
  instagramDM: 'https://ig.me/m/timeless_beauty_lab',
  address: {
    street: '611 Washington Blvd, Suite 113',
    building: 'Phenix Salon Suites',
    city: 'Jersey City',
    region: 'NJ',
    postalCode: '07310',
    country: 'US',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=611+Washington+Blvd+Suite+113+Jersey+City+NJ+07310',
  hours: '', // e.g. 'Tue–Sat, 10am–7pm'. Leave empty until confirmed.
  priceRange: '$$$',
  yearsExperience: 8,
  areaServed: ['Jersey City', 'Hoboken', 'New York City'],
};

// Keep search engines away from the demo. Set PUBLIC_ALLOW_INDEXING=true in Vercel once the site is live on her domain.
export const ALLOW_INDEXING = import.meta.env.PUBLIC_ALLOW_INDEXING === 'true';

export const waLink = (message: string) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
export const fullAddress = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`;
