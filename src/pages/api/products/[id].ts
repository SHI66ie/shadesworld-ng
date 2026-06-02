import type { APIRoute } from 'astro';
import { getProducts, saveProducts } from '../../../utils/db.ts';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  try {
    const id = parseInt(params.id || '');
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: 'Invalid product ID' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
    
    const products = await getProducts();
    const product = products.find((p: any) => p.id === id);
    
    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 404,
      });
    }
    
    return new Response(JSON.stringify(product), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch product: ' + (error instanceof Error ? error.message : 'Unknown error')
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
};

export const PUT: APIRoute = async ({ request, params }) => {
  try {
    const id = parseInt(params.id || '');
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: 'Invalid product ID' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
    
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
    
    const productIndex = products.findIndex((p: any) => p.id === id);
    if (productIndex === -1) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 404,
      });
    }
    
    products[productIndex] = {
      ...products[productIndex],
      name: data.name.trim(),
      price: parseInt(data.price),
      category: data.category,
      stock: parseInt(data.stock),
      status: parseInt(data.stock) > 0 ? 'active' : 'out_of_stock',
      image: data.image || products[productIndex].image,
      description: data.description.trim(),
      sku: data.sku || products[productIndex].sku,
    };
    
    await saveProducts(products);
    
    return new Response(JSON.stringify(products[productIndex]), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to update product: ' + (error instanceof Error ? error.message : 'Unknown error')
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
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
    
    return new Response(JSON.stringify({ success: true, message: 'Product deleted successfully' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to delete product: ' + (error instanceof Error ? error.message : 'Unknown error')
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
};