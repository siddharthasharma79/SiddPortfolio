//Caching variables
const cacheName = 'v3';

const cacheAssets = [
    'index.html',
    'about.html',
    'js/main.js',
    'css/style.css'
];


// Call install event && adding cache
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
    // adding cache
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('Service Worker: Caching files');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
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
                        console.log('Service Worker: Clearing Old Cache');
                        caches.delete(cache);
                        
                    }
                })        
            )
        })
    );
    
});

// Call fetch event
self.addEventListener('fetch', e => {
    console.log(`Service Worker: Fetching URL: ${e.request.url}`);
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});