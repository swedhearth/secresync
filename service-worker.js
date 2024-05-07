const appCaches = [
    {
        name: 'core_1.514_GitHub',
        urls: [
            './',
            './index.html',
            './assets/core/index.js',
            './assets/core/dbx.min.js',
            './assets/core/terra.js',
            './assets/core/bundle.js.map',
            './assets/core/index.css'
        ]
    },
    {
        name: 'static_1.501',
        urls: [
            './favicon.ico',
            './lpm.webmanifest',
            './browserconfig.xml',
            './assets/static/icons/micon-48x48.png',
            './assets/static/icons/micon-72x72.png',
            './assets/static/icons/micon-96x96.png',
            './assets/static/icons/micon-128x128.png',
            './assets/static/icons/micon-192x192.png',
            './assets/static/icons/micon-384x384.png',
            './assets/static/icons/micon-512x512.png',
            './assets/static/favicons/apple-touch-icon.png',
            './assets/static/favicons/favicon-16x16.png',
            './assets/static/favicons/favicon-32x32.png',
            './assets/static/favicons/mstile-150x150.png',
            './assets/static/favicons/safari-pinned-tab.svg',
            './assets/static/appSvg/sprite.svg',
        ]
    }
];

var cacheWhitelist = appCaches.map( (cache) => cache.name );

self.addEventListener('install', event => {
    event.waitUntil(caches.keys().then(keys => {
        return Promise.all(appCaches.map(appCache => {
            if (keys.indexOf(appCache.name) === -1) {
                return caches.open(appCache.name).then(cache => cache.addAll(appCache.urls)) //"caching: " + appCache.name
            } else {
                return Promise.resolve(true); //"found but not caching: " + appCache.name
            }
        })).then(_ => {
            console.log('All relevant resources have been fetched and cached');
        }).catch(e => {
            console.log('Error while caching !!!', e);// !!! TO DO !!!
        });
    }));
});

self.addEventListener('message', event => {
	if (event.data.action === 'skipWaiting') self.skipWaiting();
});

self.addEventListener('activate', event => {
	event.waitUntil(caches.keys().then(keyList => {
        return Promise.all(keyList.map(key => {
            if (cacheWhitelist.indexOf(key) === -1) return caches.delete(key);
        }));
	}));
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    event.respondWith(caches.match(event.request).then(response => response || fetch(event.request).then(response)).catch(e => console.log("catch in fetch in Service worker", e)))
});

