// Content for the Presence page. Pure data, no JSX and no
// browser APIs, so the prerender script can import it at build time as well as
// the page itself.

export type Work = {
  id: number;
  slug: string;
  published: string;
  title: string;
  category: 'Sightlines' | 'Stories in Motion';
  kind: 'gallery' | 'film';
  hero: string;
  roles: string;
  description: string;
  size: 'large' | 'medium';
  gallery?: string[];
  video?: string;
  poster?: string;
};

// The Amaryllis Residences, thirty frames in shoot order so the set reads like
// an issue: the suite wakes up, the tastemaker settles in, the exterior does its
// old money turn, off duty lets the air out, and the property details close.
// Phase 1 Robe, Phase 2 Taupe, Phase 3 White & Scarf, Phase 4 Beanie, Phase 5 Details.
// The five covers open the set, in phase order, because the whole idea was to
// treat the residence like an issue. Two of them (slow mornings, off duty) had
// never appeared anywhere on the site before this.
export const amaryllisCovers = [
  'cover-checked-in', 'cover-slow-mornings', 'cover-tastemaker',
  'cover-place-to-be', 'cover-off-duty'
].map(n => `/media/covers/${n}.jpg`);

export const amaryllisFrames = [
  9235, 9217, 9232, 9203, 9294, 9287, 9364,
  9395, 9462, 9468, 9418, 9485, 9484,
  9512, 9506, 9561, 9564, 9510, 9568,
  9592, 9579, 9588,
  9252, 9268, 9502
].map(n => `/media/amaryllis/gallery/${n}.jpg`);

export const amaryllisGallery = [...amaryllisCovers, ...amaryllisFrames];

// Denim in Bloom, thirty frames (photography Keong Kadango) in story order: the
// bench and the street, the sock and loafer details, the portraits that carry
// the thesis, the bougainvillea wall, and the bouquet frames that close it.
export const denimGallery = [
  // the bench and the street, solo
  6459, 6465, 6469, 6481, 6468,
  // the bougainvillea wall
  6490, 6493, 6508, 6510,
  // the denim duffel, still life and carried
  6542, 6553, 6573,
  // two up on the bench
  6546, 6551, 6557, 6565,
  // the ladders, full cast
  6647, 6664, 6669, 6688, 6693,
  // back to solo at the ladder
  6708, 6712, 6717, 6724,
  // the black look and the braces
  6733, 6744, 6764, 6762, 6740
].map(n => `/media/denim/gallery/${n}.jpg`);
// 6491 is deliberately absent: it is the hero frame above the grid, and listing
// it here as well rendered the same photograph twice.

// MLKY Bar, Three Rounds. Episode one of the series, the phase three reveal.
// 0443 is the hero and stays out of the grid.
export const mlkyGallery = [
  '0389', '0375', '0398', '0472', '0527', '0534', '0543',
  '0561', '0416', '0424', '0447', '0606', '0624'
].map(n => `/media/mlky/${n}.jpg`);

export const works: Work[] = [
  {
    id: 1,
    slug: 'the-amaryllis-residences',
    published: '2026-07-04',
    title: 'The Amaryllis Residences',
    category: 'Sightlines',
    kind: 'gallery',
    hero: '/media/amaryllis/gallery/01-taupe.jpg',
    roles: 'Editorial · Photography Keong Kadango',
    description: "A morning inside a serviced loft in Mount Pleasant, told in five looks. The robe for the slow start, taupe for the tastemaker, a white shirt and silk scarf for the garden, and the beanie to land soft. One warm grade, no wasted frames, and an address that turned into a person.",
    size: 'large',
    gallery: amaryllisGallery
  },
  {
    id: 2,
    slug: 'denim-in-bloom',
    published: '2026-07-04',
    title: 'Denim in Bloom',
    category: 'Sightlines',
    kind: 'gallery',
    hero: '/media/denim/gallery/6491.jpg',
    roles: 'Denim Chill Show Promo · Photography Keong Kadango',
    description: 'The one thing you cannot teach past aesthetic is taste. Flowers that did not blend with the pose came out, and everything that stayed was intended. Shot on a quiet street in Blantyre with Keong Kadango.',
    size: 'large',
    gallery: denimGallery
  },
  {
    id: 3,
    slug: 'the-resident',
    published: '2026-07-04',
    title: 'The Resident',
    category: 'Stories in Motion',
    kind: 'film',
    hero: '/media/amaryllis/poster-the-resident.jpg',
    poster: '/media/amaryllis/poster-the-resident.jpg',
    video: '/media/amaryllis/the-resident.mp4',
    roles: 'Amaryllis Residences · Direction / Edit',
    description: "A slow walk through the loft, cut so it can breathe. It sells a feeling, not a floor plan.",
    size: 'medium'
  },
  {
    id: 4,
    slug: 'denim-in-bloom-the-film',
    published: '2026-07-04',
    title: 'Denim in Bloom, the Film',
    category: 'Stories in Motion',
    kind: 'film',
    hero: '/media/denim/poster-denim-in-bloom.jpg',
    poster: '/media/denim/poster-denim-in-bloom.jpg',
    video: '/media/denim/denim-in-bloom.mp4',
    roles: 'Editorial · Direction / Edit · with Tikonze Apapa & Ruva',
    description: "The denim editorial, moving this time. One bench, one bouquet, and softness earning its place.",
    size: 'medium'
  },
  {
    id: 5,
    slug: 'sambas-three-ways',
    published: '2026-07-04',
    title: 'Sambas, Three Ways',
    category: 'Stories in Motion',
    kind: 'film',
    hero: '/media/amaryllis/poster-sambas.jpg',
    poster: '/media/amaryllis/poster-sambas.jpg',
    video: '/media/amaryllis/sambas-3-ways.mp4',
    roles: 'Direction / Styling',
    description: "One shoe, three moods, and a quiet look at how far a single silhouette can stretch before it breaks. It doesn’t.",
    size: 'medium'
  },
  {
    id: 6,
    slug: 'jean-drive',
    published: '2026-07-04',
    title: 'Jean Drive',
    category: 'Stories in Motion',
    kind: 'film',
    hero: '/media/denim/poster-jean-drive.jpg',
    poster: '/media/denim/poster-jean-drive.jpg',
    video: '/media/denim/jean-drive.mp4',
    roles: 'TKA Collaboration · Direction / Edit',
    description: "The fun cut. Denim, a bit of motion, and a drive that was worth showing up for.",
    size: 'medium'
  },
  {
    id: 7,
    slug: 'mlky-bar-three-rounds',
    published: '2026-11-11',
    title: 'MLKY Bar, Three Rounds',
    category: 'Sightlines',
    kind: 'gallery',
    hero: '/media/mlky/0443.jpg',
    roles: 'Series, Episode 01 · with MLKY Bar · Co-host Tyra Sabadia',
    description: "Three rounds behind the bar with Tyra Sabadia. It came out in three drops, hands first, then the drinks, then the reveal. This is the reveal.",
    size: 'medium',
    gallery: mlkyGallery
  },
  {
    id: 8,
    slug: 'memona-pharmacist-documentary',
    published: '2026-11-11',
    title: 'Memona Pharmacy, The Pharmacist',
    category: 'Stories in Motion',
    kind: 'film',
    hero: '/media/memona/poster-pharmacist-documentary.jpg',
    poster: '/media/memona/poster-pharmacist-documentary.jpg',
    video: '/media/memona/pharmacist-documentary.mp4',
    roles: 'Memona Pharmacy · Direction / Strategy',
    description: "A short documentary portrait of the pharmacist, one of twelve films in a content system I built for a neighbourhood pharmacy in Blantyre.",
    size: 'medium'
  }
];
