FROM node:22-alpine@sha256:e2b39f7b64281324929257d0f8004fb6cb4bf0fdfb9aa8cedb235a766aec31da AS init
RUN apk add --no-cache dumb-init

FROM gcr.io/distroless/nodejs22:latest@sha256:b2811d7945a1f3ef91cf8a2ead779171b438eb0011f3bdee0c8cc60cb90b2c0c AS runtime
COPY --from=init /usr/bin/dumb-init /usr/bin/dumb-init
ENTRYPOINT [ "/usr/bin/dumb-init", "--", "/nodejs/bin/node" ]
