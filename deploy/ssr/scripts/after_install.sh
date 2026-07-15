#!/bin/bash
set -euo pipefail

# Production node_modules are already in the CodeDeploy artifact (built in CodeBuild).
# Do not run npm ci here — on small EC2 instances it often hangs past the hook timeout.

cd /var/www/next-pdp

echo "AfterInstall: verifying production dependencies..."
test -d node_modules/next
test -d node_modules/express
test -f server/custom-server.mjs
test -d .next

chmod +x scripts/*.sh

echo "AfterInstall: OK (node_modules shipped with artifact)"
