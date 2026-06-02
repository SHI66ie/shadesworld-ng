import type { APIRoute } from 'astro';
import { getProducts, saveProducts } from '../../../utils/db.ts';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const products = await getProducts();
    return new Response(JSON.stringify(products), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch products: ' + (error instanceof Error ? error.message : 'Unknown error')
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.description || !data.category || data.price === undefined || data.stock === undefined) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: name, description, category, price, stock' 
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
    
    const products = await getProducts();
    
    const newProduct = {
      id: Math.max(0, ...products.map((p: any) => p.id)) + 1,
      slug: data.name.toLowerCase().replace(/\s+/g, '-'),
      name: data.name.trim(),
      price: parseInt(data.price),
      category: data.category,
      stock: parseInt(data.stock) || 0,
      status: parseInt(data.stock) > 0 ? 'active' : 'out_of_stock',
      image: data.image || '/images/hero.png',
      description: data.description.trim(),
      sku: data.sku || `SKU-${String(products.length + 1).padStart(3, '0')}`,
    };
    
    products.push(newProduct);
    await saveProducts(products);
    
    return new Response(JSON.stringify(newProduct), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to create product: ' + (error instanceof Error ? error.message : 'Unknown error')
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
};