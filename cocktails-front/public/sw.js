import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

const addResourcesToCache = async (resources) => {
    const cache = await caches.open('v1');
    await cache.addAll(resources);
};

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js', { scope: '/' });
    });

    self.addEventListener('install', (event) => {
        event.waitUntil(
            addResourcesToCache([
                '/',
                '/index.html',
                '/style.css',
                '/app.js',
                '/image-list.js',
                '/star-wars-logo.jpg',
                '/gallery/bountyHunters.jpg',
                '/gallery/myLittleVader.jpg',
                '/gallery/snowTroopers.jpg',
            ])
        );
    });
}
