FROM node:22-alpine@sha256:6e80991f69cc7722c561e5d14d5e72ab47c0d6b6cfb3ae50fb9cf9a7b30fdf97 AS init
RUN apk add --no-cache dumb-init

FROM gcr.io/distroless/nodejs22:latest@sha256:d2bf966afe785153974fdd2663c7181dbfdf407d229b5df4adef185ca134da04 AS runtime
COPY --from=init /usr/bin/dumb-init /usr/bin/dumb-init
ENTRYPOINT [ "/usr/bin/dumb-init", "--", "/nodejs/bin/node" ]
