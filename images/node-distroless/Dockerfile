FROM node:22-alpine@sha256:96cc8323e25c8cc6ddcb8b965e135cfd57846e8003ec0d7bcec16c5fd5f6d39f AS init
RUN apk add --no-cache dumb-init

FROM gcr.io/distroless/nodejs22:latest@sha256:d2bf966afe785153974fdd2663c7181dbfdf407d229b5df4adef185ca134da04 AS runtime
COPY --from=init /usr/bin/dumb-init /usr/bin/dumb-init
ENTRYPOINT [ "/usr/bin/dumb-init", "--", "/nodejs/bin/node" ]
