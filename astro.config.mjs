import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

const configuredBase = process.env.ASTRO_BASE_PATH ?? '/plan-actualizado';
const base = `/${configuredBase.replace(/^\/+|\/+$/g, '')}`;
const defaultSite = 'https://pel.cch.unam.mx';
const configuredSite = process.env.ASTRO_SITE_URL?.trim();
let site = defaultSite;

if (configuredSite) {
  try {
    site = new URL(configuredSite).toString().replace(/\/$/, '');
  } catch {
    console.warn(`[config] ASTRO_SITE_URL no es válida; se usará ${defaultSite}.`);
  }
}
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
