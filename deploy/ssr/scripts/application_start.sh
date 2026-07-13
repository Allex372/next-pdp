#!/bin/bash
set -euo pipefail

systemctl daemon-reload
systemctl enable next-pdp
systemctl restart next-pdp
systemctl --no-pager --full status next-pdp
