#!/bin/bash
set -euo pipefail

cd /var/www/next-pdp

export HOME=/home/ec2-user
export NPM_CONFIG_CACHE=/home/ec2-user/.npm

npm ci --omit=dev
