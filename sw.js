const C='mafia-v1',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const u=new URL(e.request.url),font=/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
 if(font){e.respondWith(caches.open(C).then(c=>c.match(e.request).then(r=>{const n=fetch(e.request).then(res=>{c.put(e.request,res.clone());return res}).catch(()=>r);return r||n})));return}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp));return res}).catch(()=>caches.match('index.html'))))});
