import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE = 'https://wonganisiwande.com';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title = "Wongani Siwande",
  description = "Creative director building aspiration through fashion, taste and premium personal brands. Creative direction, videography, content and presence from Blantyre, Malawi to the world.",
  image = "/media/amaryllis/taupe-tastemaker.jpg",
  url
}: SEOProps) {
  const { pathname } = useLocation();
  const fullTitle = title === "Wongani Siwande"
    ? "Wongani Siwande — Creative Director & Taste Direction, Malawi"
    : `${title} | Wongani Siwande`;
  const canonical = url ?? `${SITE}${pathname}`;
  // og:image must be absolute for WhatsApp, IG, X and Google previews
  const absImage = image.startsWith('http') ? image : `${SITE}${image}`;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Wongani Siwande",
    url: SITE,
    image: `${SITE}/media/amaryllis/taupe-tastemaker.jpg`,
    jobTitle: "Creative Director",
    description: "Creative director and tastemaker. Creative direction, brand strategy, videography, content creation and modeling.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Blantyre",
      addressCountry: "MW"
    },
    sameAs: [
      "https://www.instagram.com/wonganisiwande/",
      "https://www.tiktok.com/@wonganisiwande",
      "https://www.linkedin.com/in/wongani-siwande-/"
    ]
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Wongani Siwande" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absImage} />

      {/* Twitter / X */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={absImage} />

      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
    </Helmet>
  );
}
