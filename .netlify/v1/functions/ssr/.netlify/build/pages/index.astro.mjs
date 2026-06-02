/* empty css                                 */
import { i as createAstro, j as createComponent, l as renderHead, r as renderComponent, h as addAttribute, o as renderTemplate } from '../chunks/astro/server_BhlnreZN.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$ThemeToggle } from '../chunks/ThemeToggle_DwOPj925.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://shadesworld.ng");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let products = [];
  try {
    const response = await fetch(new URL("/api/products", Astro2.url.origin).toString());
    if (response.ok) {
      products = await response.json();
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
    const { products: staticProducts } = await import('../chunks/products_BP3GvgAQ.mjs');
    products = staticProducts;
  }
  return renderTemplate`<html lang="en" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>SHADES WORLD | Premium Sunglasses in Abuja</title><meta name="description" content="Discover premium sunglasses and optical frames in Abuja. Shop our exclusive collection of luxury eyewear."><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">${renderHead()}</head> <body class="min-h-screen bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-900 selection:bg-amber-500/30 font-sans"> <!-- Navbar --> <nav class="fixed top-0 w-full bg-zinc-950/60 dark:bg-white/60 backdrop-blur-xl z-50 border-b border-white/5 dark:border-zinc-200 transition-all duration-300"> <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center"> <div class="flex items-center gap-3 group cursor-pointer"> <span class="text-3xl group-hover:rotate-12 transition-transform duration-300">🕶️</span> <h1 class="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 dark:from-zinc-900 dark:via-zinc-700 dark:to-zinc-500 bg-clip-text text-transparent">SHADES WORLD</h1> </div> <div class="hidden md:flex gap-10 text-sm uppercase tracking-[0.2em] font-medium text-zinc-400 dark:text-zinc-600"> <a href="/shop" class="hover:text-amber-400 transition-colors duration-300">Shop</a> <a href="#about" class="hover:text-amber-400 transition-colors duration-300">About</a> <a href="#contact" class="hover:text-amber-400 transition-colors duration-300">Contact</a> </div> <div class="flex items-center gap-4"> ${renderComponent($$result, "ThemeToggle", $$ThemeToggle, {})} <a href="https://wa.me/2348074007172?text=Hi%20Shades%20World%2C%20I%27d%20like%20to%20place%20an%20order%20%F0%9F%91%93" target="_blank" class="bg-white/10 dark:bg-zinc-900 hover:bg-amber-500 px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 border border-white/10 dark:border-zinc-700 hover:border-amber-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:text-black"> <span class="text-lg">💬</span> WhatsApp
</a> </div> </div> </nav> <!-- Hero --> <section class="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden"> <div class="absolute inset-0 z-0"> <img src="/images/hero.png" alt="Futuristic Sunglasses" class="w-full h-full object-cover opacity-40 blur-[2px] scale-105"> <div class="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950/80 to-zinc-950 dark:from-zinc-100/50 dark:via-zinc-100/80 dark:to-zinc-100"></div> </div> <div class="relative z-10 max-w-7xl mx-auto px-6 text-center"> <div class="inline-block mb-4 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-medium tracking-widest backdrop-blur-sm">
NEW COLLECTION 2026
</div> <h2 class="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-tight">
SHADE <br class="md:hidden"><span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">YOUR WORLD</span> </h2> <p class="text-lg md:text-2xl text-zinc-400 dark:text-zinc-600 max-w-2xl mx-auto mb-10 font-light">
Experience unparalleled clarity and style. Premium sunglasses & optical frames curated for the modern visionary in Abuja.
</p> <div class="flex flex-col sm:flex-row items-center justify-center gap-4"> <a href="/shop" class="w-full sm:w-auto bg-white dark:bg-zinc-900 text-black dark:text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-amber-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
Explore Collection
</a> <a href="#about" class="w-full sm:w-auto bg-white/5 dark:bg-zinc-900/5 text-white dark:text-zinc-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-white/10 dark:hover:bg-zinc-900/10 border border-white/10 dark:border-zinc-300 transition-all duration-300 backdrop-blur-sm">
Our Story
</a> </div> </div> </section> <!-- Products --> <section id="shop" class="py-24 bg-zinc-950 dark:bg-zinc-100 relative"> <!-- Decorative background elements --> <div class="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div> <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div> <div class="max-w-7xl mx-auto px-6 relative z-10"> <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"> <div> <h3 class="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white dark:text-zinc-900">Featured Shades</h3> <p class="text-zinc-400 dark:text-zinc-600 text-lg max-w-md">Discover our most sought-after pieces, blending timeless design with contemporary aesthetics.</p> </div> <a href="/shop" class="text-amber-400 font-medium flex items-center gap-2 hover:text-amber-300 transition-colors group">
View Full Catalog <span class="group-hover:translate-x-1 transition-transform">→</span> </a> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${products.slice(0, 3).map((product) => renderTemplate`<div class="group relative rounded-3xl bg-zinc-900/50 dark:bg-zinc-100/50 border border-white/5 dark:border-zinc-200 p-4 hover:bg-zinc-800/50 dark:hover:bg-zinc-200/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"> <div class="relative h-80 rounded-2xl overflow-hidden mb-6 bg-zinc-800 dark:bg-zinc-200"> <img${addAttribute(product.image, "src")}${addAttribute(product.name, "alt")} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"> <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div> ${product.id === 1 && renderTemplate`<div class="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 text-zinc-300">
BEST SELLER
</div>`} ${product.id === 7 && renderTemplate`<div class="absolute top-4 right-4 bg-amber-500/20 backdrop-blur-md text-xs font-bold px-3 py-1.5 rounded-full border border-amber-500/30 text-amber-400">
LIMITED
</div>`} </div> <div class="px-2"> <div class="flex justify-between items-start mb-2"> <h4 class="text-2xl font-bold text-white dark:text-zinc-900 group-hover:text-amber-400 transition-colors">${product.name}</h4> </div> <p class="text-zinc-400 dark:text-zinc-600 text-sm mb-4">${product.description}</p> <div class="flex justify-between items-center"> <p class="text-2xl font-light tracking-tight">₦${product.price.toLocaleString()}</p> <a${addAttribute(`/checkout?id=${product.id}`, "href")} class="bg-white/10 dark:bg-zinc-900 hover:bg-amber-400 hover:text-black p-3 rounded-xl transition-all duration-300"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg> </a> </div> </div> </div>`)} </div> </div> </section> <!-- Footer --> <footer class="bg-zinc-950 dark:bg-white py-16 border-t border-white/5 dark:border-zinc-200"> <div class="max-w-7xl mx-auto px-6"> <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"> <div> <div class="flex items-center gap-3 mb-6"> <span class="text-2xl">🕶️</span> <h2 class="text-xl font-bold tracking-tight text-white dark:text-zinc-900">SHADES WORLD</h2> </div> <p class="text-zinc-400 dark:text-zinc-600 text-sm leading-relaxed max-w-xs">
Elevating your vision with premium, curated eyewear. Based in Abuja, serving style worldwide.
</p> </div> <div> <h4 class="font-bold mb-6 text-white dark:text-zinc-900 tracking-widest text-sm uppercase">Quick Links</h4> <ul class="space-y-3 text-sm text-zinc-400 dark:text-zinc-600"> <li><a href="/shop" class="hover:text-amber-400 transition-colors">Shop Collection</a></li> <li><a href="#about" class="hover:text-amber-400 transition-colors">Our Story</a></li> <li><a href="#contact" class="hover:text-amber-400 transition-colors">Contact Us</a></li> </ul> </div> <div> <h4 class="font-bold mb-6 text-white dark:text-zinc-900 tracking-widest text-sm uppercase">Visit Us</h4> <address class="text-zinc-400 dark:text-zinc-600 text-sm not-italic space-y-2"> <p>Suite S005, KingFem Plaza</p> <p>Abuja, Nigeria</p> <p class="pt-4 text-white dark:text-zinc-900">Call/WhatsApp:</p> <a href="https://wa.me/2348074007172?text=Hi%20Shades%20World%2C%20I%27d%20like%20to%20place%20an%20order%20%F0%9F%91%93" class="text-amber-400 hover:text-amber-300 transition-colors inline-block">+234 807 400 7172</a> </address> </div> </div> <div class="pt-8 border-t border-white/5 dark:border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600 dark:text-zinc-400"> <p>© 2026 Shades World NG. All rights reserved.</p> <div class="flex gap-4"> <a href="#" class="hover:text-zinc-300 dark:hover:text-zinc-600 transition-colors">Privacy Policy</a> <a href="#" class="hover:text-zinc-300 dark:hover:text-zinc-600 transition-colors">Terms of Service</a> </div> </div> </div> </footer> </body></html>`;
}, "C:/Users/Lenovo/Documents/GitHub/shadesworld-ng/src/pages/index.astro", void 0);

const $$file = "C:/Users/Lenovo/Documents/GitHub/shadesworld-ng/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
