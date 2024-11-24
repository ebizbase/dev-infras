FROM nginx:stable-alpine

RUN sed -i '1idaemon off;' /etc/nginx/nginx.conf

COPY images/nginx-spa/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx"]
