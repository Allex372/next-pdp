#!/bin/bash
set -euo pipefail

# Amazon Linux 2023 bootstrap for Next.js SSR + CodeDeploy agent.
# Attach IAM role with S3 read (optional) and CodeDeploy permissions before launch.

dnf update -y
dnf install -y nodejs npm ruby wget

if ! command -v node >/dev/null || [[ "$(node -p "process.versions.node.split('.')[0]")" -lt 20 ]]; then
  curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
  dnf install -y nodejs
fi

REGION=$(curl -s http://169.254.169.254/latest/meta-data/placement/region)

cd /tmp
wget "https://aws-codedeploy-${REGION}.s3.${REGION}.amazonaws.com/latest/codedeploy-agent.noarch.rpm"
dnf install -y "./codedeploy-agent.noarch.rpm"
systemctl enable codedeploy-agent
systemctl start codedeploy-agent

install -d -o ec2-user -g ec2-user /var/www/next-pdp

cat >/etc/systemd/system/next-pdp.service <<'EOF'
[Unit]
Description=Next.js SSR app (next-pdp)
After=network.target

[Service]
Type=simple
User=ec2-user
WorkingDirectory=/var/www/next-pdp
Environment=NODE_ENV=production
Environment=PORT=3000
EnvironmentFile=-/var/www/next-pdp/.env.production
ExecStart=/usr/bin/npm run start:prod
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable next-pdp

# Optional: open app port if no ALB in front yet
if command -v firewall-cmd >/dev/null; then
  firewall-cmd --permanent --add-port=3000/tcp || true
  firewall-cmd --reload || true
fi
