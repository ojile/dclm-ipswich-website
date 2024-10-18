#!/bin/sh
# wait_for_db.sh
while ! nc -z db 5432; do
  echo "Waiting for PostgreSQL database to be ready..."
  sleep 1
done
echo "PostgreSQL database is ready."
exec "$@"
