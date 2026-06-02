/* empty css                                    */
import { i as createAstro, j as createComponent, r as renderComponent, o as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BhlnreZN.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_BNsUJNDJ.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://shadesworld.ng");
const prerender = false;
const $$Products = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Products;
  let products = [];
  try {
    const response = await fetch(new URL("/api/products", Astro2.url.origin).toString());
    if (response.ok) {
      products = await response.json();
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
    const { products: staticProducts } = await import('../../chunks/products_BP3GvgAQ.mjs');
    products = staticProducts;
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Manage Products" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex justify-between items-center mb-8"> <p class="text-zinc-400">View, add, edit, and remove products from your store.</p> <div class="flex items-center gap-3"> <button id="refreshBtn" class="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition"> <span>🔄</span> Refresh
</button> <a href="/admin/products/add" class="bg-amber-400 hover:bg-amber-500 text-black px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition"> <span>+</span> Add Product
</a> </div> </div>  <div class="flex flex-col md:flex-row gap-4 mb-8"> <div class="flex-1"> <input type="text" id="searchInput" placeholder="Search products..." class="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition"> </div> <select id="categoryFilter" class="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition"> <option value="">All Categories</option> <option value="Men">Men</option> <option value="Women">Women</option> <option value="Unisex">Unisex</option> <option value="Optical Frames">Optical Frames</option> </select> </div>  <div class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden"> <table class="w-full text-left border-collapse"> <thead> <tr class="bg-zinc-950/50 border-b border-zinc-800 text-zinc-400 text-sm"> <th class="p-4 font-medium w-16">Image</th> <th class="p-4 font-medium">Product Name</th> <th class="p-4 font-medium">Category</th> <th class="p-4 font-medium">Price</th> <th class="p-4 font-medium">Stock</th> <th class="p-4 font-medium">Status</th> <th class="p-4 font-medium text-right">Actions</th> </tr> </thead> <tbody id="productsTableBody" class="divide-y divide-zinc-800"> <!-- Products will be loaded dynamically here --> </tbody> </table> </div>  ` })}`;
}, "C:/Users/Lenovo/Documents/GitHub/shadesworld-ng/src/pages/admin/products.astro", void 0);

const $$file = "C:/Users/Lenovo/Documents/GitHub/shadesworld-ng/src/pages/admin/products.astro";
const $$url = "/admin/products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Products,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
