import 'types-serviceworker/src/webworker';

import addAll from './cacheALL';

const VERSION = 'BEACON-VERSION';
const PRE_CACHE_NAME = 'pre-cache';
const DYNAMIC_CACHE_NAME = 'dynamic';
const RESPONSE_200 = 200;

const STATIC_FILES: string[] = ['BEACON-STATIC'];

const MUTABLE_FILES: string[] = [];

declare let self: ServiceWorkerGlobalScope;

self.addEventListener('install', (event: ExtendableEvent) => {
    event.waitUntil(
        caches
            .open(PRE_CACHE_NAME)
            .then(cache => addAll(cache, STATIC_FILES, MUTABLE_FILES)),
    );
});

self.addEventListener('fetch', (event: FetchEvent) => {
    const { request } = event;
    event.respondWith(
        caches.match(request).then(response => {
            return (
                response ||
                fetch(event.request).then(res => {
                    const cacheResp = res.clone();

                    // only cache is the status is OK, not a chrome-extension URL & not POST
                    if (
                        [0, RESPONSE_200].includes(res.status) &&
                        request.url.indexOf('chrome-extension')
                    ) {
                        caches
                            .open(`${DYNAMIC_CACHE_NAME}-${VERSION}`)
                            .then(cache => {
                                cache.put(request, cacheResp);
                            });
                    }
                    return res;
                })
            );
        }),
    );
});

self.addEventListener('activate', (event: ExtendableEvent) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            cacheNames.forEach(item => {
                if (item.indexOf(VERSION) < 0) {
                    return caches.delete(item);
                }
            });
        }),
    );
});
