FROM nginx:stable-alpine@sha256:d6f8c6b38edf2b7c6619718ad7a00caa4ed4741d12ce12550333a28d2b52dc89

RUN sed -i '1idaemon off;' /etc/nginx/nginx.conf

COPY images/nginx-spa/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx"]
