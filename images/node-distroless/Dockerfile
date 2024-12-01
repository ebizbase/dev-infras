FROM node:22-alpine@sha256:b64ced2e7cd0a4816699fe308ce6e8a08ccba463c757c00c14cd372e3d2c763e AS init
RUN apk add --no-cache dumb-init

FROM gcr.io/distroless/nodejs22:latest@sha256:d2bf966afe785153974fdd2663c7181dbfdf407d229b5df4adef185ca134da04 AS runtime
COPY --from=init /usr/bin/dumb-init /usr/bin/dumb-init
ENTRYPOINT [ "/usr/bin/dumb-init", "--", "/nodejs/bin/node" ]
