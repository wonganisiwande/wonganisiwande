// Content for the Experiments page. Pure data, no JSX and no
// browser APIs, so the prerender script can import it at build time as well as
// the page itself.

export type Archive = {
  id: number;
  slug: string;
  published: string;
  title: string;
  category: string;
  description: string;
  body: string[];
  link?: { to: string; label: string };
};

export const archiveItems: Archive[] = [
  {
    id: 1,
    slug: 'the-bachelor-at-amaryllis',
    published: '2026-07-04',
    title: "The Bachelor, at Amaryllis Residences",
    category: "Case Studies",
    description: "An eight episode lifestyle series for a serviced residence in Mount Pleasant. One loft, one resident, one recurring glove. A house is just a house... until it's yours.",
    body: [
      "An eight episode lifestyle series built inside a serviced residence in Mount Pleasant. The premise is small and a little cinematic: one man, one loft, and the slow work of making a space feel like a life.",
      "It opens with a question I hand to the audience, which of two apartments he should take, and it keeps returning to one object. A glove. The glove is the whole thesis: a home is finished by meaning, not furniture.",
      "The look is warm and filmic, one grade throughout, a foreground object swiping the lens to hide each cut. The sign off never changes. A house is just a house... until it's yours."
    ],
    link: { to: '/presence', label: 'Watch The Resident' }
  },
  {
    id: 2,
    slug: 'the-amaryllis-editorial',
    published: '2026-07-04',
    title: "The Amaryllis Editorial",
    category: "Collaborations",
    description: "Five looks in one morning with photographer Keong Kadango. One warm grade, no wasted frames, an address turned into a person.",
    body: [
      "Five looks in a single morning, shot with photographer Keong Kadango. The brief was one line: make an apartment feel like a person.",
      "One warm grade, no wasted frames, an address turned into a character. The full write up lives in Thoughts, and the whole set lives in Presence."
    ],
    link: { to: '/thoughts/the-amaryllis-editorial', label: 'Read the piece' }
  },
  {
    id: 3,
    slug: 'denim-in-bloom',
    published: '2026-07-04',
    title: "Denim in Bloom",
    category: "Case Studies",
    description: "When you bring on the right people, you do not need more people. The promo campaign for Denim Chill, made deliberately small.",
    body: [
      "The promo campaign for Denim Chill, a fashion show I walked in, built around Tikonze Apapa's upcycled denim. The brief: make people feel the show before a single ticket was sold.",
      "So we argued with the fabric. Shorts cut at the knee, a white shirt worn easy, flowers where a tie should be. Denim wants to be casual. The flowers refuse to let it. That argument was the whole campaign, and it ran across an editorial set and three films with Tikonze Apapa and Ruva Flowerhouse.",
      "The shoot did its job: the look set the tone for the runway, and the films carried the show onto feeds it would never have reached on its own."
    ],
    link: { to: '/thoughts/directing-denim-in-bloom', label: 'Read the piece' }
  },
  {
    id: 4,
    slug: 'sambas-three-ways',
    published: '2026-07-04',
    title: "Sambas, Three Ways",
    category: "Prototypes",
    description: "One shoe, three registers. A styling system testing how far a single silhouette stretches before it breaks. It does not.",
    body: [
      "One shoe, three registers. A styling system that tests how far a single silhouette stretches before it breaks. It does not.",
      "Built as a fast, repeatable format: same shoe, three moods, one clean edit. A small proof that a signature does more work than a wardrobe."
    ],
    link: { to: '/presence', label: 'Watch the film' }
  },
  {
    id: 5,
    slug: 'the-glove-edit',
    published: '2026-07-04',
    title: "The Glove Edit",
    category: "Prototypes",
    description: "A signature series about finishing details. The gap between fine and unforgettable is one detail.",
    body: [
      "A signature series about finishing details, the gap between fine and unforgettable. It runs on one idea: the last thing you add is the thing people remember.",
      "The glove is where it started, and it became the recurring symbol of the Amaryllis series. Small object, large claim."
    ]
  },
  {
    id: 6,
    slug: 'tikonze-apapa-ambassador',
    published: '2026-07-04',
    title: "Tikonze Apapa, Brand Ambassador",
    category: "Collaborations",
    description: "Official face of Tikonze Apapa, the Malawian brand turning upcycled denim into fashion with a conscience. Campaigns, content, and the runway.",
    body: [
      "I serve as an official brand ambassador for Tikonze Apapa, a Malawian label built on upcycled denim, ethical fashion and community impact.",
      "The work is ongoing: monthly content across Instagram and TikTok, campaign shoots, and their events, including the Denim Chill fashion show and the Jean Drive. Denim in Bloom, the promo campaign for the show, came out of this partnership.",
      "It is the kind of collaboration I take on deliberately. A brand with a real point of view, and a story worth wearing."
    ],
    link: { to: '/presence', label: 'Watch Jean Drive' }
  },
  {
    id: 7,
    slug: 'memona-pharmacy',
    published: '2026-11-11',
    title: "Memona Pharmacy: The Lean, The Drop, The Rack",
    category: "Case Studies",
    description: "A neighbourhood pharmacy with a young, mostly male audience. Twelve smartphone videos and a three part signature built so people remember who told them the fact.",
    body: [
      "Memona is a pharmacy in Blantyre with a loyal walk in audience, young and mostly male. The brief was a content system rather than a campaign: twelve videos, shot on a phone, that people would actually watch and pass on.",
      "The strategy started with who walks through the door. A young audience means TikTok grammar, trending audio, fast cuts and bold captions. The older third means Facebook first, a clear voiceover and larger text. Twelve concepts came out of that split, from quick fact drops and myth busting reacts to a men’s health series built to take the shame out of asking.",
      "The part I care most about is the signature. The goal is not for people to remember the fact. It is for people to remember who told them the fact. So every video carries three things. The Lean: the pharmacist leans in at the truth moment, so it works on mute. The Drop: an unrelated aside before the fact, sport, food, politics, different every time. The Rack: every video ends on the same slow focus pull from the pharmacist to the Memona sign. The camera points at Memona as the answer, every single time.",
      "Four films are delivered, including a short documentary portrait of the pharmacist. The rest of the system is written and ready to shoot."
    ],
    link: { to: '/presence/memona-pharmacist-documentary', label: 'Watch the documentary' }
  },
  {
    id: 8,
    slug: 'mlky-bar-three-rounds',
    published: '2026-11-11',
    title: "MLKY Bar: Three Rounds",
    category: "Collaborations",
    description: "A staggered release built around three mimosas. Hands first, then the drinks, then the reveal.",
    body: [
      "Episode one of a series with MLKY Bar. Three rounds, three drinks, one afternoon behind the bar, with recipe cards to match.",
      "The release was the idea as much as the shoot. One hundred and ninety seven frames sorted into three drops. Phase one, nine frames of hands and glasses where nobody is identifiable. Phase two, the drinks as the subject, people defocused behind them. Phase three, the full reveal: both faces, the build, the tasting, the toast and the golden hour table at the end. Then the film.",
      "The point of holding back is that the audience learns one thing at a time. Two people, a bar, orange drinks. Then what is being made. Then by whom."
    ],
    link: { to: '/presence/mlky-bar-three-rounds', label: 'See the set' }
  }
];
