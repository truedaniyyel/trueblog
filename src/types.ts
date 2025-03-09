export type ThemeOption = 'light' | 'dark';

export type CategoryType = 'blog' | 'projects';

export type Site = {
  TITLE: string;
  DESCRIPTION: string;
  AUTHOR: string;
  CANONICAL_URL: string;
  LOCALE?: string; // default en
  CATEGORIES: CategoryType[];
  OG_IMAGE: string;

  TWITTER?: {
    CREATOR?: string; // twitter handle
    CARD?: 'summary' | 'summary_large_image' | 'app' | 'player';
  };

  NUM_POSTS_ON_HOMEPAGE: number;
  NUM_PROJECTS_ON_HOMEPAGE: number;
  SCHEDULED_POST_MARGIN: number;
};

export type Socials = {
  NAME: string;
  LABEL: string;
  HREF: string;
}[];
