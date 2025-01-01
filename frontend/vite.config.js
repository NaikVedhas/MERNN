import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/backend':{
        target:'http://localhost:4000', // Adjust according to your backend URL
        secure: false,
      }
    },
  },
})
