import type { Site, Socials } from './types';
import { minutesToMilliseconds } from './utils/minutesToMilliseconds';

const isDev = import.meta.env.DEV;

export const SITE: Site = {
  TITLE: 'My Amazing Blog',
  DESCRIPTION: 'Welcome to my amazing blog.',
  AUTHOR: 'John Doe',
  CANONICAL_URL: isDev ? 'http://localhost:4321' : 'https://trueblog.pages.dev',
  LOCALE: 'en',
  CATEGORIES: ['blog', 'projects'],
  OG_IMAGE: '/og-image.webp',

  TWITTER: {
    CREATOR: '@john_doe',
    CARD: 'summary_large_image',
  },

  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
  SCHEDULED_POST_MARGIN: minutesToMilliseconds(15),
};

export const SOCIALS: Socials = [
  {
    NAME: 'facebook',
    LABEL: `${SITE.AUTHOR} on Facebook`,
    HREF: 'https://www.facebook.com/',
  },
  {
    NAME: 'linkedin',
    LABEL: `${SITE.AUTHOR} on LinkedIn`,
    HREF: 'https://www.linkedin.com/in/',
  },
  {
    NAME: 'github',
    LABEL: `${SITE.AUTHOR} on Github`,
    HREF: 'https://www.github.com/',
  },
  {
    NAME: 'rss',
    LABEL: `${SITE.AUTHOR} on RSS`,
    HREF: `${SITE.CANONICAL_URL}/rss.xml`,
  },
];
