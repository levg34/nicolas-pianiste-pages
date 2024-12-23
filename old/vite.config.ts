import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
    plugins: [solidPlugin()],
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'https://nicolas-pianiste-api-619867312973.europe-west9.run.app',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    build: {
        target: 'esnext'
    }
})
