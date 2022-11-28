FROM node:17-alpine AS buildfrontend
WORKDIR /app

COPY UI .
RUN npm install
RUN npm run build

FROM node:17-alpine AS buildbackeng

WORKDIR /app
COPY BACKEND .
RUN apk update && apk upgrade --available
RUN apk add --update python3
RUN apk add --no-cache --virtual .gyp make g++
RUN apk add libpq-dev
RUN npm install
RUN apk del .gyp
RUN npm run build

FROM nginx:alpine AS buildserver
WORKDIR /usr/share/nginx/html
COPY --from=buildfrontend /app/build  /usr/share/nginx/html
RUN mkdir "/backend_server"
COPY --from=buildbackeng /app/build /backend_server
RUN apk add nodejs=16.17.1-r0 && npm=8.19.1-r0

ENV SERVER_PORT=3001
ENV POLLTIMEOUT=240000

COPY nginx-conf/server.conf /etc/nginx/conf.d/server.conf
COPY nginx-conf/nginx.conf /etc/nginx/

COPY scripts/startup.sh /startup.sh
EXPOSE 80
ENTRYPOINT ["/startup.sh"]
#CMD ["nginx", "-g", "daemon off;"]
