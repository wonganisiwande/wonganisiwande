// Page copy for Home and Essence. Read by the page components and by routes.ts,
// so what a visitor sees and what a crawler receives can never drift apart.
//
// Register: his essay "One of Two". First person, spoken, one aside in
// brackets at most, specific nouns, a short plain closer.

export const HOME = {
  kicker: 'A note from the taste director',
  headline: 'You have good taste. Welcome.',
  intro:
    'I’m Wongani, a creative director based in Blantyre. I come up with the idea, make it look the way it should, and sometimes end up in front of the camera too. Fashion, film, content, and brands that want to be remembered for something.',
  workLabel: 'A few things I’m proud of',
  workLink: 'See everything',
  quote: 'Taste is an artform.',
  quoteLink: 'See how the ideas get made'
};

export const ESSENCE = {
  intro: 'Who I am, how I think, and why I keep doing this.',
  sections: [
    {
      title: 'Philosophy',
      content:
        'Taste is an artform, and I treat it like one. The idea comes first, the opportunity second, the action third. Most of what makes a piece work is a small detail nobody will point at, so that is usually where I start.'
    },
    {
      title: 'What I do',
      content:
        'I direct the creative and the art: the concept, the look, the shot list and the grade. I make content and short form series people come back for. I help brands work out what they stand for and how to say it. And I style, model and direct film, from the first treatment to the final cut. Sometimes I direct the frame, sometimes I’m in it (and sometimes both, which is its own kind of chaos).'
    },
    {
      title: 'So far',
      content:
        'Blantyre first, always. I represented Malawi at Mister Africa International in 2023. In 2026 the Institute of Marketing in Malawi nominated me for Content Creator of the Year, which I am still grateful for. These days I build personal brands that look and feel premium, from here to wherever the work goes next.'
    }
  ],
  closer:
    'I believe every strong idea begins with curiosity. My work lives behind the camera and in front of it, shaping ideas and, at times, wearing them. I notice the small thing that makes the whole thing work, then I build everything else around it.'
};
