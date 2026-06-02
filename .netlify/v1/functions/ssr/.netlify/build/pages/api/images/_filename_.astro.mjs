import { a as getUploadedImage } from '../../../chunks/db_CI64cCn7.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const GET = async ({ params }) => {
  const { filename } = params;
  if (!filename) {
    return new Response(JSON.stringify({ error: "Filename is required" }), {
      headers: { "Content-Type": "application/json" },
      status: 400
    });
  }
  try {
    const result = await getUploadedImage(filename);
    if (!result || !result.data) {
      return new Response("Image not found", { status: 404 });
    }
    return new Response(result.data, {
      headers: {
        "Content-Type": result.contentType,
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch (error) {
    console.error("Error fetching image:", error);
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
