#!/bin/bash
# Start MongoDB in the background
mongod --replSet rs0 --bind_ip_all &

# Wait for MongoDB to start
until mongosh --eval "print(\"Waiting for MongoDB to start...\")"; do
    sleep 2
done

# Initialize replica set
mongosh --eval "rs.initiate()"

# Start mongo-express
cd /mongo-express

export ME_CONFIG_MONGODB_URL="mongodb://127.0.0.1:27017"
export ME_CONFIG_MONGODB_ENABLE_ADMIN=true
export ME_CONFIG_MONGODB_TLS=false
export ME_CONFIG_OPTIONS_FULLWIDTH_LAYOUT=false
export ME_CONFIG_BASICAUTH=false
export ME_CONFIG_BASICAUTH_ENABLED=false
export ME_CONFIG_SITE_SESSIONSECRET="secret"
export VCAP_APP_HOST="0.0.0.0"

yarn start &

until curl -s http://localhost:8081; do
    sleep 2
done

exec "$@"
