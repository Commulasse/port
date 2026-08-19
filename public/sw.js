/* PORT — service worker.
   Strategie: síť první, cache jako záloha (offline zobrazí naposledy načtenou verzi).
   Data ze serverless funkce se NIKDY nekešují — poptávky a objednávky musí být vždy aktuální. */
const CACHE = "port-v1";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((k) => Promise.all(k.filter((x) => x !== CACHE).map((x) => caches.delete(x))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/.netlify/")) return;   /* sdílená data vždy ze sítě */

  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.status === 200 && res.type === "basic") {
          const kopie = res.clone();
          caches.open(CACHE).then((c) => c.put(req, kopie));
        }
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || caches.match("/")))
  );
});
