# PEL-26 · Francés

Sitio estático de Astro para la transición curricular de PEL-25. Este repositorio es independiente del sitio PHP existente.

## Decisiones técnicas

- **Astro** se encarga del shell, las rutas, la navegación y los visores de actividades.
- **Tailwind CSS v4** es la base de estilos y tokens. Se integra mediante `@tailwindcss/vite`; no se añade una configuración paralela de Tailwind v3.
- **MDX** queda habilitado con `@astrojs/mdx` para el contenido editorial de las lecciones. Una lección MDX puede usar componentes Astro para diálogos, tarjetas, avisos y actividades.
- **Moodle/PHP** conserva autenticación, calificaciones, foros, tareas y la sesión. El build de Astro solo genera HTML estático y JavaScript puntual para interacción local.

La regla para las siguientes lecciones será: contenido, jerarquía y orden en MDX; componentes de interfaz en `src/components`; identidad visual del curso en `src/data/courses`; e IDs Moodle en `src/data/menu_asignatura.json`. Las rutas genéricas construyen toda la navegación mediante `getCollection('lessons')`; no se repiten unidades, aprendizajes ni pantallas en TypeScript.

## Alcance actual

- Portada móvil de Francés I con la unidad piloto disponible.
- Ruta piloto: Unidad 2, **Mon âge et ma date de naissance**.
- Navegación reducida a unidad, lección y fases de aprendizaje.
- Actividad H5P integrada y acceso explícito al foro de Moodle.
- Entrada de portada y hero con GSAP, desactivada para `prefers-reduced-motion`. El contenido nunca depende de una animación para ser visible.
- Francés III incorporado con tres unidades, once aprendizajes y pantallas navegables.
- Cada curso usa `src/content/lessons/<curso>/` como fuente de verdad. Los MDX definen unidad, aprendizaje, pantalla, orden y ruta pública.

La referencia visual de esta primera etapa ya está migrada a componentes Tailwind. No se deben añadir nuevas reglas visuales aisladas en `global.css`; los nuevos componentes deben consumir los tokens del tema y clases utilitarias.

### Agregar una asignatura

Las páginas son genéricas y no se copian por asignatura:

```text
src/
  pages/[course]/index.astro
  pages/[course]/[...slug].astro
  content/lessons/<curso>/<unidad>/<aprendizaje>/<pantalla>.mdx
  data/courses/<curso>.ts
  data/courses/index.ts
```

Para agregar una asignatura:

1. Crear su archivo de identidad en `src/data/courses/` y registrarlo en `src/data/courses/index.ts`.
2. Agregar sus MDX con `course`, `unit`, `learning` y `screenOrder` en el frontmatter.
3. Ejecutar el build. La portada, las rutas, el índice, el selector de unidades y la navegación anterior/siguiente se generan automáticamente.

## Dirección visual

La experiencia combina una base institucional —azul profundo, jerarquía editorial y firmas UNAM/CCH/PEL— con recursos más cercanos a estudiantes: ilustración protagonista, acentos coral y turquesa, mensajes breves y una navegación de tipo itinerario. El modo oscuro conserva la misma jerarquía y usa superficies diseñadas específicamente para lectura prolongada.

La portada comunica el cambio de plan de estudios; la lección convierte cada objetivo en un bloque reconocible: aprender, entender, practicar y ampliar. La actividad Moodle se abre dentro del mismo recorrido para evitar que el estudiante pierda el contexto en teléfono.

## Desarrollo

```bash
npm install
npm run dev
npm run build
npm run build:production
```

## Despliegue

El sistema de despliegue genera un paquete o sincroniza directamente el artefacto Astro. La salida pública predeterminada es `dist/plan-actualizado/`.

```bash
npm run setup:deploy       # solo la primera vez; editar deploy.config
npm run deploy:build       # build de produccion y paquete .tar.gz
npm run deploy:quick       # build y rsync directo al servidor
npm run deploy:build:staging
```

El archivo `deploy.config` no se versiona porque contiene credenciales. Para más detalle, consulta `DEPLOY_LOCAL_GUIDE.md`.

El comando recomendado para preparar la entrega es:

```bash
npm run build:production
```

Primero ejecuta `astro check` y después genera el sitio estático en `dist/plan-actualizado/`. Las rutas públicas son:

`https://pel.cch.unam.mx/plan-actualizado/frances-1/`

`https://pel.cch.unam.mx/plan-actualizado/frances-3/`

Para publicarlo por FTP, sube completa la carpeta:

`dist/plan-actualizado/`

al directorio remoto:

`/plan-actualizado/`

La carpeta local ya contiene la estructura final y debe incluir:

```text
dist/plan-actualizado/index.html
dist/plan-actualizado/_astro/
dist/plan-actualizado/assets/
dist/plan-actualizado/images/
dist/plan-actualizado/h5p/
dist/plan-actualizado/frances-1/
dist/plan-actualizado/frances-3/
```

Las rutas generadas para Francés III quedan dentro del mismo artefacto:

```text
dist/plan-actualizado/frances-3/index.html
dist/plan-actualizado/frances-3/u1/index.html
dist/plan-actualizado/frances-3/u2/index.html
dist/plan-actualizado/frances-3/u3/index.html
```

La URL local equivalente es `/plan-actualizado/frances-3/`.

1. crear en el servidor la carpeta `/plan-actualizado/` dentro de la raíz pública, si el cliente FTP no la crea al subir carpetas;
2. subir la carpeta local `dist/plan-actualizado/` completa, conservando su contenido;
3. comprobar la portada en `https://pel.cch.unam.mx/plan-actualizado/frances-1/`;
4. comprobar la lección en `https://pel.cch.unam.mx/plan-actualizado/frances-1/unidad-2/mon-age/`.

La carpeta local `dist` es sólo el contenedor del artefacto de entrega y no forma parte de la URL. Astro ya genera las referencias de CSS, JavaScript, fuentes, imágenes y H5P con el prefijo público correcto.

### Cambiar la carpeta pública

La ruta se puede sustituir sin editar el código:

```bash
ASTRO_BASE_PATH=/otra-ruta npm run build:production
```

También puede cambiarse el dominio:

```bash
ASTRO_SITE_URL=https://otro-dominio.example \
ASTRO_BASE_PATH=/otra-ruta \
npm run build:production
```

`.env.example` documenta los valores usados. La configuración cuenta además con esos mismos valores como defaults, por lo que no es obligatorio crear un archivo `.env` para la publicación prevista.

En Vercel, si se define `ASTRO_SITE_URL`, debe ser una URL completa, por ejemplo `https://pel.cch.unam.mx`. Si la variable queda vacía, Astro usará el dominio institucional predeterminado.

Para revisar localmente el resultado generado:

```bash
npm run preview:production
```

La URL de prueba conservará el prefijo `/plan-actualizado/`. Astro Preview usará la carpeta configurada como salida.

## Recursos H5P

Los tres recursos usados por la lección piloto se incluyen en `public/h5p/` y se copian al build. Cuando se migren más lecciones, sus recursos deben añadirse a esa carpeta o automatizarse desde el inventario curricular.
