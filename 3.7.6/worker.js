/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.7.6,
 * Offline Application
 *
 * A service worker using the Cache API to store and load resources.
 * Keep tracks of cache version if any future changes occurs, when that happens
 * the version is incremented to maybe v2, that will be detected on the clients and
 * when the old resources in the cache is no longer used by the client it removes
 * that cache and uses the new which will be the replacement. 
 *
 * References:
 * https://developers.google.com/web/fundamentals/primers/service-workers
 * https://developer.mozilla.org/en-US/docs/Web/API/Cache
 */

const CACHE_NAME = 'v1';
const CACHE = [
  './',
  './index.html',
  './page1.html',
  './page2.html',
  './stylesheets/style.css',
  './scripts/script.js',
  './images/sun.jpg',
  './images/strawberry.jpg'
];

self.addEventListener('activate', (event) => {
  console.log(`${CACHE_NAME} is now ready to be used!`);
  // Remove all caches except the current version
  event.waitUntil(caches.keys().then((keys) => {
    return Promise.all(keys.map((key) => {
      if (CACHE_NAME.indexOf(key) === -1) {
        console.log(`Removing ${key}`);
        // Will be removed as long as there are no client using it,
        // as soon as a client stops using the old service worker, the
        // cache related to it will be deleted
        return caches.delete(key);
      }
    }));
  }));
});

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME)
    .then((cache) => {
      console.log('Cache all');
      CACHE.forEach((url) => console.log(`Caching resource: ${url}`))
      return cache.addAll(CACHE);
    }));
});

self.addEventListener('fetch', (event) => {
  // Check if the request matches anything in the cache
  event.respondWith(caches.match(event.request)
    .then((response) => {
      if (response) { // Found something in the cache
        console.log(`Loading resource from cache: ${response.url}`);
        return response; // Use resource in cache
      }

      // If not cached continue fetching the request
      return fetch(event.request).catch((error) => {
        // When this happens it either that the resource does not exist,
        // the network is down, or the site is down. Here its possible to
        // fallback responses depending on resources (images, html, etc...)
        console.error(error);
      });
    }));
});
