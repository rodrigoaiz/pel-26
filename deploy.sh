#!/usr/bin/env bash

set -euo pipefail

ENVIRONMENT="${1:-production}"
AUTO_BUILD=false
NO_PACKAGE=false
BASE_PATH="${ASTRO_BASE_PATH:-/plan-actualizado/frances-1}"
BUILD_DIR="dist/${BASE_PATH#/}"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
PACKAGE_NAME="pel-26-${ENVIRONMENT}-${TIMESTAMP}.tar.gz"

case "$ENVIRONMENT" in
    production|staging) ;;
    *) printf 'Uso: %s [production|staging] [--auto-build] [--no-package]\n' "$0"; exit 1 ;;
esac

shift || true
while [ "$#" -gt 0 ]; do
    case "$1" in
        --auto-build) AUTO_BUILD=true ;;
        --no-package) NO_PACKAGE=true ;;
        *) printf 'Opcion no reconocida: %s\n' "$1"; exit 1 ;;
    esac
    shift
done

if [ -f ./deploy.config ]; then
    # shellcheck source=/dev/null
    source ./deploy.config
    load_deploy_config "$ENVIRONMENT"
fi

if [ ! -d "$BUILD_DIR" ] || [ "$AUTO_BUILD" = true ]; then
    npm run build:production
fi

if [ ! -d "$BUILD_DIR" ]; then
    printf 'No existe el artefacto esperado: %s\n' "$BUILD_DIR" >&2
    exit 1
fi

if [ "$NO_PACKAGE" = true ]; then
    : "${DEPLOY_HOST:?Falta DEPLOY_HOST o deploy.config}"
    : "${DEPLOY_USER:?Falta DEPLOY_USER o deploy.config}"
    : "${DEPLOY_PATH:?Falta DEPLOY_PATH o deploy.config}"
    rsync -avz --delete --omit-dir-times --no-perms --no-owner --no-group \
        --exclude='*.map' --exclude='*.tmp' --exclude='*.cache' --exclude='.DS_Store' \
        "$BUILD_DIR/" "$DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH"
    printf 'Despliegue directo completado.\n'
    exit 0
fi

tar --exclude='*.map' --exclude='*.tmp' --exclude='*.cache' --exclude='.DS_Store' \
    -czf "$PACKAGE_NAME" -C "$BUILD_DIR" .
printf 'Paquete creado: %s\n' "$PACKAGE_NAME"

if [ -n "${DEPLOY_HOST:-}" ] && [ -n "${DEPLOY_USER:-}" ] && [ -n "${DEPLOY_PATH:-}" ]; then
    printf 'Paquete listo. Usa rsync directo con --no-package para publicarlo automaticamente.\n'
else
    printf 'Configura deploy.config para habilitar el despliegue directo.\n'
fi
