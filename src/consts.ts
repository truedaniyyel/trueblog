import type { Site, Socials } from './types';
import { minutesToMilliseconds } from './utils/minutesToMilliseconds';

export const SITE: Site = {
  TITLE: 'trueblog',
  DESCRIPTION: 'Welcome to trueblog.',
  AUTHOR: 'Daniel Adrian',
  CANONICAL_URL: import.meta.env.DEV
    ? 'http://localhost:4321'
    : 'https://trueblog.pages.dev',
  LOCALE: 'en',
  CATEGORIES: ['blog', 'projects'],
  OG_IMAGE: '/og-image.webp',

  TWITTER: {
    CREATOR: '@truedaniyyel',
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
    HREF: 'https://www.facebook.com/truedaniyyel',
  },
  {
    NAME: 'linkedin',
    LABEL: `${SITE.AUTHOR} on LinkedIn`,
    HREF: 'https://www.linkedin.com/in/truedaniyyel',
  },
  {
    NAME: 'github',
    LABEL: `${SITE.AUTHOR} on Github`,
    HREF: 'https://github.com/truedaniyyel',
  },
  {
    NAME: 'rss',
    LABEL: `${SITE.AUTHOR} on RSS`,
    HREF: `${SITE.CANONICAL_URL}/rss.xml`,
  },
];
