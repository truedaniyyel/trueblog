import { SITE } from '@consts';
import type { CollectionEntry } from 'astro:content';

export function filterPosts({
  data,
}: CollectionEntry<'blog'> | CollectionEntry<'projects'>) {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.SCHEDULED_POST_MARGIN;
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
}
