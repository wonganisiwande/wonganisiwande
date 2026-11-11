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
  id: 'one-of-two',
  kicker: 'Latest',
  title: 'One of Two',
  blurb: 'A year of firsts, one nomination, and the camera I actually had.',
  href: '/thoughts/one-of-two',
  image: '/media/amaryllis/gallery/9485.jpg'
};
