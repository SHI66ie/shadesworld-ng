import type { APIRoute } from 'astro';
import { getStore } from '@netlify/blobs';

export const prerender = false;

const STORE_NAME = 'product-images';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return new Response(JSON.stringify({ error: 'File must be an image' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return new Response(JSON.stringify({ error: 'File size must be less than 5MB' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    // Convert file to base64
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    // Store in Netlify Blobs with unique filename
    const store = getStore(STORE_NAME);
    const filename = `${Date.now()}-${file.name}`;
    
    await store.set(filename, base64, {
      metadata: {
        contentType: file.type,
        originalName: file.name,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        imageUrl: dataUrl,
        filename: filename,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error uploading image:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to upload image: ' + (error instanceof Error ? error.message : 'Unknown error'),
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
};
