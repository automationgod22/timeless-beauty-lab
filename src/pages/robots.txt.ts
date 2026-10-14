import type { APIRoute } from 'astro';
import { ALLOW_INDEXING } from '../data/site';

// While the site is a demo, pages carry "noindex" and search engines may still crawl them to see it.
// Once PUBLIC_ALLOW_INDEXING=true, the sitemap is advertised too.
export const GET: APIRoute = ({ site }) => {
  const lines = ['User-agent: *', 'Allow: /'];
  if (ALLOW_INDEXING) lines.push('', `Sitemap: ${new URL('sitemap-index.xml', site).toString()}`);
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
