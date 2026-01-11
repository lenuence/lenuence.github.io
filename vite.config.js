import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // --- ADD THESE CONFIGURATION PROPERTIES ---
  // Sets the base path for assets, crucial for GitHub Pages subfolder deployment
  base: "./", 
  
  // Defines the build output configuration
  build: {
    // Sets the output directory to 'docs' instead of the default 'dist'
    outDir: 'docs' 
  }
  // ------------------------------------------
<<<<<<< HEAD
});
=======
});
>>>>>>> 6918dc8977e24d59e4d96877c14e1613e7aa3f80
