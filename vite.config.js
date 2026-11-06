import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Custom Vite plugin to heavily minify and compress the HTML output
function minifyHtmlPlugin() {
  return {
    name: 'html-minifier-shield',
    transformIndexHtml(html) {
      return html
        .replace(/<!--[\s\S]*?-->/g, '') // Strip all HTML comments
        .replace(/>\s+</g, '><')          // Remove whitespace between tags
        .replace(/\s{2,}/g, ' ')          // Collapse multiple spaces
        .trim();
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
    react(),
    minifyHtmlPlugin()
  ],
  build: {
    sourcemap: false,
    minify: true,
    cssMinify: true
  }
})
