import { generateOgImageForPost } from '@utils/og-images/generateOgImages';
import { projects } from '@utils/getSortedPosts';
import type { APIRoute } from 'astro';
import type { CollectionEntry } from 'astro:content';

export async function getStaticPaths() {
  return projects.map(post => ({
    params: { id: post.id },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) => {
  try {
    const image = await generateOgImageForPost(
      props as CollectionEntry<'projects'>
    );
    return new Response(image, {
      headers: {
        'Content-Type': 'image.webp',
      },
    });
  } catch (error) {
    console.error('Error generating OG image for post:', error);
    return new Response('Error generating OG image for post', { status: 500 });
  }
};
