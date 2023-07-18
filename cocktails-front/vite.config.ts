import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/cocktails-front/',
    plugins: [
        vue(),
        vueJsx(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
            injectRegister: 'auto',
            workbox: {
                cleanupOutdatedCaches: true,
                globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}'],
            },
            manifest: {
                theme_color: '#210b42',
                background_color: '#edaa22',
                display: 'standalone',
                scope: '/',
                start_url: '/',
                name: 'Cocktail Paradise',
                short_name: 'Cocktail',
                description: 'Get cocktail at random with ingredients and instructions',
                icons: [
                    {
                        src: './assets/images/pwa/pwa-64x64.png',
                        sizes: '64x64',
                        type: 'image/png',
                    },
                    {
                        src: './assets/images/pwa/pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: './assets/images/pwa/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any',
                    },
                    {
                        src: './assets/images/pwa/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
