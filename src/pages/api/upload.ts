import type { APIRoute } from 'astro';
import { saveUploadedImage } from '../../utils/db.ts';

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

    // Convert file to ArrayBuffer
    const buffer = await file.arrayBuffer();

    // Store image with unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    
    await saveUploadedImage(filename, buffer, file.type);

    return new Response(
      JSON.stringify({
        success: true,
        imageUrl: `/api/images/${filename}`,
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
