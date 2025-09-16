#!/usr/bin/env bash
set -e

echo "=== Ensuring folder structure ==="
mkdir -p backend/routes frontend/pages frontend/components migrations

echo "=== Moving backend files ==="
[ -f server.js ] && mv server.js backend/
[ -f db.js ] && mv db.js backend/
[ -f backend-package.json ] && mv backend-package.json backend/package.json
[ -f package.json ] && mv package.json backend/package.json

echo "=== Moving route files if misplaced ==="
for f in auth.js pets.js diets.js orders.js crowdfund.js; do
  [ -f "$f" ] && mv "$f" backend/routes/
done

echo "=== Moving frontend files ==="
for f in index.js pet.js diet.js crowdfund.js checkout.js; do
  [ -f "$f" ] && mv "$f" frontend/pages/
done
[ -f Navbar.js ] && mv Navbar.js frontend/components/
[ -f frontend-package.json ] && mv frontend-package.json frontend/package.json

echo "=== Moving migrations if misplaced ==="
for f in init.sql seed.sql; do
  [ -f "$f" ] && mv "$f" migrations/
done

echo "=== Done! Current tree ==="
tree -L 3

