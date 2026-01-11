import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // CRITICAL FIX: Use relative paths (./) for assets on GitHub Pages
  base: './', 
  build: {
    // Specify the correct output directory (docs)
    outDir: 'docs',
  }
})