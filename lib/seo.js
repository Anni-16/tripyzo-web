export const SITE_NAME = "Tripyzo";
export const SITE_URL = "https://tripyzo.com";
export const DEFAULT_OG_IMAGE = "/images/hero-banner.jpg";

const defaultKeywords = [
  "Tripyzo",
  "Tripyzo flights",
  "cheap flights",
  "flight deals",
  "book flights online",
  "airline tickets",
  "domestic flights",
  "international flights",
  "last minute flights",
  "travel agency",
  "flight booking support",
];

export const indexRobots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export const noIndexRobots = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
};

export function absoluteUrl(path = "/") {
  if (!path) return SITE_URL;
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = DEFAULT_OG_IMAGE,
  robots = indexRobots,
  type = "website",
}) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const keywordList = Array.from(new Set([...keywords, ...defaultKeywords]));

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: keywordList,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} flight booking and travel deals`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      site: "@Tripyzo",
      creator: "@Tripyzo",
    },
    robots,
    category: "travel",
    referrer: "origin-when-cross-origin",
  };
}
