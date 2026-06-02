import { b as saveUploadedImage } from '../../chunks/db_CI64cCn7.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get("image");
    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        headers: { "Content-Type": "application/json" },
        status: 400
      });
    }
    if (!file.type.startsWith("image/")) {
      return new Response(JSON.stringify({ error: "File must be an image" }), {
        headers: { "Content-Type": "application/json" },
        status: 400
      });
    }
    if (file.size > 5 * 1024 * 1024) {
      return new Response(JSON.stringify({ error: "File size must be less than 5MB" }), {
        headers: { "Content-Type": "application/json" },
        status: 400
      });
    }
    const buffer = await file.arrayBuffer();
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    await saveUploadedImage(filename, buffer, file.type);
    return new Response(
      JSON.stringify({
        success: true,
        imageUrl: `/api/images/${filename}`,
        filename
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200
      }
    );
  } catch (error) {
    console.error("Error uploading image:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to upload image: " + (error instanceof Error ? error.message : "Unknown error")
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
