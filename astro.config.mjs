import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://shadesworld.ng',
  integrations: [tailwind()],
  output: 'server',  // Changed from hybrid to server for better dynamic route support
  adapter: netlify(),
});