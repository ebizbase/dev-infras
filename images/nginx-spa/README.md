# node-distroless

This image combines the compactness and security of distroless with the convenience of dumb-init for process management, making Node.js applications run more stably in a container environment.

> This image is maintained with node latest LTS version

## Usage

The simple usage example

```dockerfile
FROM ghcr.io/ebizbase/node-distroless
WORKDIR /usr/src/app
COPY . .
CMD [ "index.js" ]
```
