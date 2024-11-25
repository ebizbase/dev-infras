FROM rediscommander/redis-commander:latest as redis-commander

FROM redis:bookworm

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
