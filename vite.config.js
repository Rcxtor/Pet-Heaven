import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
    server: {
        host: '192.168.0.111',
        port: 5173,
        strictPort: true,
        proxy: {
            '/api': 'http://192.168.0.111:8000', // Proxy API calls to Laravel's backend
        },
    },
});
