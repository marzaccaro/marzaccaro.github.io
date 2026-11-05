# CLAUDE.md

Personal site of Martina Zaccaron, freelance analytics engineer (dbt) — foodfordata.com. Astro static site, deployed to GitHub Pages via GitHub Actions on push to `main`.

## Commands

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve dist/
```

No test suite. Verify changes with `npm run build` (must finish with no errors) and look at the pages in a browser.

## Layout

- `src/site.ts` — single source of truth: site name, tagline, description, nav, social links, contact email, legal details (P. IVA, city, address). Change these here, not in pages.
- `src/pages/` — index, about, contact, legal, 404, blog index, rss/feed, and `[year]/[month]/[day]/[slug].astro` for posts.
- `src/content/blog/*.md` — posts. Front matter: `title`, `date`, `permalink`, `category`, optional `description`, `image`. The `permalink` (`/YYYY/MM/DD/slug/`) is what the post route uses, so it must stay unchanged to preserve old URLs.
- `src/layouts/Base.astro` — all `<head>` metadata (canonical, Open Graph, Twitter, JSON-LD). Every page should pass its own `title` and `description`.
- `src/styles/global.css` — all styling; design tokens as CSS variables at the top (light + dark).
- `public/` — static files: `uploads/` (post images, served at `/uploads/`), `logos/`, `social.png` (1200×630 share image), `CNAME`, `robots.txt`.
- `.github/workflows/deploy.yml` — build and deploy. Repo Pages source must be set to "GitHub Actions".

## Conventions and gotchas

- `trailingSlash: 'always'` — internal links end with `/`. A redirect to a file like `/rss.xml` would get a slash appended and break, so `feed.xml` is a real route that re-exports the RSS handler instead of a redirect.
- Old Jekyll URLs that no longer exist as pages are redirected in `astro.config.mjs`. Keep every previously public URL working (posts, `/blog/`, `/feed.xml`).
- Images in posts use plain `<figure>` HTML with `/uploads/...` paths (migrated from Jekyll includes). Don't reintroduce Liquid tags.
- **Contact email must never appear as plain text.** Render it only through `src/components/Email.astro`, which builds the address in the browser. Don't write the address literally in pages, and don't put a personal Gmail address anywhere on the site; use the `hello@foodfordata.com` forwarding alias.
- The site has no cookies, analytics, forms or third-party requests (fonts are self-hosted via `@fontsource-variable/inter`), and `/legal/` says so. If you add any of those, update the privacy notice on `/legal/` and add cookie handling.
- The Legal page and footer must keep showing the P. IVA and the business address/city (Italian e-commerce rules, D.Lgs. 70/2003 art. 7). Don't remove them.
- Keep the tone of copy plain and specific. Don't mention part-time availability anywhere.
- Spelling is British English (`lang="en-GB"`).
