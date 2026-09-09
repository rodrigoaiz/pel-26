import { sitePath } from './site-path';

const isExternal = (path: string) => /^(?:https?:)?\/\//.test(path);

const h5pAliases: Record<string, string> = {
  'u2-act-1.html': 'frances-1/unidad-2/u2-act-1.html',
  'u2-act-3.html': 'frances-1/unidad-2/u2-act-3.html',
  'u2-act-11.html': 'frances-1/unidad-2/u2-act-11.html',
  'demo-act-1.html': 'frances-3/unidad-1/demo-act-1.html',
  'demo-act-3.html': 'frances-3/unidad-1/demo-act-3.html',
  'demo-act-11.html': 'frances-3/unidad-1/demo-act-11.html',
};

/** Resuelve imágenes públicas; acepta una ruta completa o una ruta de asignatura. */
export function imagePath(path: string) {
  if (isExternal(path)) return path;

  const normalized = path.replace(/^\/+/, '');
  if (normalized.startsWith('images/')) return sitePath(normalized);
  if (normalized.startsWith('frances-')) return sitePath(`images/${normalized}`);
  return sitePath(`images/shared/${normalized}`);
}

/** Resuelve actividades H5P; acepta una ruta completa o una ruta de asignatura. */
export function h5pPath(path: string) {
  if (isExternal(path)) return path;

  const normalized = path.replace(/^\/+/, '');
  if (normalized.startsWith('h5p/')) return sitePath(normalized);
  if (h5pAliases[normalized]) return sitePath(`h5p/${h5pAliases[normalized]}`);
  if (normalized.startsWith('frances-')) return sitePath(`h5p/${normalized}`);
  if (normalized.startsWith('shared/')) return sitePath(`h5p/${normalized}`);
  return sitePath(`h5p/shared/${normalized}`);
}

/** Resuelve documentos descargables en PDF u otros formatos. */
export function documentPath(path: string) {
  if (isExternal(path)) return path;

  const normalized = path.replace(/^\/+/, '');
  if (normalized.startsWith('docs/')) return sitePath(normalized);
  if (normalized.startsWith('frances-')) return sitePath(`docs/${normalized}`);
  return sitePath(`docs/shared/${normalized}`);
}
