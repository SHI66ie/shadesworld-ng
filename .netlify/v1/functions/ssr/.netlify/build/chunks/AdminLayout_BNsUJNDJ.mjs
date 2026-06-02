import { i as createAstro, j as createComponent, l as renderHead, n as renderSlot, o as renderTemplate } from './astro/server_BhlnreZN.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Astro = createAstro("https://shadesworld.ng");
const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title = "Admin Dashboard" } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} | Shades World Admin</title>${renderHead()}</head> <body class="bg-zinc-950 text-white min-h-screen flex"> <!-- Sidebar --> <aside class="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col fixed h-full"> <div class="p-6 border-b border-zinc-800"> <h2 class="text-xl font-bold tracking-tight text-amber-400">SHADES ADMIN</h2> </div> <nav class="flex-1 p-4 space-y-2"> <a href="/admin" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition text-sm font-medium"> <span class="text-lg">📊</span> Dashboard
</a> <a href="/admin/updates" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition text-sm font-medium"> <span class="text-lg">📢</span> Manage Updates
</a> <a href="/admin/products" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition text-sm font-medium text-zinc-400"> <span class="text-lg">🕶️</span> Products
</a> <a href="/admin/orders" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition text-sm font-medium text-zinc-400"> <span class="text-lg">📦</span> Orders
</a> </nav> <div class="p-4 border-t border-zinc-800"> <a href="/" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition text-sm font-medium text-zinc-400"> <span class="text-lg">🌍</span> View Live Site
</a> </div> </aside> <!-- Main Content --> <main class="flex-1 ml-64 bg-zinc-950"> <!-- Top header --> <header class="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-10"> <h1 class="text-lg font-semibold">${title}</h1> <div class="flex items-center gap-4"> <div class="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
👤
</div> </div> </header> <!-- Page Content --> <div class="p-8"> ${renderSlot($$result, $$slots["default"])} </div> </main> </body></html>`;
}, "C:/Users/Lenovo/Documents/GitHub/shadesworld-ng/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
