import type { APIRoute } from 'astro';
import { getStore } from '@netlify/blobs';
import { products as initialProducts } from '../../../data/products.ts';

export const prerender = false;

const STORE_NAME = 'products';

async function getProducts() {
  const store = getStore(STORE_NAME);
  let products = await store.get('products', { type: 'json' });
  if (!products || products.length === 0) {
    products = [...initialProducts];
    await store.setJSON('products', products);
  }
  return products;
}

async function saveProducts(products: any[]) {
  const store = getStore(STORE_NAME);
  await store.setJSON('products', products);
}

export const GET: APIRoute = async () => {
  const products = await getProducts();
  return new Response(JSON.stringify(products), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  
  const products = await getProducts();
  
  const newProduct = {
    id: Math.max(0, ...products.map((p: any) => p.id)) + 1,
    slug: data.name.toLowerCase().replace(/\s+/g, '-'),
    name: data.name,
    price: parseInt(data.price),
    category: data.category,
    stock: parseInt(data.stock) || 0,
    status: data.stock > 0 ? 'active' : 'out_of_stock',
    image: data.image || '/images/hero.png',
    description: data.description || '',
    sku: data.sku || `SKU-${String(products.length + 1).padStart(3, '0')}`,
  };
  
  products.push(newProduct);
  await saveProducts(products);
  
  return new Response(JSON.stringify(newProduct), {
    headers: { 'Content-Type': 'application/json' },
    status: 201,
  });
};