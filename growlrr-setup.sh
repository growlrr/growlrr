#!/usr/bin/env bash
set -e

echo "=== Updating system ==="
sudo apt update && sudo apt upgrade -y

echo "=== Installing base tools (git, curl, build-essential) ==="
sudo apt install -y git curl build-essential ca-certificates gnupg lsb-release

echo "=== Installing Node.js 18 + pnpm ==="
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pnpm

echo "=== Installing Docker + Docker Compose plugin ==="
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmour -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo usermod -aG docker $USER

echo "=== Installing Postgres + Redis (optional local run, skip if using Docker only) ==="
sudo apt install -y postgresql postgresql-contrib postgresql-client redis-server

echo "=== Installing helpers (jq, ngrok) ==="
sudo apt install -y jq
# ngrok install
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list
sudo apt update && sudo apt install -y ngrok

echo "=== All done! ==="
echo "Now log out and log back in (or run: newgrp docker) so Docker works without sudo."
echo "Verify installs with: node -v, pnpm -v, docker --version, docker compose version, psql --version, redis-cli ping"

