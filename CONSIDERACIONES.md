# Consideraciones para continuar PEL-26

## Estado de la extraccion

Este repositorio nace de `pel-25/pilots/frances-plan-nuevo`. Ahora es independiente y su raiz ya no depende de la carpeta `pilots` ni del codigo PHP/Webpack de PEL-25.

La extraccion se hizo sin copiar:

- `node_modules/`
- `.astro/`
- `.impeccable/`
- `dist/`

Las dependencias se reinstalan con `npm install`.

## Inicio rapido

```bash
cd ~/Documentos/Dev/pel-26
npm install
npm run dev
```

Comandos utiles:

```bash
npm run build              # build Astro
npm run build:production  # astro check + build de produccion
npm run preview:production
```

## Estructura principal

```text
src/
  components/     Componentes Astro reutilizables
  content/        Lecciones editoriales en MDX
  data/           Metadatos del curso y actividades Moodle
  layouts/        Layouts compartidos
  pages/          Composicion de rutas
  styles/         Tokens y estilos globales
public/
  assets/         Recursos publicos compartidos
  h5p/            Actividades H5P estaticas
  images/         Imagenes del curso
```

La regla de organizacion es mantener el contenido pedagogico en MDX, los componentes de interfaz en `src/components`, los metadatos en `src/data` y las paginas `.astro` como composicion de rutas.

## Ruta publica

Por defecto, Astro genera el sitio en:

```text
dist/plan-actualizado/
```

La URL prevista es:

```text
https://pel.cch.unam.mx/plan-actualizado/frances-1/

https://pel.cch.unam.mx/plan-actualizado/frances-3/
```

La configuracion esta en `astro.config.mjs` y usa estas variables opcionales:

```bash
ASTRO_BASE_PATH=/plan-actualizado
ASTRO_SITE_URL=https://pel.cch.unam.mx
```

No se debe subir la carpeta `dist` como tal. Se sube el contenido de `dist/plan-actualizado/` al directorio remoto equivalente.

## Despliegue

Primera configuracion:

```bash
npm run setup:deploy
```

Editar despues `deploy.config` con los datos reales. Este archivo esta ignorado por Git.

```bash
npm run deploy:build          # check, build y paquete .tar.gz
npm run deploy:build:staging
npm run deploy:quick          # check, build y rsync directo
npm run deploy:quick:staging
```

El script `deploy.sh` publica un sitio estatico. No usa las opciones de despliegue parcial por asignatura del proyecto PHP anterior.

Antes de usar el despliegue directo, comprobar SSH y `rsync`:

```bash
ssh usuario@servidor
```

## Integraciones Moodle

La funcion `moodleActivityUrl` usa `src/data/menu_asignatura.json`. Si cambian IDs o modulos de Moodle, actualizar ese archivo y comprobar las URLs generadas.

El sitio generado es estatico. La autenticacion, sesion, calificaciones, foros y tareas siguen perteneciendo a Moodle; Astro solo enlaza o incrusta las actividades configuradas.

## H5P

Las actividades usadas actualmente estan en `public/h5p/`. Para agregar una actividad:

1. Añadir el recurso HTML a `public/h5p/`.
2. Referenciarlo desde el componente o la leccion correspondiente.
3. Ejecutar `npm run build:production`.
4. Confirmar que el recurso aparece dentro de `dist/plan-actualizado/h5p/`.

## Pendientes conocidos

- La portada y la leccion de Unidad 2 son el alcance actual del piloto.
- La lista de lecciones futuras esta definida en `src/data/course.ts`, pero varias rutas aun no existen.
- Hay que definir el remoto del nuevo repositorio y hacer el primer commit cuando se confirme el nombre definitivo.
- Antes de publicar en produccion, probar la ruta final, los enlaces Moodle y las tres actividades H5P.
- `npm install` reporta vulnerabilidades de dependencias; revisar con `npm audit` antes de cerrar una version de produccion.

## Relacion con PEL-25

No editar el codigo de PEL-25 para continuar esta version. Los cambios nuevos deben hacerse en `pel-26`.

Si se necesita consultar contenido PHP o datos historicos, usar PEL-25 como referencia y copiar explicitamente solo los recursos necesarios, evitando imports relativos hacia fuera de este repositorio.
