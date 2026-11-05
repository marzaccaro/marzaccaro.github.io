import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../site';

export async function GET(context) {
  const posts = (await getCollection('blog')).sort((a, b) => +b.data.date - +a.data.date);
  return rss({
    title: site.name,
    description: site.description,
    site: context.site,
    items: posts.map((p) => ({ title: p.data.title, pubDate: p.data.date, link: p.data.permalink })),
  });
}
