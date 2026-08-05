
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { BASE_PATH, SITE_URL } from './src/config/deployment.ts';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  vite: {
    plugins: [tailwindcss()],
  },
});
