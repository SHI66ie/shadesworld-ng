import type { APIRoute } from 'astro';
import { products } from '../../../data/products.ts';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(products), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  
  const newProduct = {
    id: products.length + 1,
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
  
  return new Response(JSON.stringify(newProduct), {
    headers: { 'Content-Type': 'application/json' },
    status: 201,
  });
};
