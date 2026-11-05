import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  site: 'https://foodfordata.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: {
    // Open external links in a new tab (safely), for all posts
    rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]],
  },
  integrations: [sitemap({ filter: (p) => !p.includes('/404') })],
  // Old Jekyll URLs that no longer exist as pages
  redirects: {
    '/categories/': '/blog/',
    '/search/': '/blog/',
    '/offline/': '/',
    '/thanks/': '/contact/',
    '/blog/page2/': '/blog/',
    '/blog/page3/': '/blog/',
  },
});
