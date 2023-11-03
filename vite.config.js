import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
// import vue2 from '@vitejs/plugin-vue2'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})


//Install the Vue 3 plugin for Vite
//Update your Vite configuration:
//Replace @vitejs/plugin-vue2 with @vitejs/plugin-vue and update the plugins array: