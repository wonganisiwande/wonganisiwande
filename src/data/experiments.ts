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
    description: "An eight episode lifestyle series inside a serviced residence in Mount Pleasant. One loft, one resident and a glove that keeps turning up. A house is just a house... until it’s yours.",
    body: [
      "This one started small and a little cinematic. Eight episodes inside a serviced residence in Mount Pleasant: one man, one loft, and the slow work of turning a space into a life.",
      "It opens by handing the audience a question, which of two apartments he should take, and from there it keeps coming back to one object. A glove. The glove is the whole point. A home gets finished by meaning, not by furniture.",
      "The look stays warm and filmic, one grade the whole way through, with something in the foreground sweeping past the lens to hide every cut. The sign off never changes. A house is just a house... until it’s yours."
    ],
    link: { to: '/presence', label: 'Watch The Resident' }
  },
  {
    id: 2,
    slug: 'the-amaryllis-editorial',
    published: '2026-07-04',
    title: "The Amaryllis Editorial",
    category: "Collaborations",
    description: "Five looks in one morning with photographer Keong Kadango. One warm grade, no wasted frames, and an address that ended up feeling like a person.",
    body: [
      "Five looks in a single morning, shot with Keong Kadango. The brief fit in one line: make an apartment feel like a person.",
      "So we kept it to one warm grade and didn’t waste a frame. If you want the thinking behind it, the full write up is in Thoughts. If you just want to look, the whole set is in Presence."
    ],
    link: { to: '/thoughts/the-amaryllis-editorial', label: 'Read the piece' }
  },
  {
    id: 3,
    slug: 'denim-in-bloom',
    published: '2026-07-04',
    title: "Denim in Bloom",
    category: "Case Studies",
    description: "When you bring on the right people, you do not need more people. The campaign for the Denim Chill show, kept small on purpose.",
    body: [
      "Denim Chill was a fashion show I walked in, built around Tikonze Apapa’s upcycled denim. Before the runway it needed a campaign, and the brief was to make people feel the show before a single ticket was sold.",
      "So we let the outfit argue with itself. Shorts cut at the knee, a white shirt worn easy, flowers where a tie would normally go. Denim wants to be casual and the flowers refuse to let it, and that argument became the whole campaign. It ran across an editorial set and three films with Tikonze Apapa and Ruva Flowerhouse.",
      "It did what it was meant to do. The look set the tone for the runway, and the films took the show onto feeds it would never have reached on its own."
    ],
    link: { to: '/thoughts/directing-denim-in-bloom', label: 'Read the piece' }
  },
  {
    id: 4,
    slug: 'sambas-three-ways',
    published: '2026-07-04',
    title: "Sambas, Three Ways",
    category: "Prototypes",
    description: "One shoe, three moods, and the question of how far a single silhouette can stretch before it breaks. It doesn’t.",
    body: [
      "Same shoe, three different moods, one clean edit. I wanted to see how far a single silhouette could stretch before it broke (it didn’t).",
      "It’s built to be quick and repeatable, which is the point. A signature does more work than a whole wardrobe, and this was a small way of proving it."
    ],
    link: { to: '/presence', label: 'Watch the film' }
  },
  {
    id: 5,
    slug: 'the-glove-edit',
    published: '2026-07-04',
    title: "The Glove Edit",
    category: "Prototypes",
    description: "A series about finishing details, because the gap between fine and unforgettable is usually one small thing.",
    body: [
      "This series runs on one idea: the last thing you add is the thing people remember. It’s about finishing details, the gap between fine and unforgettable.",
      "It started with the glove, which went on to become the recurring symbol of the Amaryllis series. Small object, big claim."
    ]
  },
  {
    id: 6,
    slug: 'tikonze-apapa-ambassador',
    published: '2026-07-04',
    title: "Tikonze Apapa, Brand Ambassador",
    category: "Collaborations",
    description: "I’m the official face of Tikonze Apapa, the Malawian label turning upcycled denim into fashion with a conscience. Campaigns, content and the runway.",
    body: [
      "I’m an official brand ambassador for Tikonze Apapa, a Malawian label built on upcycled denim, ethical fashion and giving back to the community it comes from.",
      "The work is ongoing. Every month there’s content across Instagram and TikTok, plus campaign shoots and their events, including the Denim Chill fashion show and the Jean Drive. Denim in Bloom, the campaign for the show, came straight out of this partnership.",
      "This is the kind of collaboration I say yes to on purpose. A brand with a real point of view, and a story worth wearing."
    ],
    link: { to: '/presence', label: 'Watch Jean Drive' }
  },
  {
    id: 7,
    slug: 'memona-pharmacy',
    published: '2026-11-11',
    title: "Memona Pharmacy: The Lean, The Drop, The Rack",
    category: "Case Studies",
    description: "A neighbourhood pharmacy with a young, mostly male audience. Twelve videos shot on a phone, and a three part signature so people remember who told them the fact.",
    body: [
      "Memona is a pharmacy in Blantyre with a loyal walk in crowd, young and mostly male. They didn’t need a campaign, they needed a system: twelve videos, shot on a phone, that people would actually watch and send to a friend.",
      "So the strategy started with who walks through the door. A young audience means TikTok grammar, trending audio, quick cuts and bold captions. The older third means Facebook first, a clear voiceover and bigger text. Twelve ideas came out of that split, from quick fact drops and myth busting reactions to a men’s health series made to take the shame out of asking.",
      "The part I care about most is the signature. I don’t need people to remember the fact. I need them to remember who told them the fact. So every video carries three things. The Lean: the pharmacist leans in at the moment of truth, so it works even on mute. The Drop: a random aside before the fact, sport, food, politics, different every time. The Rack: every video ends on the same slow focus pull from the pharmacist to the Memona sign. The camera points at Memona as the answer, every single time.",
      "Four films are out so far, including a short documentary portrait of the pharmacist. The rest of the system is written and ready to shoot."
    ],
    link: { to: '/presence/memona-pharmacist-documentary', label: 'Watch the documentary' }
  },
  {
    id: 8,
    slug: 'mlky-bar-three-rounds',
    published: '2026-11-11',
    title: "MLKY Bar: Three Rounds",
    category: "Collaborations",
    description: "Three mimosas, three drops, co-hosted with Tyra Sabadia. Hands first, then the drinks, then the reveal.",
    body: [
      "Episode one of a series with MLKY Bar, co-hosted with Tyra Sabadia. Three rounds, three drinks and one afternoon behind the bar, with recipe cards to match.",
      "How it came out mattered as much as the shoot. We sorted one hundred and ninety seven frames into three drops. First, nine frames of hands and glasses where you can’t tell who anyone is. Then the drinks take over, with the two of us out of focus behind them. Then the full reveal: both faces, the build, the tasting, the toast, and the golden hour table at the end. Then the film.",
      "Holding back means the audience learns one thing at a time. Two people, a bar, orange drinks. Then what’s being made. Then who’s making it."
    ],
    link: { to: '/presence/mlky-bar-three-rounds', label: 'See the set' }
  }
];
