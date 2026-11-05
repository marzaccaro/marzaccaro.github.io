# Food for Data

Personal site of Martina Zaccaron ([foodfordata.com](https://foodfordata.com)), built with [Astro](https://astro.build) and deployed to GitHub Pages via GitHub Actions.

## Preview the site locally

You need [Node.js](https://nodejs.org) 22 or newer.

1. Open a terminal in this folder.
2. Install dependencies (first time only, or after `package.json` changes):
   ```sh
   npm install
   ```
3. Start the preview server:
   ```sh
   npm run dev
   ```
4. Open **http://localhost:4321** in your browser.

While the server runs, saving a file in `src/` or `public/` refreshes the browser automatically. Stop the server with `Ctrl+C`.

To check the real production build (what GitHub Pages will serve):

```sh
npm run build      # outputs to dist/
npm run preview    # serves dist/ at http://localhost:4321
```

To see the site on your phone, connect it to the same Wi-Fi and run `npm run dev -- --host`. Astro prints a "Network" address to open on the phone.

## Publish

Pushing to `main` builds and deploys the site through GitHub Actions (`.github/workflows/deploy.yml`). In the repo's Settings → Pages, the source must be set to "GitHub Actions".

## Where things are

- Pages: `src/pages/`
- Blog posts: `src/content/blog/*.md` (the `permalink` front matter keeps the original `/YYYY/MM/DD/slug/` URLs)
- Site-wide settings (name, links, contact email): `src/site.ts`
