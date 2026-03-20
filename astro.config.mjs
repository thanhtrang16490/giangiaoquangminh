import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    preview: {
      allowedHosts: ['giangiao.qmalu.com', 'all'],
    },
  },
  site: 'https://giangiao.qmalu.com',
  output: 'static',
  server: {
    port: 4321,
    host: true,
  },
});