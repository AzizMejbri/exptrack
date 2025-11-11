#!/usr/bin/env bash
# ---------------------------------------------
# logs.sh - View logs

if [ $? -ge 2 ] ; then
    echo "❌ Error: must provide at most 1 parameter"
fi

# View all logs
if [ $? -eq 0 ] ; then
    docker-compose logs -f
fi

# View specific service logs:
if [ $1 = "db" ] ; then
    docker-compose logs -f db
else
    docker-compose logs -f backend
fi


