import type { APIRoute } from 'astro';
import { products } from '../../../data/products.ts';

export const prerender = false;

export const PUT: APIRoute = async ({ request, params }) => {
  const id = parseInt(params.id || '');
  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: 'Invalid product ID' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
  const data = await request.json();
  
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return new Response(JSON.stringify({ error: 'Product not found' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 404,
    });
  }
  
  products[productIndex] = {
    ...products[productIndex],
    name: data.name || products[productIndex].name,
    price: data.price ? parseInt(data.price) : products[productIndex].price,
    category: data.category || products[productIndex].category,
    stock: data.stock !== undefined ? parseInt(data.stock) : products[productIndex].stock,
    status: data.stock !== undefined ? (data.stock > 0 ? 'active' : 'out_of_stock') : products[productIndex].status,
    image: data.image || products[productIndex].image,
    description: data.description || products[productIndex].description,
    sku: data.sku || products[productIndex].sku,
  };
  
  return new Response(JSON.stringify(products[productIndex]), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE: APIRoute = async ({ params }) => {
  const id = parseInt(params.id || '');
  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: 'Invalid product ID' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
  
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return new Response(JSON.stringify({ error: 'Product not found' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 404,
    });
  }
  
  products.splice(productIndex, 1);
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
