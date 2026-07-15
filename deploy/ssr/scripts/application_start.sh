#!/bin/bash
set -euo pipefail

APP_DIR=/var/www/next-pdp

# Install/refresh the systemd unit from the artifact so the running config always
# matches the repo. Do NOT rely on the one-time EC2 user-data — it may be stale
# (e.g. still pointing at `next start` instead of the Express custom server).
if [ -f "$APP_DIR/next-pdp.service" ]; then
  cp "$APP_DIR/next-pdp.service" /etc/systemd/system/next-pdp.service
fi

systemctl daemon-reload
systemctl enable next-pdp
systemctl restart next-pdp

# Type=simple returns success as soon as the process forks, so give the app a
# moment and then fail the hook if it did not stay up.
sleep 5
systemctl is-active --quiet next-pdp
systemctl --no-pager --full status next-pdp || true
