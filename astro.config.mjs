import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://giangiao.qmalu.com',
  output: 'static',
  server: {
    host: true,
    port: 4321,
  },
  preview: {
    host: true,
    port: 4321,
    allowedHosts: ['giangiao.qmalu.com'],
  },
});
