#!/bin/sh

redis-server &

node /redis-commander/bin/redis-commander.js --redis-host 127.0.0.1 --redis-label local --port 8081 &

until curl -s http://localhost:8081; do
    sleep 2
done

exec "$@"


