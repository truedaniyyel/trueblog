import { getCollection } from 'astro:content';
import type { CategoryType } from 'types';
import { filterPosts } from './filterPosts';
import { sortByDate } from './sortByDate';

async function getSortedCollection(collectionName: CategoryType) {
  const collection = await getCollection(collectionName, filterPosts);
  return sortByDate(collection);
}

async function getSortedPosts() {
  const [blogPosts, projectPosts] = await Promise.all([
    getSortedCollection('blog'),
    getSortedCollection('projects'),
  ]);
  return sortByDate([...blogPosts, ...projectPosts]);
}

export const blog = await getSortedCollection('blog');
export const projects = await getSortedCollection('projects');
export const posts = await getSortedPosts();
