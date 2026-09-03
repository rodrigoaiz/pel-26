import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

const configuredBase = process.env.ASTRO_BASE_PATH ?? '/plan-actualizado';
const base = `/${configuredBase.replace(/^\/+|\/+$/g, '')}`;
const site = (process.env.ASTRO_SITE_URL ?? 'https://pel.cch.unam.mx').replace(/\/$/, '');
const outDir = resolve(process.cwd(), `dist${base}`);

export default defineConfig({
  site,
  base,
  output: 'static',
  outDir,
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    format: 'directory'
  }
});
