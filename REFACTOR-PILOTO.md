# Refactor del piloto Francés I

Documento de trabajo para convertir el piloto actual en la base reutilizable del nuevo plan de estudios.

Estado: **primera etapa implementada y verificada**  
Superficie: `pilots/frances-plan-nuevo`  
Última actualización: 2026-08-03

La portada y la primera lección ya funcionan como referencia visual y técnica. La siguiente etapa no debe rediseñar esta base: debe completar el contenido del piloto, validar la sesión real en `pel.cch.unam.mx` y extender los patrones existentes.

## Objetivo

Dejar una primera lección lista para crecer sin volver a mezclar tres responsabilidades en el mismo archivo:

1. contenido pedagógico;
2. interfaz y navegación;
3. integración con Moodle.

La refactorización debe conservar el comportamiento actual: salida estática, navegación mobile-first, visor de H5P y foro incrustado en la misma pestaña, modo claro/oscuro y compatibilidad con la sesión existente de Moodle.

## Decisión de arquitectura

### Astro para el shell

Los archivos `.astro` serán responsables de:

- rutas y composición de páginas;
- layout general y metadatos;
- navegación de curso y lección;
- estado local del índice y del visor de actividades;
- integración con componentes Astro;
- enlaces relativos a Moodle.

### MDX para el contenido

El contenido editorial vivirá en MDX:

- explicaciones;
- diálogos;
- ejemplos de idioma;
- instrucciones;
- avisos y bloques de apoyo;
- imágenes con texto alternativo.

MDX es la opción recomendada porque genera HTML estático durante el build y permite insertar componentes Astro cuando el contenido necesita una actividad, un diálogo o una tarjeta especial. No introduce React ni un runtime adicional.

No se debe usar MDX para manejar sesión, consultar `$USER`, generar `sesskey` ni decidir permisos de Moodle.

### TypeScript para datos

Los datos reutilizables vivirán en `src/data`:

- unidades y lecciones;
- títulos y estados;
- claves de actividad;
- catálogo de IDs Moodle;
- rutas de recursos estáticos.

Los IDs se deben leer del catálogo legado `src/frances-1/assets/data/menu_asignatura.json`. No se escribirán IDs Moodle directamente dentro del contenido MDX.

## Estructura objetivo

```text
pilots/frances-plan-nuevo/
├── astro.config.mjs
├── public/
│   ├── assets/
│   ├── h5p/
│   └── images/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Container.astro
│   │   │   └── ArrowIcon.astro
│   │   ├── course/
│   │   │   ├── CourseHeader.astro
│   │   │   ├── CourseHero.astro
│   │   │   ├── UnitList.astro
│   │   │   └── CourseFooter.astro
│   │   ├── lesson/
│   │   │   ├── LessonHeader.astro
│   │   │   ├── LessonIndex.astro
│   │   │   ├── LessonSection.astro
│   │   │   ├── Dialogue.astro
│   │   │   ├── PhraseCard.astro
│   │   │   ├── ActivityLauncher.astro
│   │   │   └── ActivityViewer.astro
│   │   └── ThemeToggle.astro
│   ├── content/
│   │   └── lessons/
│   │       └── frances-1/
│   │           └── unidad-2/
│   │               └── mon-age.mdx
│   ├── data/
│   │   ├── course.ts
│   │   └── moodle-activities.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── unidad-2/
│   │       └── mon-age.astro
│   └── styles/
│       └── global.css
└── REFACTOR-PILOTO.md
```

## Reglas de Tailwind

Tailwind CSS v4 es la única base de estilos de la interfaz nueva.

### Tokens

Los colores, tipografías, radios, sombras y tamaños compartidos se definen una sola vez en `@theme`. Los componentes deben consumir tokens semánticos, por ejemplo:

```css
@theme {
  --color-background: ...;
  --color-foreground: ...;
  --color-surface: ...;
  --color-primary: ...;
  --color-primary-foreground: ...;
  --color-muted: ...;
  --color-border: ...;
}
```

No se deben añadir colores hexadecimales directamente en `.astro`, MDX o clases de componentes. Las excepciones permitidas son recursos externos que no controlamos, como el contenido visual interno de un H5P en iframe.

### Componentes

Los componentes deben usar clases utilitarias Tailwind y variantes explícitas. Si una combinación se repite, se convierte en componente; no se copia una cadena larga de clases en cada página.

Ejemplos de variantes necesarias:

- botón primario, secundario y enlace;
- tamaño normal y compacto;
- estado actual, bloqueado y próximo de una lección;
- superficie clara y superficie oscura mediante la variante `dark`.

### CSS permitido

`global.css` debe quedar limitado a:

- `@import "tailwindcss"`;
- `@theme` y variante de dark mode;
- reset/base mínimo;
- tipografías locales o declaradas por el sistema;
- animaciones que no puedan expresarse con utilities;
- estilos de compatibilidad para `[hidden]` y el contenido del visor.

No se deben agregar nuevos bloques monolíticos de selectores como los actuales. Al terminar la migración, los selectores visuales antiguos de `global.css` se eliminan.

## Migración de la lección piloto

### Paso 1 — Congelar comportamiento

- [x] Registrar la ruta de portada y de la lección.
- [x] Registrar los tres H5P y el foro de Unidad 2.
- [x] Confirmar que el visor abre y cierra con teclado.
- [ ] Confirmar que la sesión de Moodle no se altera.
- [x] Tomar capturas de referencia en 390 px, 768 px y 1440 px.

### Paso 2 — Extraer componentes

- [x] Extraer `Container` y eliminar el selector `.shell`.
- [x] Extraer `CourseHeader` y `LessonHeader`.
- [x] Extraer `CourseHero`.
- [x] Extraer `UnitList`.
- [x] Extraer `LessonIndex`.
- [x] Extraer la etiqueta de sección, `Dialogue` y `PhraseCard`.
- [x] Extraer `ActivityLauncher` y `ActivityViewer`.
- [x] Extraer `CourseFooter`.
- [x] Mantener `ThemeToggle` como componente único en portada y lección.

Cada componente debe recibir datos por props y no depender de textos o IDs globales.

### Paso 3 — Migrar el contenido a MDX

Mover de `src/pages/unidad-2/mon-age.astro` a `src/content/lessons/frances-1/unidad-2/mon-age.mdx`:

- diálogo inicial;
- explicación de `avoir`;
- ejemplos de edad y fecha;
- notas y recordatorios;
- instrucciones de las actividades.

El MDX podrá importar componentes como:

```mdx
import Dialogue from '../../../components/lesson/Dialogue.astro';
import PhraseCard from '../../../components/lesson/PhraseCard.astro';

<Dialogue ... />
<PhraseCard ... />
```

Las actividades no reciben IDs a mano. Reciben una clave, por ejemplo `u2a2`, y el componente consulta `moodle-activities.ts`.

### Paso 4 — Reducir la página `.astro`

La página final de la lección debe limitarse a:

1. importar el layout y los datos;
2. renderizar el encabezado;
3. renderizar el hero de la lección;
4. renderizar el contenido MDX;
5. renderizar actividades mediante componentes;
6. renderizar el footer de navegación;
7. inicializar únicamente el comportamiento local necesario.

La página no debe contener largas cadenas de contenido pedagógico ni bloques repetidos de HTML.

### Paso 5 — Eliminar la capa visual anterior

- [x] Reemplazar las reglas visuales actuales de `global.css` por tokens y utilities Tailwind.
- [x] Eliminar colores repetidos y valores visuales aislados.
- [x] Eliminar estilos que solo existían para la estructura anterior.
- [x] Revisar que dark mode cubra portada, lección, índice, visor, footer y estados de foco.
- [x] Mantener H5P en su propio documento; no intentar modificar su CSS desde el documento padre.

## Compatibilidad con Moodle

- Las rutas Moodle deben ser relativas al mismo host: `/mod/forum/view.php?id=...`.
- No se debe abrir una actividad en una pestaña nueva por defecto.
- El visor debe conservar un botón de regreso y un fallback explícito a Moodle.
- La autenticación sigue siendo responsabilidad de Moodle/PHP.
- No se debe simular `$USER`, `sesskey`, permisos o logout en HTML estático.
- Si se recupera el menú de sesión, se hará mediante un pequeño puente PHP/Moodle separado del contenido MDX.
- El build debe permanecer en `output: 'static'` y publicar de forma predeterminada bajo `/plan-actualizado/frances-1/`. La ruta puede sustituirse con `ASTRO_BASE_PATH` antes de compilar.

## Criterios de aceptación

### Código

- [x] `npm run build` termina sin errores ni warnings de CSS.
- [x] `npx astro check` termina con cero errores, warnings y hints.
- [x] No hay nuevos estilos visuales fuera de Tailwind y sus tokens.
- [x] No hay IDs de actividades duplicados en páginas o MDX.
- [x] Los componentes reciben datos por props.

### Experiencia

- [x] La primera vista es usable en 390 px sin zoom horizontal.
- [x] La portada, la lección y el visor funcionan en claro y oscuro.
- [x] El índice se puede abrir, cerrar y navegar con teclado.
- [x] Escape cierra el visor y devuelve el foco al botón que lo abrió.
- [x] `prefers-reduced-motion` elimina animaciones no esenciales.
- [x] H5P permanece usable dentro del iframe.
- [ ] El foro conserva la sesión cuando se prueba en `pel.cch.unam.mx`.
- [x] Todos los controles tienen foco visible y nombre accesible.

## Entrega de la primera etapa

- Sistema visual renovado: una mezcla editorial de azul institucional, coral y turquesa, tipografía condensada y composición inspirada en un itinerario.
- Portada con ilustración protagonista, jerarquía clara y acceso inmediato a la lección actual.
- Mapa de curso simplificado: unidad activa expandida y el resto reducido a una lectura lineal.
- Lección MDX completa como muestra de los patrones pedagógicos: diálogo, frase clave, explicación, H5P, actividades y acción Moodle.
- Dark mode diseñado por componente, no como inversión automática de colores.
- Visor de actividades de pantalla completa que conserva el contexto y devuelve el foco al cerrarse.
- Validación automatizada en 390, 768 y 1440 px, sin overflow horizontal.

Pendiente para cerrar el piloto completo:

1. probar el foro con una sesión autenticada en el host final;
2. recuperar, si sigue siendo necesario, el menú de sesión mediante un puente Moodle/PHP;
3. convertir las ocho lecciones restantes de la Unidad 2;
4. validar textos, instrucciones y actividades con el equipo académico.

### Verificación

```bash
npx astro check
npm run build
node /Users/rodrigo/.agents/skills/impeccable/scripts/detect.mjs --json src
```

La comprobación final debe incluir Playwright en 390 px y 1440 px, con una pasada en cada tema y una apertura real de H5P.

## Orden recomendado de ejecución

1. Extraer tokens y dejar `global.css` como capa mínima de Tailwind.
2. Extraer componentes de navegación y actividades.
3. Migrar el contenido de `Mon âge` a MDX.
4. Sustituir la página piloto por composición de componentes + MDX.
5. Ejecutar pruebas visuales y de interacción.
6. Solo después crear la siguiente lección.

## Definición de terminado

El piloto está refactorizado cuando una nueva lección puede crearse agregando un archivo MDX, una entrada de datos y, si es necesario, una actividad del catálogo, sin copiar la estructura completa de `mon-age.astro` ni añadir CSS específico de página.
