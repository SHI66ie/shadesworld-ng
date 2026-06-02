import { getStore } from '@netlify/blobs';
import { products as initialProducts } from '../data/products.ts';
import fs from 'node:fs';
import path from 'node:path';

const PRODUCTS_STORE_NAME = 'products';
const IMAGES_STORE_NAME = 'product-images';

// Local storage file paths
const DATA_DIR = path.resolve('src/data');
const PRODUCTS_JSON_PATH = path.join(DATA_DIR, 'products_db.json');
const UPLOADS_DIR = path.resolve('public/images/uploads');

// Ensure local folders exist
function ensureLocalDirs() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

// Helper to check if we should use Netlify Blobs or local filesystem
function isNetlify() {
  // In development mode, use local filesystem. In production build (Netlify), use Blobs.
  return !import.meta.env.DEV;
}

export async function getProducts(): Promise<any[]> {
  if (isNetlify()) {
    try {
      const store = getStore(PRODUCTS_STORE_NAME);
      let products = await store.get('products', { type: 'json' });
      if (products && Array.isArray(products)) {
        return products;
      }
      // If products store is empty/null in Netlify Blobs, initialize it and return initialProducts
      const initial = [...initialProducts];
      await store.setJSON('products', initial);
      return initial;
    } catch (e) {
      console.error('Failed to retrieve products from Netlify Blobs:', e);
      // Return static memory data in production fallback without writing to disk
      return [...initialProducts];
    }
  }

  // Local storage fallback (ONLY runs in non-Netlify environments)
  ensureLocalDirs();
  if (fs.existsSync(PRODUCTS_JSON_PATH)) {
    try {
      const data = fs.readFileSync(PRODUCTS_JSON_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to read local products_db.json:', e);
    }
  }

  // If file doesn't exist or is corrupted, write initial products
  try {
    fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(initialProducts, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to write initial products to local storage:', e);
  }
  return [...initialProducts];
}

export async function saveProducts(products: any[]): Promise<void> {
  if (isNetlify()) {
    try {
      const store = getStore(PRODUCTS_STORE_NAME);
      await store.setJSON('products', products);
      return;
    } catch (e) {
      console.error('Failed to save products to Netlify Blobs:', e);
      throw new Error('Failed to save products to database');
    }
  }

  // Local storage fallback
  ensureLocalDirs();
  try {
    fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(products, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to save products locally:', e);
    throw new Error('Failed to save products locally');
  }
}

export async function saveUploadedImage(filename: string, buffer: ArrayBuffer, contentType: string): Promise<void> {
  if (isNetlify()) {
    try {
      const store = getStore(IMAGES_STORE_NAME);
      await store.set(filename, buffer, {
        metadata: {
          contentType,
          originalName: filename,
        },
      });
      return;
    } catch (e) {
      console.error('Failed to upload image to Netlify Blobs:', e);
      throw new Error('Failed to upload image to database');
    }
  }

  // Local storage fallback
  ensureLocalDirs();
  const filePath = path.join(UPLOADS_DIR, filename);
  try {
    fs.writeFileSync(filePath, Buffer.from(buffer));
  } catch (e) {
    console.error('Failed to save image locally:', e);
    throw new Error('Failed to save image locally');
  }
}

interface ImageResult {
  data: ArrayBuffer;
  contentType: string;
}

export async function getUploadedImage(filename: string): Promise<ImageResult | null> {
  if (isNetlify()) {
    try {
      const store = getStore(IMAGES_STORE_NAME);
      const result = await store.getWithMetadata(filename, { type: 'arrayBuffer' });
      if (result && result.data) {
        const contentType = (result.metadata?.metadata?.contentType as string) || 'image/jpeg';
        return {
          data: result.data,
          contentType,
        };
      }
      return null;
    } catch (e) {
      console.error('Failed to get image from Netlify Blobs:', e);
      return null;
    }
  }

  // Local storage fallback
  ensureLocalDirs();
  const filePath = path.join(UPLOADS_DIR, filename);
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath);
      // Determine content type based on extension
      let contentType = 'image/jpeg';
      const ext = path.extname(filename).toLowerCase();
      if (ext === '.png') contentType = 'image/png';
      else if (ext === '.gif') contentType = 'image/gif';
      else if (ext === '.svg') contentType = 'image/svg+xml';
      else if (ext === '.webp') contentType = 'image/webp';

      return {
        data: data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer,
        contentType,
      };
    } catch (e) {
      console.error('Failed to read image locally:', e);
    }
  }

  return null;
}
