importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

workbox.routing.registerRoute(
    new RegExp('https://jsonplaceholder.typicode.com/users'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst({
      cacheName: 'google-fonts',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 30,
        }),
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
      ],
    }),
  );

workbox.precaching.precacheAndRoute([
  {
    "url": "css/main.css",
    "revision": "3ba6d6909e348a0d7ec95d78138d4e38"
  },
  {
    "url": "index.html",
    "revision": "8a7e66deddb30cb2c34d39a1726c7306"
  },
  {
    "url": "js/app.js",
    "revision": "0de4c29250c988601f05cc847a22255e"
  }
]);