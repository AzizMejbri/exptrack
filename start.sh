#!/usr/bin/env bash
# start.sh - Launch the entire application

echo "🚀 Starting ExpTrack application..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "📝 Please create .env file from .env.example"
    exit 1
fi

# Build and start containers
docker-compose up --build -d

echo "⏳ Waiting for services to be healthy..."
sleep 5

# Check service status
docker-compose ps

echo "✅ Application started!"
echo "🔗 Backend: https://localhost:8443"
echo "🗄️  Database: localhost:5432"
echo ""
echo "📊 View logs: docker-compose logs -f"
echo "🛑 Stop: docker-compose down"

