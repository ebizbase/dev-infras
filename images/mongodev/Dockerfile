FROM mongo-express AS mongo-express

FROM mongo@sha256:8565ecda5b221016d70f7745ac1ba0b97ccb05836157f8a343e987338fdc8350

# Install dependencies
RUN apt-get update && apt-get install -y curl wget unzip \
  && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get install -y nodejs \
  && npm install -g yarn  \
  && rm -rf /var/lib/apt/lists/*

# Install mongo-express
COPY --from=mongo-express /app /mongo-express
COPY images/mongodev/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose MongoDB and mongo-express ports
EXPOSE 27017 8081

# Start MongoDB, set up replica set, and run mongo-express
ENTRYPOINT ["/entrypoint.sh"]
CMD [ "sleep", "infinity" ]
