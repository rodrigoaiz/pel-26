# Guia de despliegue local

## Configuracion inicial

```bash
npm install
npm run setup:deploy
```

Edita `deploy.config` con los datos reales del servidor. Ese archivo esta excluido de Git.

## Comandos

```bash
npm run deploy:build             # check, build y paquete de produccion
npm run deploy:build:staging    # check, build y paquete de staging
npm run deploy:quick             # build y rsync directo a produccion
npm run deploy:quick:staging    # build y rsync directo a staging
```

La carpeta que se publica es `dist/plan-actualizado/frances-1/`. Su contenido debe copiarse al directorio remoto equivalente, sin agregar otra carpeta `dist`.

Para cambiar la ruta publica:

```bash
ASTRO_BASE_PATH=/otra-ruta/frances-1 npm run deploy:build
```

Antes de usar `deploy:quick`, verifica que `rsync` y el acceso SSH funcionen:

```bash
ssh tu-usuario@tu-servidor.com
```
