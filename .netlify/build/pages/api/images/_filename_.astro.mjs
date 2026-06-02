import { getStore } from '@netlify/blobs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const STORE_NAME = "product-images";
const GET = async ({ params }) => {
  const { filename } = params;
  if (!filename) {
    return new Response(JSON.stringify({ error: "Filename is required" }), {
      headers: { "Content-Type": "application/json" },
      status: 400
    });
  }
  try {
    const store = getStore(STORE_NAME);
    const result = await store.getWithMetadata(filename, { type: "arrayBuffer" });
    if (!result || !result.data) {
      return new Response("Image not found", { status: 404 });
    }
    const contentType = result.metadata?.metadata?.contentType || "image/jpeg";
    return new Response(result.data, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch (error) {
    console.error("Error fetching image from blobs:", error);
    return new Response("Failed to load image", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
