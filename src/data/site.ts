// Site wide constants shared by the SEO component (client) and the prerender
// script (build time). Keep this file free of JSX and browser APIs.

export const SITE = 'https://wonganisiwande.com';
export const SITE_NAME = 'Wongani Siwande';

export const DEFAULT_TITLE = 'Wongani Siwande — Creative Director & Taste Direction, Malawi';
export const DEFAULT_DESCRIPTION =
  'Creative director building aspiration through fashion, taste and premium personal brands. Creative direction, videography, content and presence from Blantyre, Malawi to the world.';
export const DEFAULT_IMAGE = '/media/amaryllis/taupe-tastemaker.jpg';

export const SOCIAL = [
  'https://www.instagram.com/wonganisiwande/',
  'https://www.tiktok.com/@wonganisiwande',
  'https://www.linkedin.com/in/wongani-siwande-/'
];

// The Person entity, reused on every page so search engines see one consistent
// identity. knowsAbout and hasOccupation carry the year's positioning.
export const PERSON = {
  '@type': 'Person',
  '@id': `${SITE}/#person`,
  name: SITE_NAME,
  url: SITE,
  image: `${SITE}${DEFAULT_IMAGE}`,
  jobTitle: 'Creative Director',
  description:
    'Creative director, content creator and brand consultant in Blantyre, Malawi. Creative and art direction, content creation, brand strategy and consulting, fashion styling and modelling, film direction.',
  address: { '@type': 'PostalAddress', addressLocality: 'Blantyre', addressCountry: 'MW' },
  sameAs: SOCIAL,
  knowsAbout: [
    'Creative direction',
    'Art direction',
    'Content creation',
    'Brand strategy',
    'Brand consulting',
    'Fashion styling',
    'Modelling',
    'Film direction',
    'Videography',
    'Lookbook production'
  ],
  hasOccupation: [
    { '@type': 'Occupation', name: 'Creative Director' },
    { '@type': 'Occupation', name: 'Content Creator' },
    { '@type': 'Occupation', name: 'Brand Consultant' },
    { '@type': 'Occupation', name: 'Film Director' },
    { '@type': 'Occupation', name: 'Model' }
  ]
};
