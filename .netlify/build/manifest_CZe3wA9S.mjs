import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import 'html-escaper';
import 'clsx';
import { N as NOOP_MIDDLEWARE_HEADER, k as decodeKey } from './chunks/astro/server_BhlnreZN.mjs';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Lenovo/Documents/GitHub/shadesworld-ng/","adapterName":"@astrojs/netlify","routes":[{"file":"admin/orders/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/orders","isIndex":false,"type":"page","pattern":"^\\/admin\\/orders\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"orders","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/orders.astro","pathname":"/admin/orders","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"admin/products/add/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/products/add","isIndex":false,"type":"page","pattern":"^\\/admin\\/products\\/add\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"products","dynamic":false,"spread":false}],[{"content":"add","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/products/add.astro","pathname":"/admin/products/add","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"admin/updates/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/updates","isIndex":false,"type":"page","pattern":"^\\/admin\\/updates\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"updates","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/updates.astro","pathname":"/admin/updates","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"admin/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin","isIndex":true,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/index.astro","pathname":"/admin","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"checkout/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/checkout","isIndex":false,"type":"page","pattern":"^\\/checkout\\/?$","segments":[[{"content":"checkout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/checkout.astro","pathname":"/checkout","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.BuFH3-1j.css"}],"routeData":{"route":"/admin/products/edit","isIndex":false,"type":"page","pattern":"^\\/admin\\/products\\/edit\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"products","dynamic":false,"spread":false}],[{"content":"edit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/products/edit.astro","pathname":"/admin/products/edit","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"let a=[],o=null;async function s(){try{const e=await fetch(\"/api/products\");if(e.ok)return a=await e.json(),c(a),!0;{const t=await e.json();console.error(\"Error loading products:\",t),alert(`Failed to load products: ${t.error||\"Unknown error\"}`)}}catch(e){console.error(\"Error loading products:\",e),alert(`Error loading products: ${e instanceof Error?e.message:\"Unknown error\"}`)}return!1}function c(e){const t=document.getElementById(\"productsTableBody\");if(t.innerHTML=\"\",e.length===0){t.innerHTML='<tr><td colspan=\"7\" class=\"p-4 text-center text-zinc-400\">No products found</td></tr>';return}e.forEach(n=>{const r=document.createElement(\"tr\");r.className=\"hover:bg-zinc-800/50 transition\",r.setAttribute(\"data-id\",n.id);const d=n.status===\"active\"?'<span class=\"bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-xs font-medium\">Active</span>':'<span class=\"bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 rounded-full text-xs font-medium\">Out of Stock</span>';r.innerHTML=`\n          <td class=\"p-4\">\n            <div class=\"w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center text-xl\">🕶️</div>\n          </td>\n          <td class=\"p-4\">\n            <p class=\"font-medium text-white\">${n.name}</p>\n            <p class=\"text-xs text-zinc-500\">SKU: ${n.sku}</p>\n          </td>\n          <td class=\"p-4 text-sm text-zinc-400\">${n.category}</td>\n          <td class=\"p-4 font-medium text-amber-400\">₦${n.price.toLocaleString()}</td>\n          <td class=\"p-4 text-sm text-zinc-400\">${n.stock} in stock</td>\n          <td class=\"p-4\">${d}</td>\n          <td class=\"p-4 text-right\">\n            <button type=\"button\" onclick=\"window.editProduct(${n.id})\" class=\"text-zinc-400 hover:text-white transition px-2\">Edit</button>\n            <button type=\"button\" onclick=\"window.deleteProduct(${n.id})\" class=\"text-red-400 hover:text-red-300 transition px-2\">Delete</button>\n          </td>\n        `,t.appendChild(r)})}function i(){const e=document.getElementById(\"searchInput\").value.toLowerCase(),t=document.getElementById(\"categoryFilter\").value,n=a.filter(r=>{const d=r.name.toLowerCase().includes(e)||r.sku.toLowerCase().includes(e)||r.description.toLowerCase().includes(e),f=!t||r.category===t;return d&&f});c(n)}async function m(){const e=document.getElementById(\"refreshBtn\"),t=e.innerHTML;e.disabled=!0,e.innerHTML=\"<span>⏳</span> Refreshing...\";const n=await s();e.disabled=!1,e.innerHTML=t,n&&(e.classList.add(\"animate-pulse\"),setTimeout(()=>e.classList.remove(\"animate-pulse\"),500))}async function p(e){if(confirm(\"Are you sure you want to delete this product?\"))try{const t=await fetch(`/api/products/${e}`,{method:\"DELETE\"});if(t.ok){const n=await t.json();alert(\"Product deleted successfully!\"),await s()}else{const n=await t.json();alert(`Failed to delete product: ${n.error||\"Unknown error\"}`)}}catch(t){console.error(\"Error deleting product:\",t),alert(`Error deleting product: ${t instanceof Error?t.message:\"Unknown error\"}`)}}function g(e){window.location.href=`/admin/products/edit?id=${e}`}function l(){o&&clearInterval(o),o=setInterval(s,3e4)}function u(){o&&(clearInterval(o),o=null)}window.editProduct=g;window.deleteProduct=p;document.getElementById(\"searchInput\").addEventListener(\"input\",i);document.getElementById(\"categoryFilter\").addEventListener(\"change\",i);document.getElementById(\"refreshBtn\").addEventListener(\"click\",m);document.addEventListener(\"visibilitychange\",()=>{document.hidden?u():(s(),l())});s();l();window.addEventListener(\"beforeunload\",u);\n"}],"styles":[{"type":"external","src":"/_astro/index.BuFH3-1j.css"}],"routeData":{"route":"/admin/products","isIndex":false,"type":"page","pattern":"^\\/admin\\/products\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"products","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/products.astro","pathname":"/admin/products","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/images/[filename]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/images\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"images","dynamic":false,"spread":false}],[{"content":"filename","dynamic":true,"spread":false}]],"params":["filename"],"component":"src/pages/api/images/[filename].ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/products/[id]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/products\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"products","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/products/[id].ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/products","isIndex":true,"type":"endpoint","pattern":"^\\/api\\/products\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"products","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/products/index.ts","pathname":"/api/products","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/upload","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/upload\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"upload","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/upload.ts","pathname":"/api/upload","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const a=document.getElementById(\"theme-toggle\"),e=document.documentElement,t=localStorage.getItem(\"theme\"),c=window.matchMedia(\"(prefers-color-scheme: dark)\").matches;t===\"dark\"||!t&&c?e.classList.add(\"dark\"):e.classList.remove(\"dark\");a.addEventListener(\"click\",()=>{e.classList.toggle(\"dark\");const s=e.classList.contains(\"dark\");localStorage.setItem(\"theme\",s?\"dark\":\"light\")});\n"}],"styles":[{"type":"external","src":"/_astro/index.BuFH3-1j.css"}],"routeData":{"route":"/shop","isIndex":false,"type":"page","pattern":"^\\/shop\\/?$","segments":[[{"content":"shop","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/shop.astro","pathname":"/shop","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const a=document.getElementById(\"theme-toggle\"),e=document.documentElement,t=localStorage.getItem(\"theme\"),c=window.matchMedia(\"(prefers-color-scheme: dark)\").matches;t===\"dark\"||!t&&c?e.classList.add(\"dark\"):e.classList.remove(\"dark\");a.addEventListener(\"click\",()=>{e.classList.toggle(\"dark\");const s=e.classList.contains(\"dark\");localStorage.setItem(\"theme\",s?\"dark\":\"light\")});\n"}],"styles":[{"type":"external","src":"/_astro/index.BuFH3-1j.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://shadesworld.ng","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Lenovo/Documents/GitHub/shadesworld-ng/src/pages/checkout.astro",{"propagation":"none","containsHead":true}],["C:/Users/Lenovo/Documents/GitHub/shadesworld-ng/src/pages/shop.astro",{"propagation":"none","containsHead":true}],["C:/Users/Lenovo/Documents/GitHub/shadesworld-ng/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Lenovo/Documents/GitHub/shadesworld-ng/src/pages/admin/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Lenovo/Documents/GitHub/shadesworld-ng/src/pages/admin/orders.astro",{"propagation":"none","containsHead":true}],["C:/Users/Lenovo/Documents/GitHub/shadesworld-ng/src/pages/admin/products.astro",{"propagation":"none","containsHead":true}],["C:/Users/Lenovo/Documents/GitHub/shadesworld-ng/src/pages/admin/products/add.astro",{"propagation":"none","containsHead":true}],["C:/Users/Lenovo/Documents/GitHub/shadesworld-ng/src/pages/admin/products/edit.astro",{"propagation":"none","containsHead":true}],["C:/Users/Lenovo/Documents/GitHub/shadesworld-ng/src/pages/admin/updates.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/admin/orders@_@astro":"pages/admin/orders.astro.mjs","\u0000@astro-page:src/pages/admin/products/add@_@astro":"pages/admin/products/add.astro.mjs","\u0000@astro-page:src/pages/admin/products/edit@_@astro":"pages/admin/products/edit.astro.mjs","\u0000@astro-page:src/pages/admin/products@_@astro":"pages/admin/products.astro.mjs","\u0000@astro-page:src/pages/admin/updates@_@astro":"pages/admin/updates.astro.mjs","\u0000@astro-page:src/pages/admin/index@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/api/images/[filename]@_@ts":"pages/api/images/_filename_.astro.mjs","\u0000@astro-page:src/pages/api/products/[id]@_@ts":"pages/api/products/_id_.astro.mjs","\u0000@astro-page:src/pages/api/products/index@_@ts":"pages/api/products.astro.mjs","\u0000@astro-page:src/pages/api/upload@_@ts":"pages/api/upload.astro.mjs","\u0000@astro-page:src/pages/checkout@_@astro":"pages/checkout.astro.mjs","\u0000@astro-page:src/pages/shop@_@astro":"pages/shop.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CZe3wA9S.mjs","C:/Users/Lenovo/Documents/GitHub/shadesworld-ng/src/data/products.ts":"chunks/products_BP3GvgAQ.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.CCt987YX.js","/astro/hoisted.js?q=1":"_astro/hoisted.BFGZfS3s.js","/astro/hoisted.js?q=2":"_astro/hoisted.B9hOnFsv.js","/astro/hoisted.js?q=3":"_astro/hoisted.DjnbHoMf.js","/astro/hoisted.js?q=4":"_astro/hoisted.m2e7HXsq.js","/astro/hoisted.js?q=5":"_astro/hoisted.fyWOaIt2.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.BuFH3-1j.css","/images/hero.png","/images/product1.png","/images/product2.png","/admin/orders/index.html","/admin/products/add/index.html","/admin/updates/index.html","/admin/index.html","/checkout/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"EJeZK8N+RlWVzTnxorcnINL2WU1J2AxipfMXERVEFgg=","experimentalEnvGetSecretEnabled":false});

export { manifest };
