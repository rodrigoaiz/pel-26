// Los cursos de idioma escriben títulos bilingües: "Français - Español" (unidad, aprendizaje) y "Français | Español" (pantalla).
// En listas basta una versión; los demás cursos (bilingual sin activar) muestran el título tal cual.
export function shortTitle(title: string, kind: 'unit' | 'learning' | 'screen', bilingual?: boolean) {
  if (!bilingual) return title;
  if (kind === 'learning') return title.split(' - ').at(-1)!.trim();
  return title.split(kind === 'unit' ? ' - ' : ' | ')[0].trim();
}
