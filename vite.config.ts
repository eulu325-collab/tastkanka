import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages bir repo alt yolunda yayınlar (ör. /tastkanka/).
  // Göreli base sayesinde derlenen dosyalar hangi alt yolda olursa olsun doğru çalışır.
  base: './',
});
