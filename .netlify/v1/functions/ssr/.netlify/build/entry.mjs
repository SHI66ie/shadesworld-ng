import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_CZe3wA9S.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/orders.astro.mjs');
const _page2 = () => import('./pages/admin/products/add.astro.mjs');
const _page3 = () => import('./pages/admin/products/edit.astro.mjs');
const _page4 = () => import('./pages/admin/products.astro.mjs');
const _page5 = () => import('./pages/admin/updates.astro.mjs');
const _page6 = () => import('./pages/admin.astro.mjs');
const _page7 = () => import('./pages/api/images/_filename_.astro.mjs');
const _page8 = () => import('./pages/api/products/_id_.astro.mjs');
const _page9 = () => import('./pages/api/products.astro.mjs');
const _page10 = () => import('./pages/api/upload.astro.mjs');
const _page11 = () => import('./pages/checkout.astro.mjs');
const _page12 = () => import('./pages/shop.astro.mjs');
const _page13 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/orders.astro", _page1],
    ["src/pages/admin/products/add.astro", _page2],
    ["src/pages/admin/products/edit.astro", _page3],
    ["src/pages/admin/products.astro", _page4],
    ["src/pages/admin/updates.astro", _page5],
    ["src/pages/admin/index.astro", _page6],
    ["src/pages/api/images/[filename].ts", _page7],
    ["src/pages/api/products/[id].ts", _page8],
    ["src/pages/api/products/index.ts", _page9],
    ["src/pages/api/upload.ts", _page10],
    ["src/pages/checkout.astro", _page11],
    ["src/pages/shop.astro", _page12],
    ["src/pages/index.astro", _page13]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "abd731f4-f077-45ec-800b-28255458dfae"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
