#!/bin/bash
set -euo pipefail

APP_DIR="/var/www/next-pdp"

if [ -d "$APP_DIR" ]; then
  rm -rf "${APP_DIR:?}/"*
fi

mkdir -p "$APP_DIR"
chown -R ec2-user:ec2-user "$APP_DIR"
