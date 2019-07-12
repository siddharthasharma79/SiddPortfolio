//Caching variables
const cacheName = 'v3';

// Call install event 
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
    // adding cache
});

// Call activate event
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    // Removing unwanted cache
    e.waitUntil(
        caches.keys().then( cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache ' + cache );
                        caches.delete(cache);
                    }
                })        
            )
        })
        .catch(err => console.log('Error: ' + err))
    );
    
});

// Call fetch event
self.addEventListener('fetch', e => {
    console.log(`Service Worker: Fetching URL: ${e.request.url}`);
    e.respondWith(
      fetch(e.request)
        .then(res => {
          // Make copy / clone of response
          console.log('Service Worker: Copying / Clone the response');
          const resClone = res.clone();
          // Open cache
          caches
            .open(cacheName)
            .then(cache => {
              // Add response to cache
              cache.put(e.request, resClone);
            });
          return res;
      })
      .catch(err => caches.match(e.request).then(res => res))
    );
});