export const site = {
  name: 'Food for Data',
  author: 'Martina Zaccaron',
  url: 'https://foodfordata.com',
  tagline: 'Analytics engineering for scale-ups',
  description:
    'Analytics engineer and dbt Labs technical instructor with 10+ years in data. I help teams get dbt right: set up properly, or fixed when it has become slow, messy or fragile.',
  // Shown on the site only via components/Email.astro (obfuscated for crawlers)
  email: 'hello@foodfordata.com',
  booking: 'https://cal.com/martina-z-ffd/15min',
  linkedin: 'https://www.linkedin.com/in/martinazaccaron',
  github: 'https://github.com/marzaccaro',
  // TODO: fill in before publishing (see /legal/)
  legal: {
    vat: 'IT02984690426', // Partita IVA
    city: 'Senigallia',
    address: "", // office address; leave empty to show the city only
  },
  // GoatCounter site code: the "xxx" in https://xxx.goatcounter.com. Leave empty to disable page-view counting.
  goatcounter: 'martinaz',
  socialImage: '/social.png',
  nav: [
    { title: 'About', href: '/about/' },
    { title: 'Blog', href: '/blog/' },
    { title: 'Contact', href: '/contact/' },
  ],
};
