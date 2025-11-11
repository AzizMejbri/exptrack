#!/usr/bin/env bash
# ---------------------------------------------
# clean.sh - Stop and remove everything (including volumes)

echo "⚠️  This will remove all containers, volumes, and data!"
read -p "Are you sure? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker-compose down -v
    echo "✅ Cleaned up everything"
fi
