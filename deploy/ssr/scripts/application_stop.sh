#!/bin/bash
set -euo pipefail

if systemctl is-active --quiet next-pdp; then
  systemctl stop next-pdp
fi
