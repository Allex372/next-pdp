#!/bin/bash
set -euo pipefail

# Stop the app if the unit exists and is running.
# Never fail the hook just because the service is already stopped / missing —
# that leaves CodeDeploy agent in a bad state for the next deployment.
if systemctl list-unit-files next-pdp.service >/dev/null 2>&1; then
  if systemctl is-active --quiet next-pdp; then
    systemctl stop next-pdp || true
  fi
fi

exit 0
