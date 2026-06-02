import type { APIRoute } from 'astro';
import { getStore } from '@netlify/blobs';

export const prerender = false;

const STORE_NAME = 'product-images';

export const GET: APIRoute = async ({ params }) => {
  const { filename } = params;
  if (!filename) {
    return new Response(JSON.stringify({ error: 'Filename is required' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }

  try {
    const store = getStore(STORE_NAME);
    const result = await store.getWithMetadata(filename, { type: 'arrayBuffer' });
    
    if (!result || !result.data) {
      return new Response('Image not found', { status: 404 });
    }

    const contentType = result.metadata?.metadata?.contentType as string || 'image/jpeg';

    return new Response(result.data, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error fetching image from blobs:', error);
    return new Response('Failed to load image', { status: 500 });
  }
};
