// Brands he has worked with. Logo only, no description of the work, by his
// instruction: much of this was done under an employer and must not be cited.
// Marks are monochrome PNGs (alpha = shape) drawn with CSS mask so they take
// the current text colour in both themes. w and h are display px at 1x.

export type Brand = { slug: string; name: string; w: number; h: number };

export const brands: Brand[] = [
  { slug: 'standard-bank', name: 'Standard Bank Malawi', w: 120, h: 140 },
  { slug: 'national-bank', name: 'National Bank of Malawi', w: 256, h: 64 },
  { slug: 'castel', name: 'Castel Malawi', w: 99, h: 140 },
  { slug: 'old-mutual', name: 'Old Mutual Malawi', w: 380, h: 84 },
  { slug: 'illovo', name: 'Illovo Sugar Malawi', w: 214, h: 77 },
  { slug: 'kwithu', name: 'Kwithu Kitchen', w: 132, h: 140 },
  { slug: 'sunday-soiree', name: 'Sunday Soirée', w: 140, h: 140 },
  { slug: 'fdh', name: 'FDH Bank', w: 190, h: 140 },
  { slug: 'coca-cola', name: 'Coca-Cola Malawi', w: 380, h: 119 },
  { slug: 'road-to-relief', name: 'Road to Relief', w: 196, h: 84 },
  { slug: 'dstv', name: 'DStv Malawi', w: 194, h: 120 },
  { slug: 'amaryllis', name: 'Amaryllis', w: 380, h: 105 },
  { slug: 'wesellphones', name: 'WeSelliPhones', w: 235, h: 140 }
];
