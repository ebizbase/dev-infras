FROM node:22-alpine AS init
RUN apk add --no-cache dumb-init

FROM gcr.io/distroless/nodejs22:latest AS runtime
COPY --from=init /usr/bin/dumb-init /usr/bin/dumb-init
ENTRYPOINT [ "/usr/bin/dumb-init", "--", "/nodejs/bin/node" ]
