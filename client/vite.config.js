import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'

import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log('VITE_ENV:', env)
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: { '@': '/src', },
    },
    server: { port: env.PORT },
  }
})

