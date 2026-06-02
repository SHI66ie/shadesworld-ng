import { j as createComponent, m as maybeRenderHead, o as renderTemplate } from './astro/server_BhlnreZN.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$ThemeToggle = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button id="theme-toggle" class="w-10 h-10 bg-zinc-900 dark:bg-zinc-800 border border-zinc-800 dark:border-zinc-700 rounded-full flex items-center justify-center text-zinc-400 hover:text-white dark:hover:text-amber-400 transition-all duration-300" aria-label="Toggle theme"> <svg id="sun-icon" class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path> </svg> <svg id="moon-icon" class="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path> </svg> </button> `;
}, "C:/Users/Lenovo/Documents/GitHub/shadesworld-ng/src/components/ThemeToggle.astro", void 0);

export { $$ThemeToggle as $ };
