// Service worker: GitHub Pages sends `cache-control: max-age=600` for every file
// and that can't be changed, so caching that should last longer happens here.
//
//  - /assets/*  (Vite output, content-hashed names → never change) : cache-first
//  - other images (/projects/*, /*.png …)                          : stale-while-revalidate
//  - pages / HTML                                                  : network only (deploys show at once)
//  - videos and anything else                                      : left to the browser
//
// Bump VERSION to drop every cache this worker created.
const VERSION = 'v1'
const ASSETS = `assets-${VERSION}`
const IMAGES = `images-${VERSION}`
const MAX_ENTRIES = { [ASSETS]: 80, [IMAGES]: 80 }

self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const keep = new Set([ASSETS, IMAGES])
      for (const key of await caches.keys()) if (!keep.has(key)) await caches.delete(key)
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', event => {
  const req = event.request
  if (req.method !== 'GET' || req.headers.has('range')) return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return

  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(cacheFirst(req, ASSETS))
  } else if (req.destination === 'image' || /\.(png|jpe?g|webp|avif|gif|svg)$/i.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(req, IMAGES, event))
  }
})

async function cacheFirst(req, name) {
  const cache = await caches.open(name)
  const hit = await cache.match(req)
  if (hit) return hit
  const res = await fetch(req)
  if (res.ok) await put(cache, name, req, res.clone())
  return res
}

async function staleWhileRevalidate(req, name, event) {
  const cache = await caches.open(name)
  const hit = await cache.match(req)
  const update = fetch(req)
    .then(async res => {
      if (res.ok) await put(cache, name, req, res.clone())
      return res
    })
    .catch(() => hit)
  if (hit) {
    event.waitUntil(update)
    return hit
  }
  return update
}

async function put(cache, name, req, res) {
  await cache.put(req, res)
  // keep the cache bounded: drop the oldest entries
  const keys = await cache.keys()
  const extra = keys.length - (MAX_ENTRIES[name] ?? 80)
  for (let i = 0; i < extra; i++) await cache.delete(keys[i])
}
