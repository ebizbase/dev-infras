FROM rediscommander/redis-commander:latest@sha256:19cd0c49f418779fa2822a0496c5e6516d0c792effc39ed20089e6268477e40a as redis-commander

FROM redis:bookworm@sha256:af0be38eb8e43191bae9b03fe5c928803930b6f93e2dde3a7ad1165c04b1ce22

RUN apt-get update && apt-get install -y curl \
  && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get install -y nodejs \
  && rm -rf /var/lib/apt/lists/*

COPY --from=redis-commander /redis-commander /redis-commander
COPY images/redisdev/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 6379 8081

ENTRYPOINT ["/entrypoint.sh"]
CMD [ "sleep", "infinity" ]
