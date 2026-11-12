// Content for the Thoughts page. Pure data, no JSX and no
// browser APIs, so the prerender script can import it at build time as well as
// the page itself.

export type Credit = { role: string; name: string };
export type Media = { type: 'image' | 'video'; src: string; poster?: string };

export type Thought = {
  id: number;
  slug: string;
  // ISO date the piece went live. Drives structured data and the sitemap.
  published: string;
  title: string;
  category: string;
  description: string;
  // One line, his opinion, shown in italics on cards, at the top of the piece
  // and on the share card. Lifted from the body, never invented.
  verdict: string;
  credit?: string;
  credits?: Credit[];
  cover: string;
  coverKind: 'magazine' | 'photo';
  body: string[];
  media?: Media[];
  // An external companion to the piece, shown at the very end. Opens in a new
  // tab. Use the clean public URL, never a share link carrying an invite code.
  outbound?: { href: string; label: string; note?: string };
  // Presence slug for the gallery this shoot lives in. Only set it when that
  // gallery actually exists, otherwise the link promises something that is not
  // there. Omit and no link is shown.
  shootIn?: string;
};

export const A = (n: string) => `/media/amaryllis/gallery/${n}.jpg`;
export const D = (n: string) => `/media/denim/gallery/${n}.jpg`;
// Glove of the Town. Festival photographer not confirmed, so the festival
// frames carry no individual credit. Do not add one without his say so.
export const G = (n: string) => `/media/glove/${n}.jpg`;
// Sunday Soirée, Vieille Monnaie. The finished lookbook cards, captions and all,
// because the captions are the argument the essay is making.
export const S = (n: string) => `/media/soiree/${n}.jpg`;
// Sunday Soirée at the Blantyre Open. Photography Keong Kadango, video
// Polycarp Films, clothes The Stitchroom.
export const T = (n: string) => `/media/tennis/${n}.jpg`;

export const thoughtItems: Thought[] = [
  {
    id: 1,
    slug: 'the-amaryllis-editorial',
    published: '2026-07-05',
    shootIn: 'the-amaryllis-residences',
    title: "The Amaryllis Editorial, Directed",
    verdict: "A shoot is one idea, wearing five outfits.",
    category: "Essays",
    description: "Five looks, one morning, one idea. Notes on directing a shoot inside a serviced residence.",
    credit: "Photography by Keong Kadango",
    cover: '/media/covers/cover-tastemaker.jpg',
    coverKind: 'magazine',
    body: [
      "This shoot started with one line I wrote for myself: make an apartment feel like a person. Five looks, one morning and no stylist (which meant the stylist was also me).",
      "We shot it in phases, and I gave every phase one job. The robe opens the story, because every honest morning starts slowly (the coffee was real, and it was my second). Taupe carries the middle, one warm grade with nothing shouting. The white shirt and silk scarf take it outside, where the light is generous and the palms do half the work for you. The beanie closes it, because every series needs somewhere soft to land.",
      "Keong Kadango shot all of it. He works quietly and he refuses to rush a frame, which is exactly why the light looks so patient. I handled the direction, the order of the looks, the pace and where the story gets to breathe, and he handled the seeing. The set owes him everything.",
      "If there is one thing I would want you to take from this, it is that a shoot is not forty good photos. It is one idea, wearing five outfits.",
      "P.s, the robe stayed at the residence. Reluctantly."
    ],
    media: [
      { type: 'image', src: A('02-taupe') },
      { type: 'image', src: A('04-robe') },
      { type: 'image', src: A('08-scarf') },
      { type: 'image', src: A('11-beanie') },
      { type: 'video', src: '/media/amaryllis/the-resident.mp4', poster: '/media/amaryllis/poster-the-resident.jpg' }
    ]
  },
  {
    id: 2,
    slug: 'directing-denim-in-bloom',
    published: '2026-07-05',
    shootIn: 'denim-in-bloom',
    title: "The Bloom Before the Chill, All in Denim",
    verdict: "When you bring on the right people, you don’t need more people.",
    category: "Essays",
    description: "I have always thought flowers were a bit misrepresented. On bringing jeans and flowers together for a show that gives back.",
    credit: "Photography by Keong Kadango",
    cover: D('6491'),
    coverKind: 'photo',
    credits: [
      { role: 'A Production By', name: 'Tikonze Apapa × Wongani Siwande × Ruva' },
      { role: 'Concept & Direction', name: 'Tikonze Apapa, Wongani Siwande' },
      { role: 'Creative Direction', name: 'Wongani Siwande' },
      { role: 'Photography & Co Direction', name: 'Keong Kadango' },
      { role: 'Florals', name: 'Ruva Flowerhouse (Tasleema Mlomba)' },
      { role: 'Reel Edit & Direction', name: 'Wongani Siwande' },
      { role: 'Wardrobe', name: 'Grace & Hustle Thrift Shop, Tikonze Apapa' },
      { role: 'Models', name: 'Karen Lombe, Flossy Kapoloma, Wongani Siwande' },
      { role: 'Behind the Scenes', name: 'Sam from Ruva' },
      { role: 'Special Thanks', name: "Joe’s Café" }
    ],
    body: [
      "I’ve always thought flowers were a bit misrepresented. Grossly misrepresented, actually. Every time you see them they are attached to a wedding, a funeral or a proposal, those set-in-stone occasions, and they never really get to exist as the versatile things they are. You could say the same about denim, but denim is allowed. Jeans were always meant for a certain casual market.",
      "Ahead of the Denim Chill fashion show, hosted by Tikonze Apapa, an organisation that supports and empowers the deaf and hearing-impaired community, I was the creative director and one of the models for a shoot called Denim in Bloom. The task was to bring jeans and flowers together in a way nobody in my circle had tried. To be fair, I brought the idea to them first (you miss 100% of the shots you don’t take), and they said yes.",
      "Having an idea is one thing. Getting it as close as possible to what is in your head is another. Finding the talent was the easy part, because I have been around enough people who can wear a look and hold a pose, and the TKA team kindly volunteered some of the models from the show. I’m often met with a bit of scepticism when I bring a creative idea into my working circles, so I knew not many people would line up for this one. Sometimes people just need a nudge.",
      "I have been lucky to work with a lot of brilliant people who are open to my slightly unconventional ideas and actually let me direct from start to finish, and I’m grateful to every one of them. For the flowers I went to Ruva, a flowerhouse in Michiru, Blantyre. I wanted to keep costs as low as I could, even with TKA helping, because a project that is meant to give back doesn’t really work when it takes too much. Tasleema, the brain behind Ruva, said yes straight away, mostly because we had been putting off a collaboration for the longest time. That was half the puzzle.",
      "The other half was the look of it. I needed a photographer who understood the vision, and a partner who could lend us more pieces for volume, without showing everything meant for the runway. People were only meant to get a glimpse. That’s it.",
      "Enter Keong Kadango. I don’t think I have ever clicked with someone behind a camera the way I do with him, which is funny, because I never saw us working together at the start. A few random shoots and a lot of ideas later, we both saw something only we could make, and we have worked closely since 2025. I built a Pinterest moodboard of the whole vision, we shot a short BTS film to cover our bases, and Grace & Hustle Thrift Shop came in to help dress the ladies. Three quarters of the way there.",
      "The location was here in Blantyre, the wardrobe was done and the talent showed up, on time for the most part. The one thing you can’t teach past aesthetic is taste. Taste is what lets you cut what doesn’t work, from flowers that didn’t sit right with a pose or a person, down to who gets the bench scene and who gets the barber pole. Everything was intended. Working that way kept us so far ahead of schedule that we could play with different sets at Joe’s Café (a big shoutout to them), and even bring out some ladders we were unsure about, which ended up working in a chrome kind of way.",
      "The takeaway is that when you bring on the right people, you don’t need more people. You just need to share a taste, or at least give the people following you a taste of what you mean, and that can come through a moodboard, a film reference, a poem, a hairstyle or a shared ice cream cone. Inspiration is everywhere.",
      "We had a great turnout at the show. There are no official numbers to prove it, but I’m sure some of those people came because of what we made outside the brief. The other thing nobody measures is morale. Pulling this off with so little showed the talent that all they really needed was themselves and some confidence, which, if you ask me, is the best thing you can bring to fashion. No one does it like you do."
    ],
    media: [
      { type: 'image', src: D('6469') },
      { type: 'image', src: D('6488') },
      { type: 'image', src: D('6495') },
      { type: 'image', src: D('6483') },
      { type: 'video', src: '/media/denim/denim-in-bloom.mp4', poster: '/media/denim/poster-denim-in-bloom.jpg' }
    ]
  },
  {
    id: 3,
    slug: 'dressing-for-an-address',
    published: '2026-07-05',
    shootIn: 'the-amaryllis-residences',
    title: "Dressing for an Address",
    verdict: "A look that needs props is a costume.",
    category: "Concept Notes",
    description: "Every wardrobe decision on the Amaryllis shoot answered one question: what would this address wear?",
    cover: '/media/covers/cover-place-to-be.jpg',
    coverKind: 'magazine',
    body: [
      "On the Amaryllis shoot the apartment came first, and every wardrobe decision answered the same question: what would this address wear?",
      "A white robe, because luxury at home is about texture, not logos. Taupe on taupe, because the walls were warm and I refuse to fight a wall. An oversized white shirt with a scarf at the neck for the garden, because a scarf is the cheapest way to look like you own the place. And a beanie with the glasses I actually wear, because a look that needs props is a costume.",
      "One rule held the whole set together, and it was one finishing detail per look. The scarf knot, the watch, the white cup. Taste is mostly choosing, not adding.",
      "P.s, the espresso in the garden frames was finished by frame three. Some things you just can’t art direct."
    ],
    media: [
      { type: 'image', src: A('01-taupe') },
      { type: 'image', src: A('05-robe') },
      { type: 'image', src: A('09-scarf') }
    ]
  },
  {
    id: 4,
    slug: 'loafers-white-socks-flowers',
    published: '2026-07-05',
    shootIn: 'denim-in-bloom',
    title: "Loafers, White Socks, Flowers",
    verdict: "The contrast is the point.",
    category: "Concept Notes",
    description: "Styling notes from the Denim Chill shoot, for anyone who wants the recipe.",
    credit: "Photography by Keong Kadango",
    cover: D('6468'),
    coverKind: 'photo',
    body: [
      "A few people asked how the Denim Chill look came together, so here is the recipe.",
      "Start with light wash denim cut at the knee. It reads relaxed before you have done anything else. Keep the shirt white and a size generous, with the sleeves pushed up and the collar open. Then comes the part people argue about: white crew socks pulled straight and black loafers, no compromise. The contrast is the point. It says I know the rules and I’m comfortable anyway.",
      "The flowers are the whole idea. Tucked at the collar like a pocket square with ambitions, they turn an off duty fit into an editorial one. Keep the palette to three colours, and let one of them be a flower.",
      "Keong Kadango shot it patiently and up close, and the detail frames (the socks, the loafers, the seam at the knee) matter as much as the portraits. Details are where a look either holds together or lets go.",
      "P.s, loafers with white socks divide a room. I know where I stand."
    ],
    media: [
      { type: 'image', src: D('6467') },
      { type: 'image', src: D('6495') },
      { type: 'image', src: D('6460') }
    ]
  },
  {
    id: 5,
    slug: 'checked-in',
    published: '2026-07-05',
    shootIn: 'the-amaryllis-residences',
    title: "Checked In: a Night at the Bachelor Pad",
    verdict: "The point of a beautiful room isn’t really the room.",
    category: "Reflections",
    description: "A serviced apartment as a rehearsal for the life you are building. Notes from a night at Amaryllis Residences.",
    cover: '/media/covers/cover-checked-in.jpg',
    coverKind: 'magazine',
    body: [
      "A house is just a house... until it’s yours. I spent a night at the Amaryllis Residences in Mount Pleasant to test a theory, that a serviced apartment can feel less like a hotel and more like a rehearsal for the life you are building.",
      "The loft makes its case in small ways. Morning light on the mezzanine rail. A kitchen that expects you to actually cook. Stairs that ask you to slow down on the way up (I did, partly for the view and partly for my knees). The kind of quiet that lets you hear your own taste.",
      "I made coffee, wore the robe for longer than the schedule allowed, and watched the hills put on their slow show through the window. Nobody knocked. That alone is worth the address.",
      "What I took home was a thought about aspiration. The point of a beautiful room isn’t really the room. It is who you get to practise being while you’re in it.",
      "P.s, ask for the loft with the hills view. Trust me on this one."
    ],
    media: [
      { type: 'image', src: A('04-robe') },
      { type: 'image', src: A('06-robe') },
      { type: 'image', src: A('13-details') },
      { type: 'video', src: '/media/amaryllis/the-resident.mp4', poster: '/media/amaryllis/poster-the-resident.jpg' }
    ]
  },
  {
    id: 6,
    slug: 'glove-of-the-town',
    published: '2026-08-05',
    title: "Glove of the Town",
    verdict: "People will only see as far as you let them.",
    category: "Essays",
    description: "A crocheted, rhinestoned glove split the internet in June. Four moves later it was in a gallery, on a runway and on stage. Notes on owning your narrative.",
    cover: G('cover'),
    coverKind: 'photo',
    credits: [
      { role: 'The Glove', name: 'Zizi Kalua, HookedByZie' },
      { role: 'Denim Version', name: 'Collins Chisenge' },
      { role: 'Photography, Denim Chill', name: 'Tikonze Apapa media team' },
      { role: 'Exhibited At', name: 'Glasshouse gallery' },
      { role: 'Runway', name: 'Denim Chill, Tikonze Apapa Foundation' },
      { role: 'Words & Direction', name: 'Wongani Siwande' }
    ],
    body: [
      "In the first week of June I had to put together a one man PR team against a wave of insults on the internet. I have been in the public eye long enough to know that most of it is best left alone, and usually I do leave it.",
      "The Sunday Soirée Vinoir festival had one of the boldest, most experimental colour palettes we have ever been given. In black or white the same design would get a “nice”, but there is a fine line between nice and exceptional, and this palette asked everyone to cross it. I’m a big fan of texture and layers, and I read the inspiration boards the way they were meant: not “wear only this, this way”, but “here is how far you could take your own style”.",
      "Iceman had just come out, and the cover art was the bedazzled glove Michael Jackson made famous. That gave me the idea for how to take my nice outfit somewhere exceptional, at least to me. I took it to Zizi Kalua, who owns HookedByZie. She crocheted the glove by hand and set it with rhinestones, and what came back was better than what I had described. The other reason I rarely respond to things is that I am always the first person I try to impress, and that is all that should matter.",
      "Opinions are one thing. Hate is a different ball game. After the glove went up on social media, people called it a bathing glove, and the comments quickly turned hateful and started going after me as a person.",
      "The only thing I had actually been careful about was not standing out in the wrong way. I thought I had got that right, and then it was taken out of my hands by people I could do nothing about.",
      "A lot of people reached out, more than I expected, and quietly, which is its own kind of loyalty.",
      "I took it all in. But I also had a plan.",
      "First, I posted the proper HD photos of the whole outfit, by day and by night. Those frames caught what a phone never could: the texture, the layers, the way the palette sat in daylight and then again under the lights. That weekend it started to look, to me, like something a lot of creators had quietly been dealing with, and the conversation moved on to the outfits themselves.",
      "I want to be clear about one thing. I was not the only person who took it that weekend. Other creators got the same treatment without my platform, my contacts or a run of events already lined up to answer it with. That is the part of this I don’t find funny.",
      "A lot of people hid behind “this is showbiz, deal with it or get out of the public eye”. I understand it, but it is a narrow way to think, because the people trolling weren’t tabloids and nobody was paying them. They just wanted to humble someone, and that is something I can never stand for. So I decided to make the glove part of my everyday. My birthday was a few days later, so I made a video celebrating it with a glass of wine in my gloved hand. It was about refusing to hide something I liked, and showing that taste is personal, every single day. The well wishes came in.",
      "That same week I was doing creative direction and content for the Glasshouse gallery. I pitched putting the glove into the show as a piece, the team liked how it sat with the theme, and on one of the exhibit days I hung it up and made a video about it. Light, with no argument in it.",
      "Then came the Denim Chill fashion show, which I was modelling in, a show of upcycled, thrifted denim organised by the Tikonze Apapa Foundation. I worked with Collins Chisenge, one of the designers, on a custom denim version. He took the same shape and rebuilt it in offcuts, bedazzled, so it read as denim first and glove second. I never fully vlogged it and let the show’s own media team do the talking. Afterwards I posted a photo with the glove, captioned “new set just dropped”, and that is when people started asking me to make a custom line with the glove at the centre.",
      "So what am I trying to say? People will only see as far as you let them. This started such a big conversation that I couldn’t let other people tell my story for me. If I had, it would have been a shame. As someone in marketing I would have let a chance to tell my own story slip away, and more importantly, I would have been quietly admitting to a bad fashion choice I never believed was one.",
      "“Keep quiet and let your work do the talking,” as Damson Idris put it. I live by that, and I think a lot of creatives could learn from knowing that their work isn’t defined by what other people think it should be. The best way to stand by what you do is to believe in it.",
      "Last weekend one of the biggest artists in the country had one made for a performance. I keep seeing recreations at shows and across different industries, fashion houses putting their own spin on it, artists wearing it on stage, people reaching out to collaborate. All I did was keep wearing it. The rest is just what happens when you stop apologising for something you believe in."
    ],
    media: [
      { type: 'image', src: G('01-thinking') },
      { type: 'image', src: G('02-laughing') },
      { type: 'image', src: G('03-venue') },
      { type: 'image', src: G('04-runway-glove') },
      { type: 'image', src: G('05-runway-braces') },
      { type: 'image', src: G('06-runway-aisle') }
    ]
  },
  {
    id: 7,
    slug: 'a-lookbook-is-never-neutral',
    published: '2026-08-28',
    title: "A Lookbook Is Never Neutral",
    verdict: "Taste is generous.",
    category: "Essays",
    description: "Taste is generous. A culture of inferiority is not. Notes on building a lookbook for a room whose standard keeps rising.",
    cover: S('cover'),
    coverKind: 'magazine',
    credits: [
      { role: 'Lookbook & Styling', name: 'Wongani Siwande' },
      { role: 'The Night', name: 'Sunday Soirée' },
      { role: 'Season Partner', name: 'FDH Bank' },
      { role: 'Theme', name: 'Vieille Monnaie' }
    ],
    body: [
      "My first Sunday Soirée was at Kumbali Castle, and I was there as a creator (how far we have come). Since then I have watched a Sunday afternoon quietly turn into an institution, close enough to notice the details, and most recently as the person building the lookbook for the next one.",
      "Sunday Soirée started out closer to a gathering than an event. Live music, local art, food and design in one room, run on what the team calls a micro economy. Guests fund the night, the night sells out, the artists and vendors get paid from that, and more people come next time because word got round that it was worth planning a Sunday around. No traditional sponsorship and no cash at the door. It worked because everyone in the room believed the premise, that culture is the product, not an accessory to one.",
      "This year that premise grew big enough to attract real backing, and FDH Bank came in as a partner for the season. It sounds like a business update, but it is something quieter and more important than that. It means the artists and vendors who make the night what it is know they will be paid, on time, for a whole season, instead of hoping the door numbers work out each time. That is the difference between a scene and an economy, and it happened slowly enough that most people just noticed the lineup getting better.",
      "Being asked to build the lookbook is what finally made me look at that evolution instead of just enjoying it as a guest. A lookbook, at its simplest, is a document of what a room expects from the people walking into it. Which means it is never neutral. It either widens the door or narrows it, and there is no version that does neither.",
      "Here is the part that doesn’t photograph well. Taste has genuinely got sharper here. People plan their outfits weeks out now, and there is a real pride in getting the details right that only happens in a community that is paying attention to itself. I love that part without reservation. But when a room’s standard rises, some people feel it as a wall rather than an invitation, and I know that one personally. I have stood on the wrong side of it, made to feel small over what I was wearing, even though I had the language and the confidence to understand what taste even was. It isn’t comfortable to admit that being put on the spot doesn’t always feel good. It is also the only honest place to start when you are the one handed the brief, because what you make will either teach people to look closer or tell them they haven’t arrived yet.",
      "Taste is generous. It notices something specific, a fabric, a colour, a combination that shouldn’t work and somehow does, and it shares that instead of hoarding it. It invites you closer and makes you want to try something new. A culture of inferiority does the opposite. It has no interest in specifics, only in a vague sense that you haven’t quite arrived, kept just fuzzy enough that you can never fix it. One builds you up by teaching you to look closer. The other keeps you small by making sure you never feel you looked closely enough.",
      "So I took some of the look inspirations the Soirée team had posted and translated them into my own wardrobe, to show that the theme, Vieille Monnaie, isn’t asking you to break the bank, feel out of place or become someone you don’t recognise. It is asking you to look closely at what you already have and make something tasteful out of it, and to be quietly confident enough that it shows. That is what style is. A bit more care in what you put on your back.",
      "Dressing well is more visible now, more photographed and closer to a flex than it used to be, and mostly that is a good thing. The risk sitting underneath it is that a scene can start selling the anxiety instead of the taste, because anxiety is much easier to package. I didn’t want the lookbook doing that. I wanted it to read like an invitation from someone who wants you to look good, not a test with a pass mark nobody shows you.",
      "Taste is an artform. It is something you practise, get wrong, refine and get a little better at each time, not a bar above your head that you either clear or don’t. That is the whole idea I tried to put into eight editions’ worth of evolution, without saying a word of it out loud in the lookbook itself. The clothes were always going to do that talking."
    ],
    media: [
      { type: 'image', src: S('01-look01') },
      { type: 'image', src: S('02-look02') },
      { type: 'image', src: S('03-look03') },
      { type: 'image', src: S('04-look04') },
      { type: 'image', src: S('05-look05') },
      { type: 'image', src: S('06-look06') },
      { type: 'image', src: S('07-look07') },
      { type: 'image', src: S('08-look08') },
      { type: 'image', src: S('09-look09') },
      { type: 'image', src: S('10-closer') }
    ],
    outbound: {
      href: 'https://www.pinterest.com/sundaysoireemw/au-rchest-ra-vieille-monnaie/',
      label: 'View the Vieille Monnaie board',
      note: 'The look inspirations the Soirée team put together for this edition. What I did was take these and translate them into my own wardrobe.'
    }
  },
  {
    id: 8,
    slug: 'sun-set-matcha',
    published: '2026-10-21',
    title: "Sun, Set, Matcha",
    verdict: "You don’t need a new outfit for every colour on the invite.",
    category: "Essays",
    description: "My first matcha was at a Soirée tasting, and the colour stuck. Five looks from the Blantyre Open edition of the Sunday Soirée, starting with the green one.",
    credit: "Photography by Keong Kadango",
    cover: T('cover'),
    coverKind: 'photo',
    credits: [
      { role: 'Photography', name: 'Keong Kadango' },
      { role: 'Video', name: 'Polycarp Films' },
      { role: 'Clothes', name: 'The Stitchroom' },
      { role: 'Watches & Eyewear', name: 'Watch Galore' },
      { role: 'Words & Styling', name: 'Wongani Siwande' }
    ],
    body: [
      "The first time I tried matcha was at a Sunday Soirée tasting. I went in for the drink and came out with a colour. That soft green stayed in my head long after the cup, so when the Blantyre Open edition handed us four colours and one of them was matcha, I knew which look I was building first.",
      "The Blantyre Open gave us four colours and a tennis court, and the weather decided the rest. When an event starts at 1:30 in full sun and runs into a warm evening, you have to think about comfort, which is a big part of looking good anyway.",
      "Summer looks different for me this year, and not only because I now build lookbooks for events like the Sunday Soirée. It is hotter, it is less predictable and, most of all, it is hard to find a good in-between outfit that actually looks good.",
      "So for this edition I took my cue from the weather: big, light, breathable fabrics, a country club look that is part old and part modern, and some of my favourite sports dressers, like Lewis Hamilton on and off the track (how does he do that?) and Naomi Osaka, and the way she shows up in her clothes on and off the court.",
      "I wanted a contrast between player and spectator, though I leaned more spectator, and I worked with The Stitchroom to make these breathable pieces. I mixed shorts and trousers and used mostly white to set up each look, which, funnily enough, made the other colours stand out more.",
      "The four colours this edition were matcha, rosé pink, muted blue and white. Consider this your reminder that inspiration isn’t a strict dress code. Fashion is expression, and you can bring your own palette into the official one. A lot of people think you can’t, and that’s okay, but listen to me if you want to wear something you’re comfortable in while you have a good time.",
      "Here is how each look came together.",
      "## Look 01 · Rosé Pink",
      "I started with the spectator. A blush pink satin shirt with a band collar, worn loose over white wide leg trousers, because if it’s going to be this hot I want air moving. The cow print Sambas were my bit of fun at the bottom, and the black and gold frames with the lilac lens kept the pink from getting too sweet (pink tips over fast if you let it).",
      "## Look 02 · Matcha",
      "This is the closest I got to dressing like a player. A matcha polo, white tennis shorts and the Adidas Originals Sambas, so basically kit. I went oversized on the polo so it felt more clubhouse than uniform, and I added a silk neckerchief because I liked the idea of a player who looks like he also came to watch. Gold frames and a black digital watch to finish it off.",
      "## Look 03 · White",
      "You can’t do a tennis lookbook without an all white look. When everything is one colour, the texture has to do the work, so I went for a textured tee and matching shorts, a washed pink cap and, yes, the cow print Sambas again. I told you I like them.",
      "## Look 04 · White and Matcha",
      "Back to the stands, or the lawn chair if I’m being honest. A seersucker tee and shorts, because that crinkle keeps the fabric off your skin when it’s this hot. The neckerchief from look 02 came back, so did the Adidas Originals Sambas, and the green cap brought in a bit of the grass.",
      "## Look 05 · Powder Blue",
      "The last look bends the rules a little. A powder blue wrap front shirt with the collar left open, over straight leg jeans and mint Sambas. Denim is not the first thing anyone thinks of at a country club, which is exactly why I wanted it there. I kept everything else quiet so the turquoise dial on the watch could have its moment.",
      "If you noticed, a lot of these pieces came back more than once. The Sambas, the neckerchief, the watch. That was on purpose. You don’t need a new outfit for every colour on the invite; you need a few good pieces and the confidence to wear them your way.",
      "Thank you to The Stitchroom for bringing my ideas to life, to Keong and Polycarp for seeing them the way I did, and to Watch Galore for the details. I’m grateful every single time people say yes to something that only existed in my head.",
      "See you on the grass."
    ],
    media: [
      { type: 'image', src: T('01-pink-portrait') },
      { type: 'image', src: T('02-pink-full') },
      { type: 'image', src: T('03-pink-frames') },
      { type: 'image', src: T('04-pink-sambas') },
      { type: 'image', src: T('05-matcha-full') },
      { type: 'image', src: T('06-matcha-portrait') },
      { type: 'image', src: T('07-matcha-watch') },
      { type: 'image', src: T('08-matcha-sambas') },
      { type: 'image', src: T('09-white-full') },
      { type: 'image', src: T('10-white-portrait') },
      { type: 'image', src: T('11-white-texture') },
      { type: 'image', src: T('12-lawn-seated') },
      { type: 'image', src: T('13-lawn-portrait') },
      { type: 'image', src: T('14-lawn-crossed') },
      { type: 'image', src: T('15-blue-portrait') },
      { type: 'image', src: T('16-blue-full') },
      { type: 'image', src: T('17-blue-watch') }
    ]
  },
  {
    id: 9,
    slug: 'one-of-two',
    published: '2026-11-11',
    title: "One of Two",
    verdict: "Not the camera I wanted, but the camera I had.",
    category: "Reflections",
    description: "A year of firsts, one nomination, and the camera I actually had. On finally knowing what the work is worth.",
    credit: "Nominated for Content Creator of the Year by the Institute of Marketing in Malawi (IMM), 2026",
    cover: A('9485'),
    coverKind: 'photo',
    body: [
      "Being a creative has handed me a lot of wins (and a lot of headaches). There is never a set rule or standard way of doing things, which for me looks like devising a formula for every single concept.",
      "When I received this nomination for Content Creator of the Year from the Institute of Marketing in Malawi, I looked back at every single challenge that led me here. It has been a year of a lot of firsts. First solo campaign. First solo trip to go and shoot content. And now, first marketing-related nomination.",
      "The most important first for me has been finally knowing what I do is worth (if I charge what I am worth, not even I can afford me). I know that a lot of the mechanics in the background will rarely be seen, but the output always speaks for itself.",
      "I was lucky to work on my personal brand alongside a lot of big brands like Enkosi, FDH and Kwithu Kitchen. I was so proud of this work that it easily landed me as one of two contenders, and I am forever grateful that I took the camera on my then iPhone X seriously. Not the camera I wanted, but the camera I had.",
      "This nomination in itself has opened doors for me, and you can expect a lot more greatness going forward."
    ]
  }
];

// Every piece carries an issue number, in the order it went live. Shown on the
// cards, at the top of the piece and on the Index.
const byDate = [...thoughtItems].sort((a, b) => (a.published === b.published ? a.id - b.id : a.published < b.published ? -1 : 1));
export const issueNo = (slug: string) => {
  const n = byDate.findIndex(t => t.slug === slug) + 1;
  return `No. ${String(n).padStart(2, '0')}`;
};
export const issueMonth = (iso: string) =>
  new Date(iso + 'T12:00:00Z').toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });
