FROM node:17-alpine AS buildfrontend
WORKDIR /app

COPY UI .
RUN npm install
RUN npm run build

FROM node:17-alpine AS buildbackeng

WORKDIR /app
COPY BACKEND .
RUN npm install
RUN npm run build

FROM nginx:alpine AS buildserver
WORKDIR /usr/share/nginx/html
COPY --from=buildfrontend /app/build  /usr/share/nginx/html
RUN mkdir "/backend_server"
COPY --from=buildbackeng /app/build /backend_server
RUN apk add nodejs=16.17.1-r0 && npm=8.19.1-r0

#ENV AWS_PROFILE=""
#ENV AWS_REGION=""
ENV SERVER_PORT=3001

COPY nginx-conf/server.conf /etc/nginx/conf.d/server.conf
COPY nginx-conf/nginx.conf /etc/nginx/

COPY scripts/startup.sh /startup.sh

ENTRYPOINT ["/startup.sh"]
#CMD ["nginx", "-g", "daemon off;"]
