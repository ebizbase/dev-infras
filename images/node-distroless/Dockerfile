FROM node:22-alpine@sha256:b64ced2e7cd0a4816699fe308ce6e8a08ccba463c757c00c14cd372e3d2c763e AS init
RUN apk add --no-cache dumb-init

FROM gcr.io/distroless/nodejs22:latest@sha256:c218f62198d07fc67e36fff5639985f29b1bdcf04a601c1d23c0ab1121f55f0b AS runtime
COPY --from=init /usr/bin/dumb-init /usr/bin/dumb-init
ENTRYPOINT [ "/usr/bin/dumb-init", "--", "/nodejs/bin/node" ]
