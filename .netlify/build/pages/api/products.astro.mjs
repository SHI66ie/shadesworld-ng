import { getStore } from '@netlify/blobs';
import { products } from '../../chunks/products_BP3GvgAQ.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const STORE_NAME = "products";
async function getProducts() {
  const store = getStore(STORE_NAME);
  let products$1 = await store.get("products", { type: "json" });
  if (!products$1 || products$1.length === 0) {
    products$1 = [...products];
    await store.setJSON("products", products$1);
  }
  return products$1;
}
async function saveProducts(products) {
  const store = getStore(STORE_NAME);
  await store.setJSON("products", products);
}
const GET = async () => {
  try {
    const products = await getProducts();
    return new Response(JSON.stringify(products), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({
      error: "Failed to fetch products: " + (error instanceof Error ? error.message : "Unknown error")
    }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
};
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    if (!data.name || !data.description || !data.category || data.price === void 0 || data.stock === void 0) {
      return new Response(JSON.stringify({
        error: "Missing required fields: name, description, category, price, stock"
      }), {
        headers: { "Content-Type": "application/json" },
        status: 400
      });
    }
    const products = await getProducts();
    const newProduct = {
      id: Math.max(0, ...products.map((p) => p.id)) + 1,
      slug: data.name.toLowerCase().replace(/\s+/g, "-"),
      name: data.name.trim(),
      price: parseInt(data.price),
      category: data.category,
      stock: parseInt(data.stock) || 0,
      status: parseInt(data.stock) > 0 ? "active" : "out_of_stock",
      image: data.image || "/images/hero.png",
      description: data.description.trim(),
      sku: data.sku || `SKU-${String(products.length + 1).padStart(3, "0")}`
    };
    products.push(newProduct);
    await saveProducts(products);
    return new Response(JSON.stringify(newProduct), {
      headers: { "Content-Type": "application/json" },
      status: 201
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return new Response(JSON.stringify({
      error: "Failed to create product: " + (error instanceof Error ? error.message : "Unknown error")
    }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
