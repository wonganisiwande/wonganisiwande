import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE, DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_IMAGE, PERSON } from '../data/site';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title = "Wongani Siwande",
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url
}: SEOProps) {
  const { pathname } = useLocation();
  const fullTitle = title === "Wongani Siwande"
    ? DEFAULT_TITLE
    : `${title} | Wongani Siwande`;
  const canonical = url ?? `${SITE}${pathname}`;
  // og:image must be absolute for WhatsApp, IG, X and Google previews
  const absImage = image.startsWith('http') ? image : `${SITE}${image}`;

  const personSchema = { '@context': 'https://schema.org', ...PERSON };

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
