// The front cover story. One object, changed weekly.
//
// To publish a new one: edit the fields below. Change `id` as well, because the
// dismissal is remembered against the id, so a new id brings the bubble back for
// everyone who closed the last one.
//
// Works for anything with a URL: a Thoughts essay, an Experiments case study, a
// Presence gallery or film. Just point `href` at it.
//
// Set to null to hide the bubble entirely (between stories, or if it ever gets
// in the way).

export type Featured = {
  id: string;
  kicker: string;
  title: string;
  blurb: string;
  href: string;
  image: string;
};

export const featured: Featured | null = {
  id: 'glove-of-the-town',
  kicker: 'New this week',
  title: 'Glove of the Town',
  blurb: 'A glove split the internet in June. Four moves later it was on a runway.',
  href: '/thoughts/glove-of-the-town',
  image: '/media/glove/cover.jpg'
};
