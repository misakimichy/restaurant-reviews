const assetsCacheName = 'restaurant-reviews-cache-v1';
const cacheItem =[
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/',
    '/data/',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    './img/favicon.png',
    '/js/'
];

// Install service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(assetsCacheName).then(cache => {
            return cache.addAll(cacheItem);
        })
    );
});

// Update cache and delete old caches
self.addEventListener('activate', event => {
    console.log('Service worker is activated.')
    event.waitUntil(
        caches.keys().then(cachesNames => {
            return Promise.all(
                cachesNames.filter(cacheName => {
                    return cacheName.startsWith('restaurant-reviews-') &&
                    cacheName !== assetsCacheName;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// Fetch for offline content 
self.addEventListener('fetch', (event) => {
    event.respondWith(
        // check if the the request url already exists
        caches.match(event.request).then(response => {
            if(response) {
                return response;
            }
            return fetch(event.request)
            // .then(response => {
            //     const responseClone = response.clone();
            //     caches.open(cacheName).then(cache => {
            //         cache.put(event.request, responseClone);
            //     })
            // }
            
        }).catch(error => {
            console.log('error');
        })
    );
});