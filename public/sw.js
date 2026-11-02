if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise(s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()}).then(()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e}));self.define=(t,o)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let r={};const c=e=>n(e,i),a={module:{uri:i},exports:r,require:c};s[i]=Promise.all(t.map(e=>a[e]||c(e))).then(e=>(o(...e),r))}}define(["./workbox-55c274ea"],function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.registerRoute(({url:e})=>e.pathname.startsWith("/catalogo"),new e.StaleWhileRevalidate({cacheName:"catalog-pages",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(({url:e})=>e.pathname.startsWith("/api/"),new e.NetworkFirst({cacheName:"api-responses",networkTimeoutSeconds:5,plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:300})]}),"GET"),e.registerRoute(({url:e})=>e.pathname.match(/\.(?:png|jpg|jpeg|webp|avif|svg|gif)$/),new e.CacheFirst({cacheName:"images",plugins:[new e.ExpirationPlugin({maxEntries:200,maxAgeSeconds:2592e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(({url:e})=>e.pathname.match(/\.(?:js|css|woff2?)$/),new e.StaleWhileRevalidate({cacheName:"static-resources",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:604800})]}),"GET")});
//# sourceMappingURL=sw.js.map
//# sourceMappingURL=sw.js.map

// Self-skip waiting to activate new SW immediately
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

console.log("[ProMarket SW] Service worker loaded");
