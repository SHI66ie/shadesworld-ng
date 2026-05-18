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

export const PUT: APIRoute = async ({ request, params }) => {
  const id = parseInt(params.id || '');
  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: 'Invalid product ID' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
  const data = await request.json();
  
  const products = await getProducts();
  
  const productIndex = products.findIndex((p: any) => p.id === id);
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
    status: data.stock !== undefined ? (parseInt(data.stock) > 0 ? 'active' : 'out_of_stock') : products[productIndex].status,
    image: data.image || products[productIndex].image,
    description: data.description || products[productIndex].description,
    sku: data.sku || products[productIndex].sku,
  };
  
  await saveProducts(products);
  
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
  
  const products = await getProducts();
  
  const productIndex = products.findIndex((p: any) => p.id === id);
  if (productIndex === -1) {
    return new Response(JSON.stringify({ error: 'Product not found' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 404,
    });
  }
  
  products.splice(productIndex, 1);
  
  await saveProducts(products);
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};